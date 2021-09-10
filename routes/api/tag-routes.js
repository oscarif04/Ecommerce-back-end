const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: [{ model: Product, as:"tag_product",
    
    }],
  }).then(resTagData => res.json(resTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product, as: "tag_product",
   }],
  }).then(resTagData => res.json(resTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  const tagData = await Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(resTagData => res.json(resTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try{
    Tag.update(req.body, {
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
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found.' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
