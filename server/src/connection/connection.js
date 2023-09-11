const Sequelize = require("sequelize");
const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  port: 3306,
  database: "sonali",
  username: "root",
  password: "root@123",
  synchronize: false,
});

module.exports = { connection };
