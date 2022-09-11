const User = require('./User');
const SaveFile = require('./SaveFile');
const Location = require('./Location');
const Merchant = require('./Merchant');
const ItemType = require('./ItemType');
const Item = require('./Item');
const ProducedItemType = require('./ProducedItemType');

User.hasMany(SaveFile, 
{
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

SaveFile.belongsTo(User, 
{
    foreignKey: 'userId',
});

SaveFile.hasMany(Location, 
{
    foreignKey: 'saveFileId',
    onDelete: 'CASCADE'
});

Location.belongsTo(SaveFile,
{
    foreignKey: 'saveFileId',
});

Location.hasMany(Merchant,
{
    foreignKey: 'locationId',
    onDelete: 'CASCADE'
});

Merchant.belongsTo(Location,
{
    foreignKey: 'locationId',
    onDelete: 'CASCADE'
});

Merchant.belongsTo(SaveFile,
{
    foreignKey: 'saveFileId',
    onDelete: 'CASCADE'
});

Merchant.hasMany(Item,
{
    foreignKey: 'merchantId',
    onDelete: 'CASCADE'
});

Item.belongsTo(Merchant,
{
    foreignKey: 'merchantId',
});

Item.hasOne(ItemType,
{
    foreignKey: 'itemTypeId',
});

ItemType.belongsToMany(Location,
{
    through:
    {
        model: ProducedItemType,
        unique: false,
    },
});

Location.belongsToMany(ItemType,
{
    through:
    {
        model: ProducedItemType,
        unique: false,
    },
});

module.exports = { User, SaveFile, Location, Merchant, ItemType, Item, ProducedItemType };