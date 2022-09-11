const router = require('express').Router();
const publicRoutes = require('./publicRoutes');

router.use('/', publicRoutes);

module.exports = router;