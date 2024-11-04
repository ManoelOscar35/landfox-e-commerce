const Item = require("../models/items");
const express = require("express");
const router = express.Router(); 
const mongoose = require("mongoose");
const uploads = require('../management/multer');

router.get('/', async (req, res) => {
    const items = await Item.find().populate('category');

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
            message: "Creation failed!"
        })
    })
});

router.put('/:id', uploads.single('image'), async (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Id');
    }

    const category = await Category.findById(req.body.category);

    if(!category) {
        return res.status(400).send('Invalid Category Id');
    }

    const item = await Item.findById(req.params.id);

    if(!item) {
        return res.status(400).send('Invalid item Id');
    }

    const file = req.file;
    let image;

    if(file) {
        const fileName = file.filename;
        const path = `${req.protocol}://${req.get('host')}/public/images/`;
        image = `${path}${fileName}`;
    } else {
        image = item.image;
    }

    const modifieldItem = await Item.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: image,
            category: req.body.category
        },
        {
            new: true
        }
    );

    if(!modifieldItem) {
        return res.status(500).send('The item cannot be updated!');
    }

    res.send(modifieldItem);

});

module.exports = router;