const express = require('express');
const router = express.Router();

const Product = require('../models/product')
const mongoose = require('mongoose');

router.get('/', (req, res, next) =>{
    Product.find()
    .exec()
    .then(docs =>{
        console.log(docs);
        res.status(200).json(docs); // Mostrar en la respuesta el codigo 200 (todo ok) y docs que es la respuesta al GET
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}); 
router.post('/', (req, res, next) =>{
    const product = new Product({  //POST de un nuevo modelo a la database cumpliendo con el schema
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {  //Guardar en la db el producto creado por el POST
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /products',
            createdProduct: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        });
    }); 
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec()
    .then(doc=>{
        console.log(doc);
        if (doc)
        {
            res.status(200).json(doc);
        } else{
            res.status(404).json({message: 'No valid entry found for provided ID '})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
    
});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};

    for(const ops of req.body)
    {
        updateOps[ops.propName] = ops.value; 
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;

    Product.remove({_id: id})
    .exec()
    .then(result => 
        {
            res.status(200).json(result);
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;