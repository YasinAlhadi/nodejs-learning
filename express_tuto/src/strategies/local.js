const passport = require("passport");
const { Strategy } = require("passport-local");
const Users = require("../database/schemas/User");
const { comparePass } = require("../utils/helpers");

passport.serializeUser((user, done) => {
    console.log("serializing user...");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializing user...");
    console.log(id);
    try {
        const user = await Users.findById(id);
        if(!user) throw new Error("user not found");
        console.log(user);
        done(null, user);
    } catch (error) {
        console.log(error)
        done(error, null);
    }
})

passport.use(
    new Strategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            console.log(email);
            console.log(password);
            try {
                if (!email || !password) throw new Error("Bad request! Missing credential");
                const userDB = await Users.findOne({ email });
                if (!userDB) throw new Error("user not found");
                const isValid = comparePass(password, userDB.password);
                if(isValid) {
                    console.log("Successful authenticated");
                    done(null, userDB);
                } else {
                    console.log("faild to authenticate");
                    done(null, null);
                }
            } catch (error) {
                console.log(error)
                done(error, null);
            }
        }
    )
);