const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ItemType extends Model {}

ItemType.init
(
  {
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name:
    {
        type: DataTypes.STRING,
        allowNull: false,
    },
    basePrice:
    {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    minPrice:
    {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    maxPrice:
    {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'itemType',
  }
);

module.exports = ItemType;