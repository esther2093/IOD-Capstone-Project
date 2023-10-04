require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors')

const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "local"}` });
const dbConnect = require("./dbConnect");

app.use(express.json());
app.use(cors());

let userRoutes = require('./routes/userRoutes')
let tripRoutes = require('./routes/tripRoutes')
let enquiryRoutes = require('./routes/enquiryRoutes')
let messageRoutes = require('./routes/messageRoutes')

app.use('/api/users', userRoutes)
app.use('/api/trips', tripRoutes)
app.use('/api/enquiries', enquiryRoutes)
app.use('/api/messages', messageRoutes)

app.use("/", express.static("public"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(" ~~ Welcome to Esther's Capstone Project! ~~");
});