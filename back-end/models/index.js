'use strict'
const User = require('./user') 
const Trip = require('./trip') 
const Enquiry = require ('./enquiry')

async function init() {
    await User.sync(); 
    await Trip.sync(); 
    await Enquiry.sync(); 
};
init();

module.exports = {
    User, 
    Trip,
    Enquiry
};