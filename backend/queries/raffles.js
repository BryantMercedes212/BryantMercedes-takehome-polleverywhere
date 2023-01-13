const db = require("../db/dbConfig.js");

const getAllRaffles = async () => {
  try {
    const allRaffles = await db.any("SELECT * FROM raffle");
    return allRaffles;
  } catch (error) {
    return error;
  }
};

const createOne = async (raffle) => {
  try {
    let { name, secret_key } = raffle;
    const newOne = await db.one(
      "INSERT INTO raffle (name, secret_key) VALUES ($1, $2) RETURNING * ",
      [name, secret_key]
    );
    return newOne;
  } catch (error) {
    return error;
  }
};

const getRaffleById = async (id) => {
  try {
    const raffle = await db.one("SELECT * FROM raffle WHERE id=$1 ", id);
    return raffle;
  } catch (error) {
    return error;
  }
};

const createNewParticipant = async (participant) => {
  try {
    let { firstName, lastName, email, phone, id } = participant;
    const newParticipant = await db.one(
      "INSERT INTO participant (firstName, lastName, email, phone, raffle_id) VALUES ($1, $2, 3$, 4$, 5$) RETURNING * ",
      [firstName, lastName, email, phone, id]
    );
    return newParticipant;
  } catch (error) {
    return error;
  }
};

const getAllWinner = async (id) => {
  try {
    const allWinners = await db.any(
      "SELECT * FROM winner WHERE raffle_id=$1",
      id
    );
    return allWinners;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRaffles,
  createOne,
  getRaffleById,
  createNewParticipant,
  getAllWinner,
};
