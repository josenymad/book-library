module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      validate: {
        notNull: {
          msg: 'Please enter your name.',
        },
        notEmpty: {
          msg: 'Name cannot be empty.',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: {
        args: true,
        msg: 'Email is already registered.',
      },
      validate: {
        notNull: {
          msg: 'Please enter your email.',
        },
        isEmail: {
          msg: 'Please enter a valid email.',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a password.',
        },
        checkLength(password) {
          if (password.length < 8) {
            throw new Error('Password must have at least 8 characters.');
          }
        },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);

  return ReaderModel;
};
