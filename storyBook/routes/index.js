const express = require('express')
const router = express.Router();
const { ensureAuth, ensureGuest} = require('../middleware/authMiddleware')

const Story = require('../models/Story')

// login router
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

//dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const user = req.user
        const stories = await Story.find({ user: req.user.id }).lean()
        res.render('dashboard', {
            name: user.displayName,
            stories,
        })
    } catch (error) {
      console.error(error)  
      res.render('error/500')
    }
})

module.exports = router