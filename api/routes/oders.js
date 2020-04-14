const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        Message: 'Orders were fetched'
    });
}); 

router.post('/', (req, res, next) => {
const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
}

    res.status(201).json({ //201 -> succesful creation
        Message: 'Orders was created',
        order: order
    });
}); 

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({ //201 -> succesful creation
        Message: 'Orders details (with id)',
        orderId: req.params.orderId
    });
}); 

router.delete('/:orderId', (req, res, next) => {
    res.status(201).json({ //201 -> succesful creation
        Message: 'Order deleted',
        orderId: req.params.orderId
    });
}); 

module.exports = router;