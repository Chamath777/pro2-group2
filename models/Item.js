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
    quantity:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    itemTypeId:
    {
        type: DataTypes.INTEGER,
        references: 
        {
          model: 'itemType',
          key: 'id',
        },
    },
    merchantId:
    {
        type: DataTypes.INTEGER,
        references: 
        {
          model: 'itemType',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'item',
  }
);

module.exports = Item;