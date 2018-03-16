const express = require('express');
const router = express.Router();
/*****
*  TODO IMPLEMENT THE BUSINESS REQUIREMENTS BELOW 
*****/
// GET /businesses/businessId  ===>  Get a business 
// GET /businesses  ===>  Get all businesses
// GET /businesses/<businessid>/reviews  ===>  Get all reviews for a business
// GET /businesses?location=<location>  ===>  Get all businesses with the specified location
// GET /businesses?category=<category>  ===>  Get all businesses with the specified category
// POST /auth/signup   ===>   Register a user
// POST /auth/login  ===>  Login a user
// POST /businesses/   ===>  Register a business
// POST /businesses/<businessid>/reviews  ===>  Add a review for a business
// PUT /businesses/<businessId>  ===>  Update business profile
// DELETE /businesses/<businessId>  ===>  Remove a business


router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Handle Get Requests to /Products'
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message : 'Handle Post Requests to /Products'
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special'){
        res.status(200).json({
            message : 'you discovered the special ID',
            id : id
        });
    } else {
        res.status(200).json({
            message : 'You Passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message : 'Updated Product!!'
    });
});

router.put('/:productId', (req, res, next) => {
    res.status(200).json({
        message : 'Put Product!!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message : 'Deleted Product!!'
    });
});

module.exports = router;