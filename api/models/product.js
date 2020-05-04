const mongoose = require('mongoose');

const productSchema = mongoose.Schema({ //Un Schema es el diseño del objeto
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    productImage: {type: String, required: true}
})

module.exports = mongoose.model('Product', productSchema); //El model es el constructor del objeto