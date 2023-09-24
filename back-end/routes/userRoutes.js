const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");
const { verifyToken } = require("../middleware/auth");
const { uploadFile } = require("../middleware/uploads");

router.get('/', verifyToken, (req, res) => {
    Controllers.userController.getUsers(res);
})

router.post('/login', (req, res) => {
    Controllers.userController.loginUser(req, res)
})

router.post('/create', (req, res) => {
    Controllers.userController.createUser(req.body, res)
})

router.post('/register', (req, res) => {
    Controllers.userController.registerUser(req, res)
})

router.get('/:id', verifyToken, (req, res) => {
    const userId = req.params.id;
    Controllers.userController.getUserById(userId, res);
});

router.put('/:id', (req, res) => {
    Controllers.userController.updateUser(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.userController.deleteUser(req, res)
})

router.post('/sendpw', (req, res) => { 
    Controllers.userController.sendPassword(req, res)
})

router.post('/:userId/image/', uploadFile, (req, res) => { 
    Controllers.userController.addProfileImage(req, res)
})

module.exports = router;