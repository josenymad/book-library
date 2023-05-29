const { Author } = require('../src/models');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('/authors', () => {
  before(async () => await Author.sequelize.sync());

  beforeEach(async () => {
    await Author.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /authors', () => {
      it('creates a new author in the database', async () => {
        const response = await request(app).post('/authors').send({
          author: 'George Orwell',
        });
        const newAuthorRecord = await Author.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.author).to.equal('George Orwell');
        expect(newAuthorRecord.author).to.equal('George Orwell');
      });

      it('does not allow author to be null', async () => {
        const response = await request(app).post('/authors').send({
          author: null,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter an author.'
        );
      });

      it('does not allow author to be empty', async () => {
        const response = await request(app).post('/authors').send({
          author: '',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Author cannot be empty.'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let authors;

    beforeEach(async () => {
      authors = await Promise.all([
        Author.create({
          author: 'Aldous Huxley',
        }),
        Author.create({
          author: 'George Orwell',
        }),
        Author.create({
          author: 'Gabriel Garcia Marquez',
        }),
      ]);
    });

    describe('POST /authors', () => {
      it('does not allow for duplicate authors', async () => {
        const response = await request(app).post('/authors').send({
          author: 'Gabriel Garcia Marquez',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Author already exists.'
        );
      });
    });

    describe('GET /authors', () => {
      it('gets all authors records', async () => {
        const response = await request(app).get('/authors');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((author) => {
          const expected = authors.find((a) => a.id === author.id);

          expect(response.status).to.equal(200);
          expect(author.author).to.equal(expected.author);
        });
      });
    });

    describe('GET /authors/:id', () => {
      it('gets authors record by id', async () => {
        const author = authors[0];
        const response = await request(app).get(`/authors/${author.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.author).to.equal(author.author);
      });

      it('returns a 404 if the author does not exist', async () => {
        const response = await request(app).get('/authors/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The author could not be found.');
      });
    });

    describe('PATCH /authors/:id', () => {
      it('updates author record by id', async () => {
        const author = authors[0];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({
            author: 'J.K. Rowling',
          });
        const updatedAuthorRecord = await Author.findByPk(author.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedAuthorRecord.author).to.equal('J.K. Rowling');
      });

      it('returns a 404 if the author does not exist', async () => {
        const response = await request(app).patch('/authors/12345').send({
          author: 'J.K. Rowling',
        });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The author could not be found.');
      });

      it('returns a 400 if trying to patch with duplicate author', async () => {
        const author = authors[2];
        const response = await request(app)
          .patch(`/authors/${author.id}`)
          .send({
            author: 'Aldous Huxley',
          });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Author already exists.'
        );
      });
    });

    describe('DELETE /authors/:id', () => {
      it('deletes author record by id', async () => {
        const author = authors[0];
        const response = await request(app).delete(`/authors/${author.id}`);
        const deletedAuthor = await Author.findByPk(author.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedAuthor).to.equal(null);
      });

      it('returns a 404 if the author does not exist', async () => {
        const response = await request(app).delete('/authors/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The author could not be found.');
      });
    });
  });
});
