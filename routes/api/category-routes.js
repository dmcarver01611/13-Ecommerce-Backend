const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// /api/categories

// Get all categories + associated products
router.get('/', async (req, res) => {
	try {
		const categoryData = await Category.findAll({
			include: { model: Product },
		});
		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get one category by id + associated products
router.get('/:id', async (req, res) => {
	try {
		const categoryData = await Category.findByPk(req.params.id, {
			include: { model: Product },
		});

		if (!categoryData) {
			res.status(404).json({ message: 'No category found with that ID' });
			return;
		}

		res.status(200).json(categoryData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create new category
router.post('/', async (req, res) => {
	try {
		const newCategory = await Category.create(req.body);
		res.status(200).json(newCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update category by id
router.put('/:id', async (req, res) => {
	try {
		let updatedCategory = await Category.update(
			{ category_name: req.body.category_name },
			{
				where: {
					id: req.params.id,
				},
			}
		);

		if (!updatedCategory) {
			res.status(404).json({ message: 'No category found with that ID' });
			return;
		}

		res.status(200).json(updatedCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete category by id
router.delete('/:id', async (req, res) => {
	try {
		let deletedCategory = await Category.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!deletedCategory) {
			res.status(404).json({ message: 'No category found with that ID' });
			return;
		}

		res.status(200).json(deletedCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
