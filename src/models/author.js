module.exports = (connection, DataTypes) => {
  const schema = {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: {
        args: true,
        msg: 'Author already exists.',
      },
      validate: {
        notNull: {
          msg: 'Please enter an author.',
        },
        notEmpty: {
          msg: 'Author cannot be empty.',
        },
      },
    },
  };

  const AuthorModel = connection.define('Author', schema);

  return AuthorModel;
};
