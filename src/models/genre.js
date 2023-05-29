module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: {
        args: true,
        msg: 'Genre already exists.',
      },
      validate: {
        notNull: {
          msg: 'Please enter a genre.',
        },
        notEmpty: {
          msg: 'Genre cannot be empty.',
        },
      },
    },
  };

  const GenreModel = connection.define('Genre', schema);

  return GenreModel;
};
