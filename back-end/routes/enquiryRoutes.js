const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.enquiryController.getEnquiries(res);
})

router.post('/create', (req, res) => {
    Controllers.enquiryController.createEnquiry(req.body, res)
})

router.post('/register', (req, res) => {
    Controllers.enquiryController.registerEnquiry(req, res)
})

router.get('/:id', (req, res) => {
    Controllers.enquiryController.getEnquiryById(req, res)
})

router.put('/:id', (req, res) => {
    Controllers.enquiryController.updateEnquiry(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.enquiryController.deleteEnquiry(req, res)
})

module.exports = router;