const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Merchant extends Model {}

Merchant.init
(
  {
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    //Buyer or seller or player
    merchantType:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cityId:
    {
        type: DataTypes.INTEGER,
        references: 
        {
          model: 'city',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'merchant',
  }
);

module.exports = Merchant;