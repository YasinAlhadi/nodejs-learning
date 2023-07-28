const { Router } = require("express");
const passport = require("passport");
const Users = require("../database/schemas/User");
const { hashPassword, comparePass } = require("../utils/helpers");

const router = Router();

// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
//     if(!email || !password) return res.sendStatus(400);
//     const userDB = await Users.findOne({ email });
//     if(!userDB) return res.sendStatus(401);
//     const isValid = comparePass(password, userDB.password);
//     if(isValid) {
//         console.log("Successful authenticated");
//         req.session.user = userDB;
//         res.sendStatus(200);
//     } else {
//         console.log("faild to authenticate");
//         res.sendStatus(401);
//     }
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
    console.log("Login");
    res.sendStatus(200);
})

router.post('/register', async (req, res) => {
    const { email } = req.body;
    const userDb = await Users.findOne({email});
    if (userDb) {
        res.status(400).send({msg: 'Already registered'});
    } else {
        const password = hashPassword(req.body.password);
        console.log(password);
        const newUser = await Users.create({username, password, email});
        res.sendStatus(201);
    }
});

router.get('/discord', passport.authenticate('discord'), (req, res) =>{
    res.send(200);
});

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
    res.send(200);
});

module.exports = router;