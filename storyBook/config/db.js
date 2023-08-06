const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log(`connected to DB: ${conn.connection.host}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

module.exports = connectDB;