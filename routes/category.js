const express = require('express')
const router = express.Router()

const Category = require('../models/category')

//POST: CREATE A NEW Category
router.post('/', async (req, res) => {
    const category = new Category({
        userId: req.body.userId,
        title: req.body.title,
        description: req.body.description,
    })
    category.save().then(async (category) => {
        res.json(category)
    }).catch(error => {
        res.status(500).json({
            message: "Category was not stored in the database" + error
        })
    })
})

//GET: GET ALL JOURNAL Category
router.get('/', async (req, res) => {
    const categories = await Category.find()
        .then((categories) => res.json(categories))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET Category BY ID
router.get('/:categoryId', async (req, res) => {
    const category = await Category.findById(req.params.categoryId)
    if (!category) res.status(404).send({
        message: "Category not found"
    })
    else res.json(category)
})

//UPDATE Category BASED ON ID
router.put('/:categoryId', async (req, res) => {
    const updatedCategory = await Category.findByIdAndUpdate(
        req.params.categoryId, {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
    },
        { new: true }
    )

    if (!updatedCategory) res.status(404).send({
        message: "Category not found"
    })
    else res.json(updatedCategory)
})

//DELETE Category
router.delete('/:categoryId', async (req, res) => {
    const entry = await Category.findByIdAndRemove(req.params.categoryId)
    if (!entry) res.status(404).send({
        message: "Entry not found"
    })
    else res.json(entry)
})



module.exports = router;