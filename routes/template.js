const express = require('express')
const router = express.Router()

const Template = require('../models/template')

//POST: CREATE A NEW Template
router.post('/', async (req, res) => {
    const template = new Template({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
    })
    template.save().then(async (template) => {
        res.json(template)
    }).catch(error => {
        res.status(500).json({
            message: "Template was not stored in the database" + error
        })
    })
})

//GET: GET ALL JOURNAL Template
router.get('/', async (req, res) => {
    const templates = await Template.find()
        .then((templates) => res.json(templates))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET Template BY ID
router.get('/:templateId', async (req, res) => {
    const template = await Template.findById(req.params.templateId)
    if (!template) res.status(404).send({
        message: "Template not found"
    })
    else res.json(template)
})

//UPDATE Template BASED ON ID
router.put('/:templateId', async (req, res) => {
    const updatedTemplate = await Template.findByIdAndUpdate(
        req.params.templateId, {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        categoryId: req.body.categoryId,
    },
        { new: true }
    )

    if (!updatedTemplate) res.status(404).send({
        message: "Template not found"
    })
    else res.json(updatedTemplate)
})

//UPDATE Template privacy BASED ON ID
router.put('/:templateId', async (req, res) => {
    const updatedTemplate = await Template.findByIdAndUpdate(
        req.params.templateId, {
        private: !updatedTemplate.private
    },
        { new: true }
    )

    if (!updatedTemplate) res.status(404).send({
        message: "Template not found"
    })
    else res.json(updatedEntry)
})

//DELETE Template
router.delete('/:templateId', async (req, res) => {
    const entry = await Template.findByIdAndRemove(req.params.templateId)
    if (!entry) res.status(404).send({
        message: "Entry not found"
    })
    else res.json(entry)
})



module.exports = router;