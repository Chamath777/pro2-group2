const { SaveFile } = require('../models');

const data =
[
  {
    userId: 1,
  },
  {
    userId: 2,
  },
];

const SeedSaveFiles = () => SaveFile.bulkCreate(data);

module.exports = SeedSaveFiles;