const router = require('express').Router();
const { Merchant, Item, ItemType } = require('../../models');
const notFoundResponse = `No merchant was found with this id.`;

router.get('/', async (req, res) => 
{
	try
	{
		const data = await Item.findAll({ include: [{ model: Merchant }] });
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.get('/playerFoodItems/:id', async (req, res) => 
{
	try
	{
		const data = await Merchant.findByPk(req.params.id, { include: [{ model: Item }] });
		const edibleItems = await RemoveNonEdibleItems(data.items);
		const edibleItemsSorted = await SortItemsByLowestPriceFirst(edibleItems);
		res.status(200).json(edibleItemsSorted);
	}
  	catch (error) { res.status(500).json(error); }
});

router.get('/:id', async (req, res) =>
{
	try
	{
		const data = await Item.findByPk(req.params.id, { include: [{ model: Merchant }] });

		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		else res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.post('/', async (req, res) => 
{
	try
	{
		const data = await Item.create(req.body);
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.put('/:id', async (req, res) => 
{
	try
	{
		const data = await Item.update(req.body, { where: { id: req.params.id }});
		if (data[0] === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

router.delete('/:id', async (req, res) => 
{
	try
	{
		const data = await Item.destroy({ where: { id: req.params.id }});
		if (data === null) { res.status(404).json({message: notFoundResponse}); return; }
		res.status(200).json(data);
	}
	catch (error) { res.status(500).json(error); }
});

async function RemoveNonEdibleItems(data)
{
	let edibleItems = [];
	for (let i = 0; i < data.length; i++) 
	{
		const itemType = await ItemType.findByPk(data[i].itemTypeId);
		if (itemType.edible) 
		{
			data[i].basePrice = itemType.basePrice;
			edibleItems.push(data[i]);
		}
	}
	return edibleItems;
}

async function SortItemsByLowestPriceFirst(data)
{
	sortedData = data;
	for (let i = 0; i < sortedData.length; i++) 
	{
		for (let j = 0; j < sortedData.length - i - 1; j++) 
		{
			if (sortedData[j + 1].basePrice < sortedData[j].basePrice)
			{
				[sortedData[j + 1], sortedData[j]] = [sortedData[j], sortedData[j + 1]]
			}
		}
	}
	return sortedData;
}

module.exports = router;