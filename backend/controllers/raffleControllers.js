const express = require("express");

const {
  getAllRaffles,
  createOne,
  getRaffleById,
  createNewParticipant,
  getAllParticipants,
  addWinner,
  getAllWinner,
  updateParticipants,
  deleteParticipant,
  updateRaffle,
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
  const { id } = request.params;
  const participant = await createNewParticipant(id, request.body.participant);
  response.status(200).json(participant);
});

raffle.get("/:id/participants", async (request, response) => {
  const { id } = request.params;
  const participant = await getAllParticipants(id);

  response.status(200).json(participant);
});

raffle.post("/winner", async (request, response) => {
  const winner = await addWinner(request.body.winner);
  response.status(200).json(winner);
});

raffle.post("/update/winner", async (request, response) => {
  const winner = await updateParticipants(request.body.id);
  response.status(200).json(winner);
});

raffle.get("/:id/winner", async (request, response) => {
  const { id } = request.params;
  const winners = await getAllWinner(id);
  response.status(200).json(winners);
});

raffle.post("/delete/participant", async (request, response) => {
  const winner = await deleteParticipant(request.body.id);
  response.status(200).json(winner);
});

raffle.post("/:id/update", async (request, response) => {
  const { id } = request.params;
  const updatedRaffle = await updateRaffle(id);
  response.status(200).json(updatedRaffle);
});

module.exports = raffle;
