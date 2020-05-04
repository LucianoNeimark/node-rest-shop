const mongoose = require('mongoose');

const userSchema = mongoose.Schema({ //Un Schema es el diseño del objeto
    _id: mongoose.Schema.Types.ObjectId,
    email: 
    {
        type: String, 
        required: true, 
        unique: true, 
        match: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ // Formato de un email (regular expression)
    },
    password: {type: String, required: true}
})

module.exports = mongoose.model('User', userSchema); //El model es el constructor del objeto