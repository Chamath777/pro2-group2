const router = require('express').Router();
const { User, SaveFile } = require('../../models');
const notFoundResponse = `No user was found with this id.`;

router.get('/', async (req, res) => 
{
	try
	{
		const data = await SaveFile.findAll({ include: [{ model: User }] });
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.get('/session', async (req, res) => 
{
	try
	{
		res.status(200).json({saveFileId: req.session.saveFileId, userId: req.session.userId, locationId: req.session.locationId});
	}
	catch (error) { res.status(500).json(error); }
});

router.get('/current', async (req, res) => 
{
	try
	{
		const data = await SaveFile.findOne({ where: { id: req.session.saveFileId }}, { include: [{ model: User }] });
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.get('/:id', async (req, res) =>
{
	try
	{
		const data = await SaveFile.findByPk(req.params.id, { include: [{ model: User }] });

		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		else res.status(200).json(data);
	}
  	catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
	try
	{
		const data = await SaveFile.create({userId: req.session.userId});
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) => 
{
	try
	{
		const data = await SaveFile.update(req.body, { where: { id: req.params.id }});
		if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
	try
	{
		const data = await SaveFile.destroy({ where: { id: req.params.id }});
		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

module.exports = router;