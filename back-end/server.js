require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors')

const dbConnect = require("./dbConnect");

const dotenv = require("dotenv");
dotenv.config({ path: `./.env.${process.env.NODE_ENV || "local"}` });

app.use(express.json());
app.use(cors());

let userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)

app.use("/", express.static("public"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(" ~~ Welcome to Esther's Capstone Project! ~~");
});