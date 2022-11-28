const { connectDB } = require("../logs-project/connect")
const products = require("./model/product")
const jsonProducts = require('./model/products.json')
require('dotenv').config()



console.log(process.env.mongo2_uri)

const start = async () => {
    try{
        await connectDB(process.env.mongo2_uri)
        await products.deleteMany()
        await products.create(jsonProducts)
        console.log('sucess!!!')
        process.exit(0)

    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
start()