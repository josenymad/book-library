const { Book } = require('../src/models');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');

describe('/books', () => {
  before(async () => await Book.sequelize.sync());

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'Utopia For Realists',
          author: 'Rutger Bregman',
          isbn: '9781408893210',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('Utopia For Realists');
        expect(response.body.author).to.equal('Rutger Bregman');
        expect(response.body.isbn).to.equal('9781408893210');
        expect(newBookRecord.title).to.equal('Utopia For Realists');
        expect(newBookRecord.author).to.equal('Rutger Bregman');
        expect(newBookRecord.isbn).to.equal('9781408893210');
      });

      it('does not allow title to be null', async () => {
        const response = await request(app).post('/books').send({
          title: null,
          author: 'Rutger Bregman',
          isbn: '9781408893210',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter a book title.'
        );
      });

      it('does not allow author to be null', async () => {
        const response = await request(app).post('/books').send({
          title: 'Utopia For Realists',
          author: null,
          isbn: '9781408893210',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Please enter an author.'
        );
      });

      it('does not allow title to be empty', async () => {
        const response = await request(app).post('/books').send({
          title: '',
          author: 'Great Author',
          isbn: '7890986745362',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Book title cannot be empty.'
        );
      });

      it('does not allow author to be empty', async () => {
        const response = await request(app).post('/books').send({
          title: 'Harry Potter',
          author: '',
          isbn: '8904627894527',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Author name cannot be empty.'
        );
      });
    });
  });

  describe('with records in the database', () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: '1984',
          author: 'George Orwell',
          isbn: '9780451524935',
        }),
        Book.create({
          title: 'Brave New World',
          author: 'Aldous Huxley',
          isbn: '9780099518471',
        }),
        Book.create({
          title: 'Lord of the Flies',
          author: 'William Golding',
          isbn: '9780571191475',
        }),
      ]);
    });

    describe('GET /books', () => {
      it('gets all books records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.isbn).to.equal(expected.isbn);
        });
      });
    });

    describe('GET /books/:id', () => {
      it('gets books record by id', async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.isbn).to.equal(book.isbn);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).get('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('PATCH /books/:id', () => {
      it('updates books genre by id', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ isbn: '2896056472967' });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.isbn).to.equal('2896056472967');
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app)
          .patch('/books/12345')
          .send({ isbn: '4906758945378' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });

      it('returns a 400 if trying to patch with duplicate book', async () => {
        const book = books[2];
        const response = await request(app).patch(`/books/${book.id}`).send({
          title: '1984',
        });

        expect(response.status).to.equal(400);
        expect(response.body.errors[0].message).to.equal(
          'Book already exists.'
        );
      });
    });

    describe('DELETE /books/:id', () => {
      it('deletes book record by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).delete('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
  });
});
