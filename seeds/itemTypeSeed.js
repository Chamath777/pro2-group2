const { ItemType } = require('../models');

const data =
[
  {
    name: "Vegetables",
    weight: 10,
    edible: true,
    basePrice: 4,
    minPrice: 2,
    maxPrice: 8,
  },
  {
    name: "Bread",
    weight: 4,
    edible: true,
    basePrice: 4,
    minPrice: 2,
    maxPrice: 12,
  },
  {
    name: "Fish",
    weight: 5,
    edible: true,
    basePrice: 5,
    minPrice: 1,
    maxPrice: 15,
  },
  {
    name: "Chicken",
    weight: 10,
    edible: true,
    basePrice: 15,
    minPrice: 10,
    maxPrice: 45,
  },
  {
    name: "Pork",
    weight: 15,
    edible: true,
    basePrice: 13,
    minPrice: 8,
    maxPrice: 40,
  },
  {
    name: "Beef",
    weight: 15,
    edible: true,
    basePrice: 13,
    minPrice: 8,
    maxPrice: 40,
  },
  {
    name: "Cloth",
    weight: 10,
    basePrice: 15,
    minPrice: 8,
    maxPrice: 40,
  },
  {
    name: "Silk",
    weight: 8,
    basePrice: 50,
    minPrice: 40,
    maxPrice: 120,
  },
  {
    name: "Leather",
    weight: 10,
    basePrice: 20,
    minPrice: 10,
    maxPrice: 40,
  },
  {
    name: "Copper",
    weight: 35,
    basePrice: 20,
    minPrice: 8,
    maxPrice: 35,
  },
  {
    name: "Iron",
    weight: 50,
    basePrice: 30,
    minPrice: 15,
    maxPrice: 50,
  },
  {
    name: "Silver",
    weight: 25,
    basePrice: 60,
    minPrice: 50,
    maxPrice: 80,
  },
  {
    name: "Gold",
    weight: 25,
    basePrice: 100,
    minPrice: 80,
    maxPrice: 150,
  },
  {
    name: "Wood",
    weight: 20,
    basePrice: 8,
    minPrice: 3,
    maxPrice: 16,
  },
  {
    name: "Charcoal",
    weight: 1,
    basePrice: 3,
    minPrice: 1,
    maxPrice: 5,
  },
];

const SeedItemTypes = () => ItemType.bulkCreate(data);

module.exports = SeedItemTypes;
