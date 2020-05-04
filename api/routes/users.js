const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res, next) => {
        User.find({email: req.body.email}) //busqueda de usuarios en la db con el mismo mail
        .exec()
        .then(user => {
            if (user.length >= 1) { //si hay un usuario tiramos error
                return res.status(422).json({
                    message: 'Email taken'
                });
            } else { //si no hay un usuario ejecutamos el script de hashing
                bcrypt.hash(req.body.password, 1, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        })
                    } else {
                        console.log(hash);
                        const user = new User ({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        // password: req.body.password => MALA PRACTICA (Se guarda la pass sin encriptar)
                        password: hash // Este es el hash que devuelve bcrypt
                        });
                        user
                        .save() // Guardar el user en la db
                        .then(result => {
                            console.log(user);
                            res.status(201).json({
                                message: 'User Created!'
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err
                            })
                        });
                    } 
                })
            }
        })
        .catch();
       
    });

    router.post('/login', (req, res, next) => {
        User.find({email: req.body.emeail})
        .exec()
        .then(users => {
            if (users.length < 1){
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    })

    router.delete('/:userId', (req, res, next) => {
        User.remove({_id: req.params.userId})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
    })

module.exports = router;