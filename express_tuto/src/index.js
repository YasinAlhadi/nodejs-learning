const express = require("express");
const mongoose = require("mongoose");
const cookirParse = require("cookie-parser");
const expressSession = require("express-session");
const mangoStroe = require("connect-mongo");
const passport = require("passport");
// require("./strategies/local");
require("./strategies/discord");

//Router
const connectDB = require("./database/dbconn");
const storeRouter = require("./routes/store");
const brachesRouter = require("./routes/branches");
const authRouter = require("./routes/auth");


connectDB();
const app = express();

// mongoose
// .connect("mongodb://0.0.0.0:27017/express_tut")
// .then(() => console.log('connected to db'))
// .catch((err) => console.log(err));

app.use(express.json());
app.use(cookirParse());
app.use(
    expressSession({
        secret: "kdkdirslkddkdjemkjkjujkjk",
        resave: false,
        saveUninitialized: false,
        store: mangoStroe.create({
            mongoUrl: 'mongodb://0.0.0.0:27017/express_tut',
        })
    })
);

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});



app.use(passport.initialize());
app.use(passport.session());


app.use("/api/v1/store", storeRouter);
app.use("/api/v1/braches", brachesRouter);
app.use("/api/v1/auth", authRouter);

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    app.listen(3000, () => console.log("Server running on port 3000"));
});
