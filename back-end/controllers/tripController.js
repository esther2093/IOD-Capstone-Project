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
    const currentDate = new Date();
    let departureDate = req.body.departureDate;
    let arrivalDate = req.body.arrivalDate;
  
    let reverseDepDate = departureDate.split("-").reverse().join("-");
    let reverseArrDate = arrivalDate.split("-").reverse().join("-");
    let convertedDepD = new Date(reverseDepDate);
    let convertedArrD = new Date(reverseArrDate);

    let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };
  
    try {
      const {
        userId,
        suburbFrom,
        cityFrom,
        stateFrom,
        suburbTo,
        cityTo,
        stateTo,
        departureDate,
        arrivalDate,
        availableSpace,
        comments,
      } = req.body;
  
      if (
        !(userId, cityFrom && stateFrom && cityTo && stateTo && departureDate && arrivalDate && availableSpace)) {
        res.status(400).json({ result: "Please fill in all the *required fields" });
      } else if (
        (suburbFrom && !/^[A-Za-z\s]+$/.test(suburbFrom)) ||
        (suburbTo && !/^[A-Za-z\s]+$/.test(suburbTo))) {
        res.status(400).json({ result: "Not a valid suburb " });
      } else if (!/^[A-Za-z\s]+$/.test(cityFrom) || !/^[A-Za-z\s]+$/.test(cityTo)) {
        res.status(400).json({ result: "Not a valid city " });
      } else if (!/^[A-Za-z\s]+$/.test(stateFrom) || !/^[A-Za-z\s]+$/.test(stateTo)) {
        res.status(400).json({ result: "Not a valid state " });
      } else if (!/^\d{2}-\d{2}-\d{4}$/.test(departureDate) || !/^\d{2}-\d{2}-\d{4}$/.test(arrivalDate)) {
        res.status(400).json({ result: "Date must be in DD-MM-YYYY format" });
      } else if (convertedDepD <= currentDate) {
        res.status(400).json({ result: "Departure date is in the past, I would also like to go to the past" });
      } else if (convertedArrD <= currentDate) {
        res.status(400).json({ result: "Arrival date is in the past, unfortunately, this is not possible unless you time travel" });
      } else {
        const tripMetadata = await Models.Trip.create({
          userId,
          suburbFrom: capitalizeFirstLetter(suburbFrom),
          cityFrom: capitalizeFirstLetter(cityFrom),
          stateFrom: capitalizeFirstLetter(stateFrom),
          suburbTo:capitalizeFirstLetter(suburbTo),
          cityTo: capitalizeFirstLetter(cityTo),
          stateTo: capitalizeFirstLetter(stateTo),
          departureDate: convertedDepD,
          arrivalDate: convertedArrD,
          availableSpace,
          comments: capitalizeFirstLetter(comments),
        });
        const trip = tripMetadata.get({ plain: true });
        res.status(201).json({ result: "Your trip has successfully been uploaded!", data: trip });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ result: err.message });
    }
  };
  

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