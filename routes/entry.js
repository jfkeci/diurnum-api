const express = require('express')
const router = express.Router()

const Entry = require('../models/entry')

//POST: CREATE A NEW USER
router.post('/', async (req, res) => {
    const entry = new Entry({
        userId: req.body.firstName,
        title: req.body.lastName,
        content: req.body.userName,
        templateId: req.body.email,
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
    const users = await User.find()
        .then((users) => res.json(users))
        .catch((error) => {
            res.status(500).send({
                message: `Something went wrong getting the data, error: ${error}`
            })
        })
})

//GET: GET USER BY ID
router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId)
    if (!user) res.status(404).send({
        message: "User not found"
    })
    else res.json(user)
})

//UPDATE USER BASED ON ID
router.put('/:userId', async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    },
        { new: true }
    )

    if (!updatedUser) res.status(404).send({
        message: "User not found"
    })
    else res.json(updatedUser)
})

//DELETE USER
router.delete('/:userId', async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.userId)
    if (!user) res.status(404).send({
        message: "User not found"
    })
    else res.json(user)
})



module.exports = router;