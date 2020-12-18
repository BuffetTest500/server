const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize);
db.PreferenceInfo = require('./PreferenceInfo')(sequelize, Sequelize);
db.CompanyProfile = require('./CompanyProfile')(sequelize, Sequelize);
db.PortfolioItem = require('./PortfolioItem')(sequelize, Sequelize);
db.Hit = require('./Hit')(sequelize, Sequelize);

db.User.hasOne(db.PreferenceInfo, {
  onDelete: 'cascade',
});

db.PreferenceInfo.belongsTo(db.User, {
  foreignKey: {
    allowNull: true,
  }
});

db.User.hasMany(db.PortfolioItem, {
  onDelete: 'cascade',
});

db.PortfolioItem.belongsTo(db.User);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
