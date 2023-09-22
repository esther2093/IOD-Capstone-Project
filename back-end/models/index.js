'use strict'
const User = require('./user') 
const Trip = require('./trip') 

async function init() {
    await User.sync(); 
    await Trip.sync(); 
};
init();

module.exports = {
    User, 
    Trip
};