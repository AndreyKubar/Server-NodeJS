const express = require("express")
require('dotenv').config()
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandling')

const PORT  = process.env.PORT || 3000

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`);
        })
    } catch (e) {
        
    }
}

start()