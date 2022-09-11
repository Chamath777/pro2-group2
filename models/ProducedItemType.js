const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProducedItemType extends Model {}

ProducedItemType.init
({
    id:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    locationId: 
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      references:
      {
        model: 'location',
        key: 'id',
        unique: false,
      },
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'producedItemType',
});

module.exports = ProducedItemType;