const asyncWrapper = require("../logs-project/async")
const products = require("./model/product")
require('express-async-errors')


const getAllProducts = async (req,res) =>{
    
    const allProducts = await products.find({})
    res.status(200).json({products: allProducts})

}

const getAllProductsFilter = async (req,res) =>{
    const {company, featured, name, sort, field, numericFilters} = req.query
    const queryObject = {}

    if(company){
        queryObject.company = { $regex: company, $options: 'i' } 
    }
    if(featured){
        queryObject.featured = featured === 'true'? true : false
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i' } 
    }
   
   
    if(sort){
        let sorted = sort.split(',').join(' ')
        console.log(sort)
        console.log(sorted)
        allProducts = allProducts.sort(sorted)
    }

    if(field){
        let fielded = field.split(',').join(' ')
        allProducts = allProducts.select(fielded)
    }
    if(numericFilters){
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`)
        const options = ['price']
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator] : Number(value)}
            }
        })
    }

    console.log(queryObject)
    let allProducts = products.find(queryObject)
   

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const skip = (page - 1) * limit
    console.log(page, limit, skip)

    if(req.query.page){
        allProducts = allProducts.skip(skip).limit(limit)
    }
   

    
    const produce = await allProducts
    res.status(200).json({products: produce})

}

const getProduct = async (req,res) => {
    const {id} = req.params
    const theProduct = await products.findOne({_id: id})
    if(!theProduct){
        return res.status(404).json({ message: `no log with id: ${id}`})
    }
    res.status(201).json(theProduct)
}


module.exports = {getAllProducts, getProduct, getAllProductsFilter}