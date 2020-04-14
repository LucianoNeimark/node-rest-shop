const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({ //Un Schema es el diseño del objeto
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' , required: true },
    quantity: { type: Number, required: true } 
})

module.exports = mongoose.model('Order', orderSchema); //El model es el constructor del objeto