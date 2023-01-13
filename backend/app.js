// Dependencies
const express = require("express");
const cors = require("cors");

// Configuration
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

require("dotenv").config();

// Routes
app.get("/", (request, response) => {
  response.status(200).send("Hello World");
});

// Products ROUTES
// const entriesController = require("./controllers/raffleControllers");
// app.use("/entries", entriesController);

app.get("*", (request, response) => {
  response.status(404).send("Page not found");
});

//Export
module.exports = app;
