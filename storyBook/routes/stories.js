const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest} = require('../middleware/authMiddleware')

const Story = require('../models/Story')

// add stories
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add')
})

//Proceed add form
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (error) {
        console.error(error)
        res.render('error/500')
    }
})


module.exports = router