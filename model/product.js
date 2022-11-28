const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'product name must be provided']
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: [true, 'product price must be provided']

    },
    stock: Number,
    desc: String,
    featured: {
        type: Boolean,
        default: false
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum:{
            values: ['nike','addidas','puma','balenciaga'],
            message: '{VALUE} is not supported'

        } 
    }
})

module.exports = mongoose.model('products', productSchema)
