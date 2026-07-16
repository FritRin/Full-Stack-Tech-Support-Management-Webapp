import { Sequelize } from "sequelize";
const sequelize = new Sequelize('sportsprotechsupportdb', 'victoria', 'sqlpass', {
  host: 'db',
  dialect: 'postgres',
});

export default sequelize;