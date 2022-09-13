const SeedItemTypes = require('./itemTypeSeed');
const SeedUsers = require('./userSeed');
const SeedLocations = require('./locationSeed');
const SeedProducedItemTypes = require('./producedItemTypeSeed');
const SeedSaveFiles = require('./saveFileSeed');

const sequelize = require('../config/connection');

async function SeedAll()
{
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  await SeedItemTypes();
  console.log('\n----- ITEM TYPES SEEDED -----\n');

  await SeedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await SeedSaveFiles();
  console.log('\n----- SAVE FILES SEEDED -----\n');

  //await SeedLocations();
  //console.log('\n----- LOCATIONS SEEDED -----\n');

  //await SeedProducedItemTypes();
  //console.log('\n----- PRODUCED ITEM TYPES SEEDED -----\n');

  process.exit(0);
};

SeedAll();