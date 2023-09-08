const Sequelize = require("sequelize");
const connection = new Sequelize({
  dialect: "mysql",
  host: "192.168.1.54",
  port: 3306,
  database: "sonali",
  username: "root",
  password: "root@123",
  synchronize: false,
});

module.exports = { connection };
