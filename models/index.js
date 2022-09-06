const User = require('./User');
const SaveFile = require('./SaveFile');
const Location = require('./Location');
const Merchant = require('./Merchant');
const ItemType = require('./ItemType');
const Item = require('./Item');

User.hasMany(SaveFile, 
{
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});

SaveFile.hasMany(Location, 
{
    foreignKey: 'saveFileId',
    onDelete: 'CASCADE'
});

Location.hasMany(Merchant,
{
    foreignKey: 'cityId',
    onDelete: 'CASCADE'
});

Merchant.hasMany(Item,
{
    foreignKey: 'merchantId',
    onDelete: 'CASCADE'
});

Item.hasOne(ItemType,
{
    foreignKey: 'itemTypeId',
});

module.exports = { User, SaveFile, City: Location, Merchant, ItemType, Item };
