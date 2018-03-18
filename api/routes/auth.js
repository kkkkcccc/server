const express = require('express');
const users = require('../../mocks/users.js');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function isValidObject(a, b){
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
} 

function mailExists(email, users){
    for(index in users){
        if(users[index]['email'] == email){
            return true;
        }
    }
    return false;
}

function isValidEMail(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// POST /auth/signup   ===>   Register a user
router.post('/signup', (req, res, next) => {
    
    const user = { //user object to test with
        email: '',
        password: '',
    }
    if(isValidObject(req.body, user)){
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if(err){
                return res.status(500).json({
                    error : err,
                });
            }else{
                let currentIndex = 0;
                for(index in users) {
                    let value = parseInt(users[index]['userid'], 10);
                    if(value > currentIndex){
                        currentIndex = value;
                    }
                }
                if(isValidEMail(req.body.email) == false){ ///test mail in signin process
                    return res.status(400).json({
                        message : 'Invalid Email Address in Request'
                    });
                }
                currentIndex = currentIndex + 1;
                if(mailExists(req.body.email, users)){
                    return res.status(400).json({
                        message : 'MailExists'
                    });
                }
                const user = {
                    userid: currentIndex,
                    email: req.body.email,
                    password: hash,
                }
                console.log(user)
                users.push(user);
                res.status(201).json({
                    message : 'Auth Successful'
                });
            }
        })
    }else{
        return res.status(400).json({
            message : 'Bad Request'
        });
    }
});

// POST /auth/login  ===>  Login a user
router.post('/login', (req, res, next) => {
    let email = req.body.email;
    let pass = req.body.password;
    for(index in users) {
        if(users[index]['email'] == email){
            console.log(users[index]['email'], email, users[index]['password'], req.body.password)
            bcrypt.compare(req.body.password, users[index]['password'], (err, result ) => {
                if(err){
                    return res.status(401).json({
                        message : 'Auth Failed1'
                    });
                }
                console.log(result, req.body.password, users[index]['password'], " rev")
                if(result){
                    return res.status(200).json({
                        message : 'Auth Successful'
                    });
                }
                return res.status(401).json({
                    message : 'Auth Failed2'
                });
            })
        }
    }
    return res.status(401).json({
        message : 'Auth Failed2'
    });
});

module.exports = router;


