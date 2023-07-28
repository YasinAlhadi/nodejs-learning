const passport = require("passport");
const Passport = require("passport");
const { Strategy } = require("passport-discord");
const discordUsers = require("../database/schemas/DiscordUsers");

passport.serializeUser((user, done) => {
    console.log("serializing user...");
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log("deserializing user...");
    console.log(id);
    try {
        const user = await discordUsers.findById(id);
        if(!user) throw new Error("user not found");
        console.log(user);
        done(null, user);
    } catch (error) {
        console.log(error)
        done(error, null);
    }
});

passport.use(new Strategy({
    clientID: '1133807669002653818',
    clientSecret: 'tJUHATrmbGDsV7GTs00WIm0QgZNZ8Ux7',
    callbackURL: 'http://localhost:3000/api/v1/auth/discord/redirect',
    scope: ['identify'],
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken);
    console.log(profile);
    try {
        const discordUser = await discordUsers.findOne({discordId: profile.id});
        if (discordUser){
            console.log(`found user ${discordUser}`);
            return done(null, discordUser);
        } else {
            const newUser = await discordUsers.create({
                discordId: profile.id,
                username: profile.username,
            });
            console.log(`create user ${newUser}`);
            return done(null, newUser);
        }
    } catch (error) {
        console.log(error);
        return done(null, null);
    }
})
);