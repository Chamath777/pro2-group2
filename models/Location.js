const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init
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
    xPosition:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    yPosition:
    {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    saveFileId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 
        {
          model: 'saveFile',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'location',
  }
);

module.exports = Location;