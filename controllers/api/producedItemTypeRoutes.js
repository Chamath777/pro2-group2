const router = require('express').Router();
const { Location, ItemType, ProducedItemType } = require('../../models');
const notFoundResponse = `No location was found with this id.`;

router.get('/', async (req, res) => 
{
  try
  {
    const data = await ProducedItemType.findAll();
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }

});

router.get('/:id', async (req, res) =>
{
  try
  {
    const data = await ProducedItemType.findByPk(req.params.id);

    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    else res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
  try
  {
    const data = await ProducedItemType.create(req.body);
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) => 
{
  try
  {
    const data = await ProducedItemType.update(req.body, { where: { id: req.params.id }});
    if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
  try
  {
    const data = await ProducedItemType.destroy({ where: { id: req.params.id }});
    if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
    res.status(200).json(data);
  }
  catch (error) { res.status(500).json(error); }
});

module.exports = router;