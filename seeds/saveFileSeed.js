const { SaveFile } = require('../models');

const data =
[
  {
    userId: 1,
    day: 2,
  },
  {
    userId: 1,
    day: 15,
  },
  {
    userId: 2,
    day: 4,
  },
];

const SeedSaveFiles = () => SaveFile.bulkCreate(data);

module.exports = SeedSaveFiles;