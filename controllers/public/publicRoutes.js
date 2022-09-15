const router = require("express").Router();
const { Merchant, SaveFile, Location, User, Item, ItemType, LocationItemInformation } = require("../../models");
const RedirectToLogin = require("../../utils/redirectToLogin");

router.get("/", async (req, res) => 
{
	try { res.render("login", { loggedIn: req.session.loggedIn }); } 
	catch (err) { res.status(500).json(err); }
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
	}
	catch (err) { res.status(500).json(err); }
});

router.get("/worldMap", RedirectToLogin, async (req, res) => 
{
	try 
	{
		if (req.session.saveFileId)
		{
			const locationData = await Location.findAll({
				where: { saveFileId: req.session.saveFileId },
			});
			const locations = locationData.map((data) => data.get({ plain: true }));

			res.render("worldMap", {
				locations,
				loggedIn: req.session.loggedIn,
			});
		}
	} 
	catch (err) { res.status(500).json(err); }
});

router.get("/worldMap/:id", RedirectToLogin, async (req, res) => 
{
	try 
	{
	  const locationData = await Location.findAll({
		  where: { saveFileId: req.params.id },
	  });
	  const locations = locationData.map((data) => data.get({ plain: true }));
  
	  req.session.save(() => 
	  {
		  req.session.saveFileId = req.params.id;
	  
		  res.render("worldMap", {
			  locations,
			  loggedIn: req.session.loggedIn,
		  });
	  });
	} 
	catch (err) { res.status(500).json(err); }
});

router.get("/location/:id", RedirectToLogin, async (req, res) => 
{
	try
	{
		const locationData = await Location.findByPk(req.params.id, 
		{ 
			include: [{ model: Merchant }, { model: ItemType, through: LocationItemInformation }] 
		});
		const location = await locationData.get({ plain: true });

		const merchantData = await Merchant.findOne
		(
			{ where: { locationId: req.params.id, merchantType: "npc" }, include: [{ model: Item }] }
		);
		const merchant = await merchantData.get({ plain: true });

		const playerData = await Merchant.findOne
		(
			{ where: { saveFileId: req.session.saveFileId, merchantType: "player"},
			include: [{ model: Item }] }
		);
		const player = await playerData.get({ plain: true });

		const merchantInfo = await AddItemInformation(merchant, location);
		const playerInfo = await AddItemInformation(player, location);

		req.session.save(() => 
		{
			req.session.locationId = req.params.id;
		
			res.render("location", 
			{
				location,
				merchantInfo,
				playerInfo,
				loggedIn: req.session.loggedIn,
			});
		});
	} 
	catch (err) { res.status(500).json(err); }
});

async function AddItemInformation(merchant, location)
{
	for (let i = 0; i < merchant.items.length; i++) 
	{
		const itemType = await ItemType.findByPk(merchant.items[i].itemTypeId);
		merchant.items[i].name = itemType.name;
		for (let j = 0; j < location.itemTypes.length; j++) 
		{
			if (itemType.id === location.itemTypes[j].locationItemInformation.itemTypeId)
			{
				merchant.items[i].price = location.itemTypes[j].locationItemInformation.price;
			}
		}
	}
	return merchant;
}

module.exports = router;