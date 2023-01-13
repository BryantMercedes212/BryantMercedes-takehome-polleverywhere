const express = require("express");

const {
  getAllRaffles,
  createOne,
  getRaffleById,
  createNewParticipant,
  addWinner,
  getAllWinner,
} = require("../queries/raffles");

// Configuration
const raffle = express.Router({ mergeParams: true });

// GET all entries
raffle.get("/", async (request, response) => {
  const allRaffles = await getAllRaffles();

  response.status(200).json({ allRaffles });
});

//Post request to create a new raffle
raffle.post("/", async (request, response) => {
  const newRaffle = await createOne(request.body.raffle);

  response.status(200).json(newRaffle);
});

// GET single raffle by id
raffle.get("/:id", async (request, response) => {
  const { id } = request.params;
  const oneRaffle = await getRaffleById(id);

  response.status(200).json(oneRaffle);
});

raffle.post("/:id/participants", async (request, response) => {
  const participant = await createNewParticipant(request.body.participant);

  response.status(200).json(participant);
});

// raffle.post("/:id/winner", async (request, response) => {
//   const { id } = request.params;
//   const winner = await addWinner(id, request.body.participant);

//   response.status(200).json(winner);
// });

raffle.get("/:id/winner", async (request, response) => {
  const { id } = request.params;
  const winners = await getAllWinner(id);

  response.status(200).json(winners);
});

module.exports = raffle;
