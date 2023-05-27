module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'Please enter a genre',
        },
        unique: {
            msg: 'Genre already exists.'
        }
      },
    },
  };

  const GenreModel = connection.define('Genre', schema);

  return GenreModel;
};
