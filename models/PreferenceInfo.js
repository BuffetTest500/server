const PreferenceInfo = (sequelize, DataTypes) => {
  return sequelize.define('preferenceInfo', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    interestedSector1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interestedSector2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    interestedSector3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    riskAppetite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stockProportion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    preferredStockType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    period: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};

module.exports = PreferenceInfo;
