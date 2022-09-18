require('dotenv').config();

const Sequelize = require('sequelize');

let sequelize;
if (process.env.NODE_ENV === "testing")
{
  sequelize = new Sequelize
  (
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: 
      {
        decimalNumbers: true,
      },
    }
  );
}
else
{
  sequelize = new Sequelize
  (
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
      host: 'ascrivener-merchant-game.herokuapp.com',
      dialect: 'mysql',
      dialectOptions: 
      {
        decimalNumbers: true,
      },
    }
  );
}
// const sequelize = new Sequelize
// (
//   process.env.DB_NAME, 
//   process.env.DB_USER, 
//   process.env.DB_PASSWORD, 
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     dialectOptions: 
//     {
//       decimalNumbers: true,
//     },
//   }
// );

module.exports = sequelize;