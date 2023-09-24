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

const registerTrip = async (req, res) => {
    let depatureDate = req.body.depatureDate;
    let arrivalDate = req.body.arrivalDate;          
    let reverseDepDate = depatureDate.split("-").reverse().join("-");
    let reverseArrDate = arrivalDate.split("-").reverse().join("-");
    let convertedDepD = new Date(reverseDepDate);
    console.log(convertedDepD);
    let convertedArrD = new Date(reverseArrDate);
    console.log(convertedArrD);

    try {

        const { userId, cityFrom, cityTo, depatureDate, arrivalDate, availableSpace, otherComments } = req.body;

        if (!(userId, cityFrom && cityTo && convertedDepD && convertedArrD && availableSpace && otherComments)) {
            res.status(400).json({ result: "All input is required"});
            return; 
        }

        const tripMetadata = await Models.Trip.create({
            userId,
            cityFrom,
            cityTo,
            depatureDate: convertedDepD, 
            arrivalDate: convertedArrD,
            availableSpace,
            otherComments
        });
        const trip = tripMetadata.get({plain: true}) 

        res.status(201).json({ result: "Trip successfully registered", data: trip });
    } catch (err) {
        console.log(err);
        res.status(500).json({ result: err.message })
    }
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
    registerTrip,
    updateTrip,
    deleteTrip
}