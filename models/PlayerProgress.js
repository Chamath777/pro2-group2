const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PlayerProgress extends Model {}

PlayerProgress.init
(
  {
    id:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    day:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    coins:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
	food:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    workers:
    {
      	type: DataTypes.INTEGER,
        allowNull: false,
    },
    horses:
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
    modelName: 'playerProgress',
  }
);

module.exports = PlayerProgress;