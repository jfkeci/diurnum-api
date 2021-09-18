const express = require('express')
const router = express.Router()

const Entry = require('../models/entry')

//POST: CREATE A NEW Entry
router.post('/', async (req, res) => {
    const entry = new Entry({
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        templateId: req.body.templateId,
    })
    entry.save().then(async (entry) => {
        res.json(entry)
    }).catch(error => {
        res.status(500).json({
            message: "Entry was not stored in the database" + error
        })
    })
})

//GET: GET ALL JOURNAL ENTRYS
router.get('/', async (req, res) => {
    const entrys = await Entry.find()
        .then((entrys) => res.json(entrys))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET ENTRY BY ID
router.get('/:entryId', async (req, res) => {
    const entry = await Entry.findById(req.params.entryId)
    if (!entry) res.status(404).send({
        message: "Entry not found"
    })
    else res.json(entry)
})

//UPDATE Entry BASED ON ID
router.put('/:entryId', async (req, res) => {
    const updatedEntry = await Entry.findByIdAndUpdate(
        req.params.entryId, {
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        templateId: req.body.templateId,
    },
        { new: true }
    )

    if (!updatedEntry) res.status(404).send({
        message: "Entry not found"
    })
    else res.json(updatedEntry)
})

//UPDATE Entry privacy BASED ON ID
router.put('/:entryId', async (req, res) => {
    const updatedEntry = await Entry.findByIdAndUpdate(
        req.params.entryId, {
        private: !updatedEntry.private
    },
        { new: true }
    )

    if (!updatedEntry) res.status(404).send({
        message: "Entry not found"
    })
    else res.json(updatedEntry)
})

//DELETE Entry
router.delete('/:entryId', async (req, res) => {
    const entry = await Entry.findByIdAndRemove(req.params.entryId)
    if (!entry) res.status(404).send({
        message: "Entry not found"
    })
    else res.json(entry)
})



module.exports = router;