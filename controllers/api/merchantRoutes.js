const router = require('express').Router();
const { Merchant, Item } = require('../../models');
const notFoundResponse = `No merchant was found with this id.`;

router.get('/', async (req, res) => 
{
  try
  {
    const data = await Merchant.findAll({ include: [{ model: Item }] });
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }

});

router.get('/:id', async (req, res) =>
{
  try
  {
    const data = await Merchant.findByPk(req.params.id, { include: [{ model: Item }] });

    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    else res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
  try
  {
    const data = await Merchant.create(req.body);
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) => 
{
  try
  {
    const data = await Merchant.update(req.body, { where: { id: req.params.id }});
    if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
  try
  {
    const data = await Merchant.destroy({ where: { id: req.params.id }});
    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

module.exports = router;