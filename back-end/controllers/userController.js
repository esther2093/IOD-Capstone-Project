"use strict";
const Models = require("../models");
const bcrypt = require("bcryptjs"); // first run 'npm install bcryptjs'
const sendGridMail = require("@sendgrid/mail"); // first run 'npm install @sendgrid/mail'
const { createToken } = require("../middleware/auth");
const EmailHelper = require("../libraries/EmailHelper");

const getUsers = (res) => {
  Models.User.findAll({})
    .then(function (data) {
      res.status(200).json({ result: "User data fetched successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

// creates a JWT token and encrypts the password
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
const loginUser = async (req, res) => {
  try {
    // Get user input from request body
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).json({ result: "All input is required" });
      return; // when sending responses and finishing early, manually return or end the function to stop further processing
    }
    // Validate if user exists in our database
    const user = await Models.User.findOne({
      raw: true,
      where: { email: email },
    });

    // if they do exist, make sure their password matches - need to check encrypted version of password
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token for use based on their id and email
      const token = createToken(user.id, email);
      // save user token
      user.token = token;

      console.log(user);

      // send back logged in user details including token
      res.status(200).json({ result: "User successfully logged in", data: user });
    } else res.status(400).json({ result: "Invalid user credentials" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: err.message });
  }
};

const registerUser = async (req, res) => {
  let dateOfBirth = req.body.dateOfBirth;
  console.log(dateOfBirth);
  let reverseDate = dateOfBirth.split("-").reverse().join("-");
  console.log(reverseDate);
  let datedDOB = new Date(reverseDate);
  console.log(datedDOB);
  const age = new Date().getFullYear() - datedDOB.getFullYear() - (new Date().getMonth() < datedDOB.getMonth() || 
  (new Date().getMonth() === datedDOB.getMonth() && new Date().getDate() < datedDOB.getDate()) ? 1 : 0);


  try {
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth } = req.body;

    if (!(email && password && firstName && lastName && dateOfBirth && phoneNumber)) {
      res.status(400).json({ result: "All input is required" });
    } else if (password.length < 6) {
      res.status(400).json({ result: "Password must be at least 6 characters long" });
    } else if (password === email) {
      res.status(400).json({ result: "Password cannot be the same as your email address" });
    // } else if (!/^(?=.*[A-Z])(?=.*\d).+/.test(password)) {
    //   res.status(400).json({ result: "Password must include a capital letter and a number." });
    } else if (!/^[A-Za-z]+$/i.test(firstName)) {
      res.status(400).json({ result: "Invalid first name" });
    } else if (!/^[A-Za-z]+$/i.test(lastName)) {
      res.status(400).json({ result: "Invalid last name" });
    } else if (!/^\d{2}-\d{2}-\d{4}$/.test(dateOfBirth)) {
      res.status(400).json({ result: "Date of Birth must be in the format DD-MM-YYYY" });
    } else if (age < 18) {
      res.status(400).json({ result: "You must be over 18 years old to sign up" });
    } else if (phoneNumber.length > 10) {
      res.status(400).json({ result: "You must input a valid phone number" });
    } else if (!/^[0-9]+$/.test(phoneNumber)) {
      res.status(400).json({ result: "Phone number must contain numbers only" });
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      res.status(400).json({ result: "Invalid email address" });
    } else {
      const oldUser = await Models.User.findOne({ where: { email } });
      if (oldUser) {
        res.status(409).json({ result: "This email address already exists. Please login!" });
        return;
      }

      // Encrypt user password
      let encryptedPassword = await bcrypt.hash(password, 10);

      let capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

      // Create user in our database
      const userMetadata = await Models.User.create({
        firstName: capitalizeFirstLetter(firstName),
        lastName: capitalizeFirstLetter(lastName),
        email: email.toLowerCase(),
        password: encryptedPassword,
        dateOfBirth: datedDOB,
        phoneNumber,
      });
      const user = userMetadata.get({ plain: true });

      // Create token
      const token = createToken(user.id, email);
      user.token = token;

      res.status(201).json({ result: "User successfully registered", data: user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: err.message });
  }
};

const getUserById = (userId, res) => {
  Models.User.findByPk(userId)
    .then(function (user) {
      if (!user) {
        res.status(404).json({ result: "User not found" });
      } else {
        res.status(200).json({ result: "User data fetched successfully", data: user });
      }
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const createUser = (data, res) => {
  Models.User.create(data)
    .then(function (data) {
      res.status(200).json({ result: "User created successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const updateUser = (req, res) => {
  Models.User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(function (data) {
      res.status(200).json({ result: "User updated successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const deleteUser = (req, res) => {
  Models.User.destroy({
    where: { id: req.params.id },
  })
    .then(function (data) {
      res.status(200).json({ result: "User deleted successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

// upload an image from a front-end form onto the back end server: https://www.positronx.io/react-file-upload-tutorial-with-node-express-and-multer/
const addProfileImage = (req, res) => {
  console.log(req.file); // saved filename is in req.file.filename
  const userUpdates = {
    profilePicture: "/images/" + req.file.filename,
  };
  console.log(userUpdates);

  // save path to uploaded file in DB for this user
  Models.User.update(userUpdates, { where: { id: req.params.userId } })
    .then(
      (response) =>
        res.status(200).json({
          result: "Image uploaded to profile successfully",
          data: userUpdates,
        }) // send updated info back in response
    )
    .catch((err) => res.status(500).json({ result: err.message }));
};

// first create a free SendGrid account at https://signup.sendgrid.com/
// see https://blog.logrocket.com/how-to-send-emails-with-node-js-using-sendgrid/ for more tips
const sendPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // reset password to last 10 chars of email address, then send an email notifying them
    let newPassword = await bcrypt.hash(email.substring(email.length - 10), 10);

    let [updatedUserCount, updatedUserRows] = await Models.User.update({ password: newPassword }, { where: { email: email } });

    if (updatedUserCount < 1) {
      res.status(404).json({
        result: "User with email " + email + " not found, register first",
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ result: "Password not reset: " + err.message });
    return;
  }

  // only send email if user with that email exists
  EmailHelper.sendPasswordReset(email)
    .then((response) => {
      //EmailHelper.sendHTMLEmail(email, 'Your password has been reset', 'Your password is now the last 10 characters of your email address').then(response => {
      //console.log(response);
      res.status(200).json({ result: "Reset email sent successfully, check your email" });
    })
    .catch((error) => {
      console.log(error.response.body.errors);
      res.status(500).json({ result: "Error sending email: " + error.message });
    });
};

module.exports = {
  getUsers,
  loginUser,
  registerUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addProfileImage,
  sendPassword,
};
