const router = require('express').Router();
const { Merchant, SaveFile, Location } = require('../../models');
const RedirectToLogin = require('../../utils/redirectToLogin');

router.get('/', async (req, res) => 
{
    try { res.render('login',  {loggedIn: req.session.loggedIn}); } 
    catch (err) { res.status(500).json(err); }
});

router.get('/signup', async (req, res) => 
{
    if (req.session.loggedIn) res.redirect('/playerHomePage');
	else res.render('signup');
});

router.get('/playerHomePage', RedirectToLogin, async (req, res) => 
{
    try
    {
      const saveFileData = await SaveFile.findAll({where: {userId: req.session.userId}},);
      const saveFiles = saveFiles.map((data) => data.get({ plain: true }));
  
      res.render('playerHomePage', 
      {
          ...saveFiles,
          loggedIn: req.session.loggedIn
      });
    } 
    catch (err) { res.status(500).json(err); }
});

router.get('/worldMap', RedirectToLogin, async (req, res) => 
{
    try
    {
      const locationData = await Location.findAll({where: {saveFileId: req.session.saveFileId}},);
      const locations = locationData.map((data) => data.get({ plain: true }));

      res.render('worldMap', 
      {
          ...locations,
          loggedIn: req.session.loggedIn
      });
    } 
    catch (err) { res.status(500).json(err); }
});

router.get('/location/:id', RedirectToLogin, async (req, res) => 
{
    try
    {
      const locationData = await Location.findByPk(req.params.id, {where: {saveFileId: req.session.saveFileId},}, { include: [{ model: Merchant }] });
      const location = locationData.get({ plain: true });

      res.render('location', 
      {
          ...location,
          loggedIn: req.session.loggedIn
      });
    } 
    catch (err) { res.status(500).json(err); }
});

module.exports = router;