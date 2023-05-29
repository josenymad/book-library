const { Genre } = require('../src/models');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('/genres', () => {
  before(async () => await Genre.sequelize.sync());

  beforeEach(async () => {
    await Genre.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /genres', () => {
      it('creates a new genre in the database', async () => {
        const response = await request(app).post('/genres').send({
          genre: 'Fantasy',
        });
        const newGenreRecord = await Genre.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.genre).to.equal('Fantasy');
        expect(newGenreRecord.genre).to.equal('Fantasy');
      });

      it('does not allow genre to be null', async () => {
        const response = await request(app).post('/genres').send({
          genre: null,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter a genre.'
        );
      });

      it('does not allow genre to be empty', async () => {
        const response = await request(app).post('/genres').send({
          genre: '',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Genre cannot be empty.'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let genres;

    beforeEach(async () => {
      genres = await Promise.all([
        Genre.create({
          genre: 'Fantasy',
        }),
        Genre.create({
          genre: 'Science Fiction',
        }),
        Genre.create({
          genre: 'Horror',
        }),
      ]);
    });

    describe('POST /genres', () => {
      it('does not allow for duplicate genres', async () => {
        const response = await request(app).post('/genres').send({
          genre: 'Science Fiction',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Genre already exists.'
        );
      });
    });

    describe('GET /genres', () => {
      it('gets all genres records', async () => {
        const response = await request(app).get('/genres');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((genre) => {
          const expected = genres.find((a) => a.id === genre.id);

          expect(response.status).to.equal(200);
          expect(genre.genre).to.equal(expected.genre);
        });
      });
    });

    describe('GET /genres/:id', () => {
      it('gets genres record by id', async () => {
        const genre = genres[0];
        const response = await request(app).get(`/genres/${genre.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.genre).to.equal(genre.genre);
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app).get('/genres/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });

    describe('PATCH /genres/:id', () => {
      it('updates genre record by id', async () => {
        const genre = genres[0];
        const response = await request(app).patch(`/genres/${genre.id}`).send({
          genre: 'Dystopian Fantasy',
        });
        const updatedGenreRecord = await Genre.findByPk(genre.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedGenreRecord.genre).to.equal('Dystopian Fantasy');
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app).patch('/genres/12345').send({
          genre: 'Dystopian Fantasy',
        });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });

      it('returns a 400 if trying to patch with duplicate genre', async () => {
        const genre = genres[2];
        const response = await request(app).patch(`/genres/${genre.id}`).send({
          genre: 'Fantasy',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Genre already exists.'
        );
      });
    });

    describe('DELETE /genres/:id', () => {
      it('deletes genre record by id', async () => {
        const genre = genres[0];
        const response = await request(app).delete(`/genres/${genre.id}`);
        const deletedGenre = await Genre.findByPk(genre.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedGenre).to.equal(null);
      });

      it('returns a 404 if the genre does not exist', async () => {
        const response = await request(app).delete('/genres/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The genre could not be found.');
      });
    });
  });
});
