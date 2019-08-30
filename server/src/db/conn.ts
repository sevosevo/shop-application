import {Sequelize} from 'sequelize';
const {
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    HOST
} = process.env;

export default new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
    host: HOST,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? true : false
});

