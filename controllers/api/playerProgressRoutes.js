const router = require('express').Router();
const { PlayerProgress } = require('../../models');
const notFoundResponse = `No playerProgress was found with this id.`;

router.get('/', async (req, res) => 
{
	try
	{
		const data = await PlayerProgress.findAll();
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.get('/current', async (req, res) =>
{
	try
	{
		const data = await PlayerProgress.findAll({ where: { saveFileId: req.session.saveFileId }});

		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		else res.status(200).json(data);
	}
  	catch (error) { res.status(500).json(error); }
});

router.get('/:id', async (req, res) =>
{
	try
	{
		const data = await PlayerProgress.findAll({ where: { saveFileId: req.params.id } });

		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		else res.status(200).json(data);
	}
  	catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
	try
	{
		const data = await PlayerProgress.create(req.body);
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.post('/current', async (req, res) => 
{
	try
	{
		let body = req.body;
		body.saveFileId = req.session.saveFileId;
		const data = await PlayerProgress.create(body);
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) => 
{
	try
	{
		const data = await PlayerProgress.update(req.body, { where: { id: req.params.id }});
		if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
	try
	{
		const data = await PlayerProgress.destroy({ where: { id: req.params.id }});
		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

module.exports = router;