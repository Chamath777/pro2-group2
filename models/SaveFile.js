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