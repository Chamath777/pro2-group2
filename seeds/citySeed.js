const { City } = require('../models');

const data =
[
  {
    name: "Yurgistan",
  },
  {
    name: "Roumatta",
  },
  {
    name: "Parga",
  },
  {
    name: "Helligi",
  },
  {
    name: "Chaoli",
  },
];

const SeedCities = () => City.bulkCreate(data);

module.exports = SeedCities;