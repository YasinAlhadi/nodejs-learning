const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT")
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOPtions");
const PORT = process.env.PORT || 3000;

// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// Middleware for cookie
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", require("./router/root"));
app.use("/login", require("./router/api/auth"));
app.use("/register", require("./router/api/register"));
app.use("/refresh", require("./router/refresh"));
app.use("/logout", require("./router/logout"));

app.use(verifyJWT);
app.use("/employees", require("./router/api/employees"));



app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
