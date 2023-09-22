const express = require("express");
const router = express.Router();
const Controllers = require("../controllers");

router.get('/', (req, res) => {
    Controllers.tripController.getTrips(res);
})

router.post('/create', (req, res) => {
    Controllers.tripController.createTrip(req.body, res)
})


router.put('/:id', (req, res) => {
    Controllers.tripController.updateTrip(req, res)
})

router.delete('/:id', (req, res) => {
    Controllers.tripController.deleteTrip(req, res)
})

module.exports = router;