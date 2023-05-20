const Sequelize = require('sequelize');
const ReaderModel = require('./reader');

const setupDatabase = () => {
  const connection = new Sequelize('book_library_dev', 'postgres', 'password', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);

  connection.sync({ alter: true });

  return { Reader };
};

module.exports = setupDatabase();
