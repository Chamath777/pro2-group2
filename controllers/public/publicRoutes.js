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
			onHomePage: true,
		});
	}
	catch (err) { res.status(500).json(err); }
});

router.get("/worldMap/:id", RedirectToLogin, async (req, res) => 
{
	try 
	{
		const locationData = await Location.findAll({ where: { saveFileId: req.params.id } });
		const locations = locationData.map((data) => data.get({ plain: true }));

		if (locations)
		{
			const playerData = await Merchant.findOne({where: {saveFileId: req.params.id, merchantType: "player"}, include: [{ model: Item }] });
			const player = await playerData.get({ plain: true });

			const locationInfo = await AddLocationInfo(locations, player);
			const playerInfo = await AddPlayerFoodCount(player);

			req.session.save(() => 
			{
				req.session.saveFileId = req.params.id;
			
				res.render("worldMap", 
				{
					locationInfo,
					playerInfo,
					loggedIn: req.session.loggedIn,
					onHomePage: false,
				});
			});
		}
		else res.redirect('/saveFile');
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
		if (location)
		{
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

			const merchantInfo = await AddItemInformation(merchant, location, player.coins);
			const playerInfo = await AddItemInformation(player, location, player.coins);
			
			req.session.save(() => 
			{
				req.session.locationId = req.params.id;
			
				res.render("location", 
				{
					location,
					merchantInfo,
					playerInfo,
					loggedIn: req.session.loggedIn,
					onHomePage: false,
				});
			});
		}
		else res.redirect('/saveFile');
	} 
	catch (err) { res.status(500).json(err); }
});

router.get("/gameOver/:id", RedirectToLogin, async (req, res) => 
{
	try 
	{
		let gameOverMessage;
		if (req.params.id === "noFood") gameOverMessage = "You did not have enough food to feed everyone! Game Over";
		else gameOverMessage = "You did not have enough money to pay wages! Game Over";

		res.render("gameOver", {
			gameOverMessage,
			loggedIn: req.session.loggedIn,
			onHomePage: false,
		});
	} 
	catch (err) { res.status(500).json(err); }
});

async function AddLocationInfo(locationData, playerData)
{
	let currentLocation;
	for (let i = 0; i < locationData.length; i++) 
	{ 
		if (locationData[i].id == playerData.locationId) currentLocation = locationData[i];
	}

	let wages = playerData.workers * 3;
	let foodConsumption = playerData.workers + playerData.horses;

	for (let i = 0; i < locationData.length; i++) 
	{
		const daysToReach = await CalculateDistanceBetweenLocations(currentLocation, locationData[i]);
		locationData[i].daysToReach = daysToReach;
		locationData[i].wages = daysToReach * wages;
		locationData[i].food = daysToReach * foodConsumption;
		locationData[i].isPlayerHere = (playerData.locationId == locationData[i].id ? true : false);
	}
	return locationData;
}

async function CalculateDistanceBetweenLocations(location1, location2)
{
    return Math.floor(Math.sqrt(Math.pow(location2.xPosition - location1.xPosition, 2) + Math.pow(location2.yPosition - location1.yPosition, 2)));
}

async function AddPlayerFoodCount(playerData)
{
	let foodCount = 0;
	for (let i = 0; i < playerData.items.length; i++) 
	{
		const itemType = await ItemType.findByPk(playerData.items[i].itemTypeId);
		if (itemType.edible)
		{
			foodCount += playerData.items[i].quantity;
		}
	}
	playerData.foodCount = foodCount;
	return playerData;
}

async function AddItemInformation(merchant, location, playerCoins)
{
	for (let i = 0; i < merchant.items.length; i++) 
	{
		const itemType = await ItemType.findByPk(merchant.items[i].itemTypeId);
		merchant.items[i].name = itemType.name;
		merchant.items[i].edible = itemType.edible;
		//A hacky workaround to get the else statement in handlebars to work properly as it can't access information outside of the else statement
		merchant.items[i].playerCoins = playerCoins;
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