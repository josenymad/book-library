module.exports = (connection, DataTypes) => {
  const schema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name.'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      isEmail: true,
      validate: {
        notNull: {
          msg: 'Please enter your email.' 
        },
        isEmail: {
          msg: 'Please enter a valid email.'
        }
      }
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false,
      len: [8, 32],
      validate: {
        notNull: {
          msg: 'Please enter a password.'
        },
        len: {
          msg: 'Password must have between 8 and 32 characters.'
        }
      }
    },
  };

  const ReaderModel = connection.define('Reader', schema);

  return ReaderModel;
};
