const express = require('express');
const businesses = require('../../mocks/businesses.js');

const router = express.Router();

function isValidObject(a, b){
    var aKeys = Object.keys(a).sort();
    var bKeys = Object.keys(b).sort();
    return JSON.stringify(aKeys) === JSON.stringify(bKeys);
} 

// GET /businesses?location=<location>, GET /businesses?category=<category>, localhost:4000/businsses  {implement logic below}
router.get('/', (req, res, next) => {
    
    let location = req.query.location;
    let category = req.query.category;
    // GET /businesses?location=<location>  ===>  Get all businesses with the specified location
    if(location){
        let sameBusinessLocations = [];
        for(index in businesses){
            if(businesses[index]['properties']['location'] == location){
                sameBusinessLocations.push(businesses[index]);
            }
        }
        if(sameBusinessLocations === undefined || sameBusinessLocations.length == 0) {
            return res.status(404).json({
                message : 'NOT FOUND',
            });
        }else{
            return res.status(200).json({
                message : 'GET /businesses?category=category',
                businesses : sameBusinessLocations
            });
        }
        return res.status(200).json({
            message : 'GET /businesses?locations=location',
            businesees: sameBusinessLocations
        });
    } 

    // GET /businesses?category=<category> ===> Get all businesses with the specified category
    if(category){
        let sameBusinessCategories = [];
        for(index in businesses){
            if(businesses[index]['properties']['category'] == category){
                sameBusinessCategories.push(businesses[index]);
            }
        }
        if(sameBusinessCategories === undefined || sameBusinessCategories.length == 0) {
            return res.status(404).json({
                message : 'NOT FOUND',
            });
        }else{
            return res.status(200).json({
                message : 'GET /businesses?category=category',
                businesses : sameBusinessCategories
            });
        }
    }

    // localhost:4000/businesses  ===>  Get all businesses
    return res.status(200).json({
        message : 'GET /businesses',
        businesses: businesses
    });
});

// GET /businesses/businessId  ===>  Get a business  {implement logic below}
router.get('/:businessId', (req, res, next) => {
    let id = parseInt(req.params.businessId, 10);
    for(index in businesses){
        if(businesses[index]['businessid'] == id){
            return res.status(200).json({
                message : 'Found Business',
                business: businesses[index],
            });
        }
    }
    return res.status(404).json({
            message : 'NOT FOUND',
    });
});

// Get /businesses/<businessid>/reviews  ===>  Get all reviews for a business  {implement logic below}
router.get('/:businessId/reviews', (req, res, next) => {
    for(index in businesses) {
        let value = parseInt(req.params.businessId, 10);
        if(businesses[index]['businessid'] == value){
            return res.status(200).json({
                reviews: businesses[index]['properties']['reviews'],
            });
        }
    }
    res.status(404).json({
        message : 'Business Not Found',
    });
});

// POST /businesses/   ===>  Register a business {implement logic below}
router.post('/', (req, res, next) => {
    obj = {   //post object to test with
        properties: {
            name: '',
            category: '',
            location: '',
            keywords: ['', '', '', ''],
            reviews: {},
        }
    }
    if(isValidObject(obj, req.body)){
        let currentIndex = 0;
        for(index in businesses) {
            let value = parseInt(businesses[index]['businessid'], 10);
            if(value > currentIndex){
                currentIndex = value;
            }
        }
        currentIndex = currentIndex + 1;
        const business = {
            businessid : currentIndex,
            properties: {
                name: req.body.properties.name,
                category: req.body.properties.category,
                location: req.body.properties.location,
                keywords: req.body.properties.keywords,
                reviews: req.body.properties.reviews,
            }
        };
        businesses.push(business);
        return res.status(201).json({
            message : 'POST /businesses/ Business was created',
            business: business,
            businesees: businesses,
        });
    } else {
        return res.status(400).json({
            message : 'BAD REQUEST',
        });
    }
});


// POST /businesses/<businessid>/reviews  ===>  Add a review for a business  {implement logic below}
router.post('/:businessId/reviews', (req, res, next) => {
    const id = parseInt(req.params.businessId, 10);
    let found = false;
    request_reviewObject = { /// post review object to test with
        review : "some reveiew",
    }
    for(index in businesses){ 
        if(businesses[index]['businessid'] == id){
           review = req.body.review;
           if(isValidObject(request_reviewObject, req.body)){
                businesses[index]['properties']['reviews'].push(review);
                return  res.status(201).json({
                    message : 'Review Updated',
                    updatedBusiness: businesses[index],
                });
           }else{
                return res.status(400).json({
                    message : 'BAD REQUEST',
                });
           }           
        }
    }
    if(found == false) {
        return res.status(404).json({
            message : 'NOT FOUND',
        });
    }
});

// PUT /businesses/businessId  ==>  Update business profile {implement logic below}
router.put('/:businessId', (req, res, next) => {
    obj = {   //put object to test with
        properties: {
            name: '',
            category: '',
            location: '',
            keywords: ['', '', '', ''],
            reviews: {},
        }
    }
    if(isValidObject(obj, req.body)){
        let id = parseInt(req.params.businessId, 10);
        let found = false;
        for(index in businesses){
            if(businesses[index]['businessid'] === id){
                let tempBusiness = req.body;
                properties = tempBusiness['properties'];
                businesses[index]['properties'] = properties;
                return res.status(200).json({
                    message : 'Found Business',
                    business: tempBusiness,
                });
            }
        }
        if(found == false){
            return res.status(401).json({
                message : 'Business Not Found',
            });
        }
    }else{
        return res.status(400).json({
            message : 'BAD REQUEST',
        });
    }
});

// DELETE /businesses/<businessId>  ===>  Remove a business {implement logic below}
router.delete('/:businessId', (req, res, next) => {
    const id = parseInt(req.params.businessId, 10);
    let tempBusiness;
    for(index in businesses) {
        if(businesses[index]['businessid'] == id){
            tempBusiness = businesses;
            businesses.splice(index, 1);
            res.status(200).json({
                message : 'DELETED BUSINESS /businesses/<businessId>',
                id : id,
                business: tempBusiness,
            });
        }
    }
    res.status(401).json({
            message : 'Resource not found',
            id : id
    });
});

module.exports = router;