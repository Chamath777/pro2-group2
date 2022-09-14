const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init
(
  {
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    price:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    itemTypeId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 
        {
          model: 'itemType',
          key: 'id',
          unique: false,
        },
    },
    merchantId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 
        {
          model: 'merchant',
          key: 'id',
          unique: false,
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'item',
  }
);

module.exports = Item;