const { Location } = require('../models');

const data =
[
  {
    name: "Yurgistan",
    saveFileId: 1,
  },
  {
    name: "Roumatta",
    saveFileId: 1,
  },
  {
    name: "Parga",
    saveFileId: 1,
  },
  {
    name: "Helligi",
    saveFileId: 1,
  },
  {
    name: "Chaoli",
    saveFileId: 1,
  },
];

const SeedLocations = () => Location.bulkCreate(data);

module.exports = SeedLocations;