"use strict";
const Models = require("../models");

const getTrips = (res) => {
    Models.Trip.findAll({}).then(function (data) {
        res.status(200).json({ result: 'Trip data fetched successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

const createTrip = (data, res) => {
    Models.Trip.create(data).then(function (data) {
        res.status(200).json({ result: 'Trip created successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

const updateTrip = (req, res) => {
    Models.Trip.update(req.body, { where: { id: req.params.id }
    }).then(function (data) {
        res.status(200).json({ result: 'Trip updated successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

const deleteTrip = (req, res) => {
    Models.Trip.destroy({ where: { id: req.params.id }
    }).then(function (data) {
        res.status(200).json({ result: 'Trip deleted successfully', data: data })
    }).catch(err => {
        res.status(500).json({ result: err.message })
    })
}

module.exports = { 
    getTrips,
    createTrip,
    updateTrip,
    deleteTrip
}