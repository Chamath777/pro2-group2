const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SaveFile extends Model {}

SaveFile.init
(
  {
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    //What day this player is on, for simplicity's sake we'll have the day advance by one every time the player moves between cities
    day:
    {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    userId:
    {
        type: DataTypes.INTEGER,
        references: 
        {
          model: 'user',
          key: 'id',
        },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'saveFile',
  }
);

module.exports = SaveFile;