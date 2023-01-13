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

// Raffle ROUTES
const raffleController = require("./controllers/raffleControllers");
app.use("/raffle", raffleController);

app.get("*", (request, response) => {
  response.status(404).send("Page not found");
});

//Export
module.exports = app;
