const { User } = require('../models');

const data =
[
  {
    name: "Alex",
    email: "alex@gmail.com",
    password: "pass"
  },
  {
    name: "Appoline",
    email: "appoline@gmail.com",
    password: "pass"
  },
];

const SeedUsers = () => User.bulkCreate(data);

module.exports = SeedUsers;