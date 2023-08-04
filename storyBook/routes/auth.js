const express = require('express')
const passport = require('passport')
const router = express.Router();


// auth router
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

//dashboard
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
(req, res) => {
    res.render('dashboard')
})

//logout
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) console.log(err)
        res.redirect('/')
    })
})

module.exports = router