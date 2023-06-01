# Book Library API

This app is designed to manage a book library database.

It features 4 tables: Books, Authors, Readers, and Genres.

## Tech / Frameworks

- PostgreSQL
- Express.JS
- Node.JS
- Sequelize
- Mocha/Chai/Supertest
- Docker - https://docs.docker.com/get-docker/
- Postman - https://www.postman.com/downloads/

## Installation

1. Start a Postgres instance:

    - `docker run --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres`

2. Fork and then clone this repository.

3. Navigate to the local folder created on your machine and run

    - `npm install`

4. Start the app by running

    - `npm start`

5. Open Postman to interact with the database.


## How to use:

    - Base URL: `http://localhost:3000`

### Data should be sent in JSON:

![alt text](./images/Screenshot%202023-06-01%20at%2016.08.14.png)

### When getting data with associated tables, make sure to *not* use the plural version of the associated table name:

    `http://localhost:3000/books/?with=genre` ✔︎
    `http://localhost:3000/books/?with=genres` ✖︎

| Route | HTTP Method | Description |
| ----- | ------------| ------------|
| /books | POST | Creates a book 
| /readers | POST | Creates a reader 
| /authors | POST | Creates an author
| /genres | POST | Creates a genre
| /books | GET | Gets all books
| /readers | GET | Gets all readers
| /authors | GET | Gets all authors
| /genres | GET | Gets all genres
| /books/id | GET | Finds book by id
| /readers/`id` | GET | Finds reader by id
| /authors/`id` | GET | Finds author by id
| /genres/`id` | GET | Finds genre by id
| /books/?with=`firstAssociation`&also=`secondAssociation` | GET | Gets all books with optional data from associated tables
| /readers/?with=`firstAssociation`&also=`secondAssociation` | GET | Gets all readers with optional data from associated tables
| /authors/?with=`firstAssociation`&also=`secondAssociation` | GET | Gets all authors with optional data from associated tables
| /genres/?with=`firstAssociation`&also=`secondAssociation` | GET | Gets all genres with optional data from associated tables
| /books/`id` | PATCH | Updates book
| /readers/`id` | PATCH | Updates reader
| /authors/`id` | PATCH | Updates author
| /genres/`id` | PATCH | Updates genre
| /books/`id` | DELETE | Deletes book
| /readers/`id` | DELETE | Deletes reader
| /authors/`id` | DELETE | Deletes author
| /genres/`id` | DELETE | Deletes genre
