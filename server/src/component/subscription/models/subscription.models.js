const { DataTypes } = require("sequelize");
const { connection } = require("../../../connection/connection");
const { RgisterModel } = require("../../signup/models/signup.models");

const SubModel = connection.define(
  "subscription",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoice_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription_created: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription_expire: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    signup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: RgisterModel,
        key: "id",
      },
    },
    session_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "subscription",
    freezeTableName: true,
    timestamps: false,
    paranoid: true,
    underscored: true,
  }
);

module.exports = { SubModel };
