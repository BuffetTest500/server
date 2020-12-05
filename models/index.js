const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./User')(sequelize, Sequelize);
db.PreferenceInfo = require('./PreferenceInfo')(sequelize, Sequelize);

db.User.hasOne(db.PreferenceInfo, {
  onDelete: 'cascade',
});

db.PreferenceInfo.belongsTo(db.User, {
  foreignKey: {
    allowNull: true,
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
