const router = require('express').Router();
const { Location, Merchant, LocationItemInformation, ItemType } = require('../../models');
const notFoundResponse = `No location was found with this id.`;

router.get('/', async (req, res) => 
{
	try
	{
		const data = await Location.findAll({ include: [{ model: Merchant }, { model: ItemType, through: LocationItemInformation }] });
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.get('/currentLocation', async (req, res) =>
{
  try
  {
    const data = await Location.findOne({where: {id: req.session.locationId}}, { include: [{ model: Merchant }, { model: ItemType, through: LocationItemInformation }] });

    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    else res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.get('/:id', async (req, res) =>
{
	try
	{
		const data = await Location.findByPk(req.params.id, { include: [{ model: Merchant }, { model: ItemType, through: LocationItemInformation }] });

		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		else res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
	try
	{
		const data = await Location.create(req.body);
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) => 
{
	try
	{
		const data = await Location.update(req.body, { where: { id: req.params.id }});
		if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
	try
	{
		const data = await Location.destroy({ where: { id: req.params.id }});
		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

module.exports = router;