const router = require('express').Router();
const res = require('express/lib/response');
const { Tag, Product, ProductTag } = require('../../models');

// /api/tags

// Get all tags + associated products
router.get('/', async (req, res) => {
	try {
		const tagData = await Tag.findAll({
			include: { model: Product },
		});
		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Get single tag by id + associated products
router.get('/:id', async (req, res) => {
	try {
		const tagData = await Tag.findByPk(req.params.id, {
			include: { model: Product },
		});

		if (!tagData) {
			res.status(404).json({ message: 'No tag found with that ID' });
			return;
		}

		res.status(200).json(tagData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Create new tag
router.post('/', async (req, res) => {
	try {
		const newTag = await Tag.create(req.body);
		res.status(200).json(newTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Update tag's name by id
router.put('/:id', async (req, res) => {
	try {
		let updatedTag = await Tag.update(
			{ tag_name: req.body.tag_name },
			{
				where: {
					id: req.params.id,
				},
			}
		);

		if (!updatedTag) {
			res.status(404).json({ message: 'No tag found with that ID' });
			return;
		}

		res.status(200).json(updatedTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

// Delete tag by id
router.delete('/:id', async (req, res) => {
	try {
		let deletedTag = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!deletedTag) {
			res.status(404).json({ message: 'No tag found with that ID' });
			return;
		}

		res.status(200).json(deletedTag);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
