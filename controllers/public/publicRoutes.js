const router = require("express").Router();
const { Merchant, SaveFile, Location, User } = require("../../models");
const RedirectToLogin = require("../../utils/redirectToLogin");

router.get("/", async (req, res) => {
  try {
    res.render("login", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/signUp", async (req, res) => 
{
  if (req.session.loggedIn) res.redirect("/saveFile");
  else res.render("signUp");
});

router.get("/saveFile", RedirectToLogin, async (req, res) => 
{
  try {
    const userData = await User.findOne({ where: { id: req.session.userId }})
    const user = userData.get({ plain: true });

    const saveFileData = await SaveFile.findAll({
      where: { userId: user.id },
    });
    const saveFiles = saveFileData.map((data) => data.get({ plain: true }));

    res.render("saveFile", {
      saveFiles,
      userName: user.name,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/worldMap", RedirectToLogin, async (req, res) => {
  try {
    const locationData = await Location.findAll({
      where: { saveFileId: req.session.saveFileId },
    });
    const locations = locationData.map((data) => data.get({ plain: true }));

    res.render("worldMap", {
      locations,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/location/:id", RedirectToLogin, async (req, res) => {
  try {
    const locationData = await Location.findByPk(
      req.params.id,
      { where: { saveFileId: req.session.saveFileId } },
      { include: [{ model: Merchant }] }
    );
    const location = locationData.get({ plain: true });

    res.render("location", {
      location,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;