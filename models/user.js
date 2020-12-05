const User = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    uid: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferenceInfoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });
};

module.exports = User;
