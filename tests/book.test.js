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
                    genre: 'Non-fiction',
                    isbn: '978-1-4088-9321-0'
                });
                const newBookRecord = await Book.findByPk(response.body.id, {
                    raw: true,
                });

                expect(response.status).to.equal(201);
                expect(response.body.title).to.equal('Utopia For Realists');
                expect(response.body.author).to.equal('Rutger Bregman');
                expect(response.body.genre).to.equal('Non-fiction');
                expect(response.body.isbn).to.equal('978-1-4088-9321-0');
                expect(newBookRecord.title).to.equal('Utopia For Realists');
                expect(newBookRecord.author).to.equal('Rutger Bregman');
                expect(newBookRecord.genre).to.equal('Non-fiction');
                expect(newBookRecord.isbn).to.equal('978-1-4088-9321-0');
            });
        });
    });
});