const Item = require("../models/items");
const express = require("express");
const router = express.Router(); 
const uploads = require('../management/multer');

router.get('/', async (req, res) => {
    const items = await Item.find();

    if(!items) {
        res.status(400).send("No items found!");
    } else {
        res.status(200).send(items);
    }
});

router.post('/', uploads.single('image'), async (req, res) => {

    const category = await Category.findById(req.body.category);

    if(!category) {
        return res.status(400).send("Unknown category Id");
    }

    const file = req.file;

    if(!file) {
        return res.status(400).send("Image required!");
    }

    const fileName = req.file.filename;
    const path = `${req.protocol}://${req.get('host')}/public/images/`;

    let item = new Item({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: `${path}${fileName}`,
        category: req.body.category
    })

    await item.save()
    .then(() => {
        res.status(201).send("Item created successfully!")
    })
    .catch((err) => {
        res.status(500).json({
            error: err,
            message: "Impossible to create product!"
        })
    })
});

module.exports = router;