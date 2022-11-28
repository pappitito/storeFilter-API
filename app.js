const { json } = require('express')
const express = require('express')
const { connectDB } = require('../logs-project/connect')
const { errorHandler } = require('../logs-project/middleware/error-handler')
const { notFound } = require('../logs-project/middleware/not-found')
const {router} = require('./route')
require('dotenv').config()
require('express-async-errors')
const app = express()
const port = process.env.PORT || 3000

async function start(){
    try{
        await connectDB(process.env.mongo2_uri)
        console.log('connected to the DB')
        app.listen(port, console.log(`server is listening on port ${port} `))
    }catch(error){
        console.log(error)
    }
}

start()


app.use(express.json())
app.use('/api/products', router)
app.use(errorHandler)


app.get('/', (req,res)=>{
    res.status(200).send('<h1>Homepage</h1><a href="/api/products" >Products</a>')
})








