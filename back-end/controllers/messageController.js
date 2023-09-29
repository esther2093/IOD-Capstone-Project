"use strict";
const Models = require("../models");

const getMessages = (res) => {
  Models.Message.findAll({})
    .then(function (data) {
      res.status(200).json({ result: "Message data fetched successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const createMessage = (data, res) => {
  Models.Message.create(data)
    .then(function (data) {
      res.status(200).json({ result: "Message created successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

const registerMessage = async (req, res) => {
  try {
    const { senderId, recieverId, content } = req.body;

    if (!content) {
      res.status(400).json({ result: "Please fill in your message" });
      return;
    }

    const messageMetadata = await Models.Message.create({
      senderId,
      recieverId,
      message,
    });
    const message = messageMetadata.get({ plain: true });

    res.status(201).json({ result: "Your Message has been successfully sent!", data: message });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: err.message });
  }
};

const deleteMessage = (req, res) => {
  Models.Message.destroy({ where: { id: req.params.id } })
    .then(function (data) {
      res.status(200).json({ result: "Message deleted successfully", data: data });
    })
    .catch((err) => {
      res.status(500).json({ result: err.message });
    });
};

module.exports = {
  getMessages,
  createMessage,
  registerMessage,
  deleteMessage,
};
