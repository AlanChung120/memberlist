import { Sequelize } from "sequelize";

// get data
const datab = ''; // enter the name of the database
const password = ''; // enter your own password for MySQL
const db = new Sequelize(datab, 'root', password, {
    host: "localhost",
    dialect: "mysql"
});

export default db;
