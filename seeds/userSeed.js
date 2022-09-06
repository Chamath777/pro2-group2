const { User } = require('../models');

const data =
[
  {
    name: "Alex",
    email: "alex@gmail.com",
    password: "thisIsABadPassword"
  },
  {
    name: "Appoline",
    email: "appoline@gmail.com",
    password: "thisIsABadPassword"
  },
];

const SeedUsers = () => User.bulkCreate(data);

module.exports = SeedUsers;