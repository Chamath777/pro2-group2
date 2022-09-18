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
    //NPC or player
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
    coins:
    {
        type: DataTypes.INTEGER,
    },
    workers:
    {
      	type: DataTypes.INTEGER,
    },
    horses:
    {
		  type: DataTypes.INTEGER,
  	},
    locationId:
    {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 
        {
          model: 'location',
          key: 'id',
        },
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
    modelName: 'merchant',
  }
);

module.exports = Merchant;