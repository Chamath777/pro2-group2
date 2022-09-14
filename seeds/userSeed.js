const { User } = require('../models');

//Password is password
const data =
[
  {
    name: "Alex",
    email: "alex@gmail.com",
    password: "$2b$10$Cz38/.ddSYlk7klbuRyGUOt.LkyAtB8WnUYAc32p/nP6ICzJChkq2"
  },
  {
    name: "Appoline",
    email: "appoline@gmail.com",
    password: "$2b$10$Cz38/.ddSYlk7klbuRyGUOt.LkyAtB8WnUYAc32p/nP6ICzJChkq2"
  },
];

const SeedUsers = () => User.bulkCreate(data);

module.exports = SeedUsers;