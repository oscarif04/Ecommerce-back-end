const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const catData = await Category.findAll({
    include: [{ model: Product,
    
    }],
  }).then(rescatData=> res.json(rescatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const catData = await Category.findByPk(req.params.id, {
    include: [{ model: Product,
   }],
  }).then(rescatData => res.json(rescatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new category
  const catData = await Category.create({
    category_name: req.body.category_name,
  })
  .then(rescatData => res.json(rescatData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try{
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
   .then(function(updateRows) {
     res.json(updateRows)
   })
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const tagData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Category not found.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
