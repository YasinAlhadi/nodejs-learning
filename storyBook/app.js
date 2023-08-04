const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const { engine } = require('express-handlebars')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/db')

dotenv.config({path: './config/config.env'})

require('./config/passport')(passport)

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

const { dateForamt } = require('./helpers/hbs')

app.engine('.hbs', engine({ helpers: {dateForamt}, defaultlayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs')


//sessin
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: 'mongodb://0.0.0.0:27017/story_book'
    })
  }))

app.use(passport.initialize())
app.use(passport.session())

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server runnnig in port ${PORT}` ))