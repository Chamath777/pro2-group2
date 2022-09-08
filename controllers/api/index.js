const router = require('express').Router();
const locationRoutes = require('./locationRoutes');
const merchantRoutes = require('./merchantRoutes');
const itemRoutes = require('./itemRoutes');
const itemTypeRoutes = require('./itemTypeRoutes');
const producedItemTypeRoutes = require('./producedItemTypeRoutes');
const userRoutes = require('./userRoutes');
const saveFileRoutes = require('./saveFileRoutes');

router.use('/location', locationRoutes);
router.use('/merchant', merchantRoutes);
router.use('/item', itemRoutes);
router.use('/itemType', itemTypeRoutes);
router.use('/producedItemType', producedItemTypeRoutes);
router.use('/user', userRoutes);
router.use('/saveFile', saveFileRoutes);

module.exports = router;