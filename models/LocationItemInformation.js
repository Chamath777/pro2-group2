const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class LocationItemInformation extends Model {}

LocationItemInformation.init
({
    id:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    isItemProducedHere:
    {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    price:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
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

module.exports = LocationItemInformation;