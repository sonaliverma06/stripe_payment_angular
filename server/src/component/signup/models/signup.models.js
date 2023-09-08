const { DataTypes } = require("sequelize");
const { connection } = require("../../../connection/connection");
const { SubModel } = require("../../subscription/models/subscription.models");


const RgisterModel = connection.define(
  "signup",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contect: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "signup",
    freezeTableName: true,
    timestamps: false,
    paranoid: true,
    underscored: true,
  }
);
RgisterModel.hasMany(SubModel, {
  foriegn_key: "signup_id",
  as: "signup_subscriptions",
});
SubModel.belongsTo(RgisterModel, { foriegn_key: "signup_id", as: "signup" });

module.exports = { RgisterModel };
