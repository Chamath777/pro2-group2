const router = require('express').Router();
const { User, SaveFile } = require('../../models');
const notFoundResponse = `No user was found with this id.`;
const wrongInformationResponse = `Incorrect email or password, please try again.`;

router.get('/', async (req, res) => 
{
	try
	{
		const data = await User.findAll({ include: [{ model: SaveFile }] });
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.get('/:id', async (req, res) =>
{
	try
	{
		const data = await User.findByPk(req.params.id, { include: [{ model: SaveFile }] });

		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		else res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
	try
	{
		const data = await User.create(req.body);
		req.session.save(() => 
		{
			req.session.userId = data.id;
			req.session.loggedIn = true;
	  
			res.status(200).json(data);
		});
	}
	catch (error) { res.status(500).json(error); }
});

router.post('/login', async (req, res) => 
{
    try 
    {
      const userData = await User.findOne({ where: { email: req.body.email } });
      if (userData === null) { res.status(400).json({ message: wrongInformationResponse}); return; }

      const validPassword = userData.CheckPassword(req.body.password);
      if (validPassword === null) { res.status(400).json({ message: wrongInformationResponse}); return; }

      req.session.save(() => 
	  {
        req.session.userId = userData.id;
        req.session.loggedIn = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });

    } 
	catch (err) { res.status(400).json(err); }
});

router.post('/logout', (req, res) => 
{
	if (req.session.logged_in) 
	{
	  	req.session.destroy(() => { res.status(204).end(); });
	} 
	else { res.status(404).end(); }
});

router.put('/:id', async (req, res) => 
{
	try
	{
		const data = await User.update(req.body, { where: { id: req.params.id }});
		if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
	try
	{
		const data = await User.destroy({ where: { id: req.params.id }});
		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

module.exports = router;