const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

//confing file
dotenv.config({path: './config/config.env'})

//passport
require('./config/passport')(passport)

//connecting to database
connectDB();

//init express
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//override request method
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))


//serve static file
app.use(express.static(path.join(__dirname, 'public')))


//handlebars helper
const { dateForamt, truncate, stripTags, editIcon, select, } = require('./helpers/hbs')

//handlebars engin
app.engine('.hbs', engine({ helpers: {
  dateForamt,
  truncate,
  stripTags,
  editIcon,
  select,
}, defaultlayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs')


//strore sessin on db
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://0.0.0.0:27017/story_book'
    })
  }))

  //passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server runnnig in port ${PORT}` ))