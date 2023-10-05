require("dotenv").config();

const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');


const dotenv = require("dotenv");
const environment = process.env.NODE_ENV || "local";
console.log(environment);
dotenv.config({ path: `./.env.${environment}` });
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
app.use("/images", express.static("public/images")); // required for image mappings

// only load the distribution/production version of frontend if we aren't running our local/dev server
if (environment != 'local') {

  app.use(express.static(path.join(__dirname, './front-end/dist')))

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "./front-end/dist/index.html")
    );
  });
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log(" ~~ Welcome to Esther's Capstone Project! ~~");
});