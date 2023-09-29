const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.messageController.getEnquiries(res);
})

router.post('/create', (req, res) => {
    Controllers.messageController.createMessage(req.body, res)
})

router.post('/register', (req, res) => {
    Controllers.messageController.registerMessage(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.messageController.deleteMessage(req, res)
})

module.exports = router;