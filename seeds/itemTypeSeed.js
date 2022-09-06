const { ItemType } = require('../models');

const data =
[
  {
    name: "Salted Fish",
    basePrice: 5,
    minPrice: 1,
    maxPrice: 15,
  },
  {
    name: "Leather",
    basePrice: 20,
    minPrice: 10,
    maxPrice: 40,
  },
  {
    name: "Iron",
    basePrice: 30,
    minPrice: 15,
    maxPrice: 50,
  },
  {
    name: "Wood",
    basePrice: 8,
    minPrice: 3,
    maxPrice: 16,
  },
];

const SeedItemTypes = () => ItemType.bulkCreate(data);

module.exports = SeedItemTypes;
