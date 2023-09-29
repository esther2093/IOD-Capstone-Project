'use strict'
const User = require('./user') 
const Trip = require('./trip') 
const Enquiry = require ('./enquiry');
const Message = require('./message');

async function init() {
    await User.sync(); 
    await Trip.sync(); 
    await Enquiry.sync(); 
    await Message.sync(); 
};
init();

module.exports = {
    User, 
    Trip,
    Enquiry,
    Message
};