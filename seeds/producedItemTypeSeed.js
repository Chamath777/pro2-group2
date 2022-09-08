const { ProducedItemType } = require('../models');

const data =
[
  {
    locationId: 1,
    itemTypeId: 1,
  },
  {
    locationId: 1,
    itemTypeId: 3,
  },
  {
    locationId: 2,
    itemTypeId: 6,
  },
  {
    locationId: 2,
    itemTypeId: 7,
  },
  {
    locationId: 2,
    itemTypeId: 2,
  },
  {
    locationId: 3,
    itemTypeId: 1,
  },
  {
    locationId: 3,
    itemTypeId: 5,
  },
  {
    locationId: 4,
    itemTypeId: 8,
  },
  {
    locationId: 4,
    itemTypeId: 3,
  },
  {
    locationId: 4,
    itemTypeId: 1,
  },
  {
    locationId: 5,
    itemTypeId: 6,
  },
];

const SeedProducedItemTypes = () => ProducedItemType.bulkCreate(data);

module.exports = SeedProducedItemTypes;