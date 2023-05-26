const { Reader } = require('../src/models');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('/readers', () => {
  before(async () => await Reader.sequelize.sync());

  beforeEach(async () => {
    await Reader.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /readers', () => {
      it('creates a new reader in the database', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'randompassword',
        });
        const newReaderRecord = await Reader.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.name).to.equal('Elizabeth Bennet');
        expect(response.body.email).to.equal('future_ms_darcy@gmail.com');
        expect(response.body.password).to.equal('randompassword');
        expect(newReaderRecord.name).to.equal('Elizabeth Bennet');
        expect(newReaderRecord.email).to.equal('future_ms_darcy@gmail.com');
        expect(newReaderRecord.password).to.equal('randompassword');
      });

      it('does not allow name to be null', async () => {
        const response = await request(app).post('/readers').send({
          name: null,
          email: 'randomemail@gmail.com',
          password: 'securepassword',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter your name.'
        );
      });

      it('does not allow email to be null', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Full Name',
          email: null,
          password: 'password',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter your email.'
        );
      });

      it('does not allow password to be null', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Full Name',
          email: 'email@gmail.com',
          password: null,
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter a password.'
        );
      });

      it('does not allow email in the wrong format', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Full Name',
          email: 'wrongemailexamplehotmail.co.uk',
          password: 'password',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter a valid email.'
        );
      });

      it('does not allow password shorter than 8 characters', async () => {
        const response = await request(app).post('/readers').send({
          name: 'Full Name',
          email: 'correctemail@gmail.com',
          password: 'guess',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Password must have at least 8 characters.'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let readers;

    beforeEach(async () => {
      readers = await Promise.all([
        Reader.create({
          name: 'Elizabeth Bennet',
          email: 'future_ms_darcy@gmail.com',
          password: 'randompassword',
        }),
        Reader.create({
          name: 'Arya Stark',
          email: 'vmorgul@me.com',
          password: 'anotherpassword',
        }),
        Reader.create({
          name: 'Lyra Belacqua',
          email: 'darknorth123@msn.org',
          password: 'password',
        }),
      ]);
    });

    describe('GET /readers', () => {
      it('gets all readers records', async () => {
        const response = await request(app).get('/readers');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((reader) => {
          const expected = readers.find((a) => a.id === reader.id);

          expect(reader.name).to.equal(expected.name);
          expect(reader.email).to.equal(expected.email);
          expect(reader.password).to.equal(expected.password);
        });
      });
    });

    describe('GET /readers/:id', () => {
      it('gets readers record by id', async () => {
        const reader = readers[0];
        const response = await request(app).get(`/readers/${reader.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.name).to.equal(reader.name);
        expect(response.body.email).to.equal(reader.email);
        expect(response.body.password).to.equal(reader.password);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/readers/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('PATCH /readers/:id', () => {
      it('updates readers email by id', async () => {
        const reader = readers[0];
        const response = await request(app)
          .patch(`/readers/${reader.id}`)
          .send({ email: 'miss_e_bennet@gmail.com' });
        const updatedReaderRecord = await Reader.findByPk(reader.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedReaderRecord.email).to.equal('miss_e_bennet@gmail.com');
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app)
          .patch('/readers/12345')
          .send({ email: 'some_new_email@gmail.com' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });

    describe('DELETE /readers/:id', () => {
      it('deletes reader record by id', async () => {
        const reader = readers[0];
        const response = await request(app).delete(`/readers/${reader.id}`);
        const deletedReader = await Reader.findByPk(reader.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedReader).to.equal(null);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).delete('/readers/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The reader could not be found.');
      });
    });
  });
});
