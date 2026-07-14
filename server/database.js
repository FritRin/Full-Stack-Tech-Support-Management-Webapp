
const Sequelize = require('sequelize');
const sequelize = new Sequelize('sportsprotechsupportdb', 'victoria', 'sqlpass', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;