module.exports = (connection, DataTypes) => {
  const schema = {
    title: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a book title.'
        }
      }
    },
    author: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter an author.'
        }
      }
    },
    genre: { type: DataTypes.STRING, },
    isbn: { type: DataTypes.STRING, },
  };

  const BookModel = connection.define('Book', schema);

  return BookModel;
};
