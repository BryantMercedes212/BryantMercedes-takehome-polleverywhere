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
  const date = new Date(Date.now());
  try {
    let { name, secret_key } = raffle;
    const newOne = await db.one(
      "INSERT INTO raffle (name, secret_key, created) VALUES ($1, $2, $3) RETURNING * ",
      [name, secret_key, date]
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

const createNewParticipant = async (id, participant) => {
  try {
    let { firstName, lastName, email, phone } = participant;
    const newParticipant = await db.one(
      "INSERT INTO participant (firstName, lastName, email, phone, raffle_id) VALUES ($1, $2, $3, $4, $5) RETURNING * ",
      [firstName, lastName, email, phone, Number(id)]
    );
    return newParticipant;
  } catch (error) {
    return error;
  }
};

const getAllParticipants = async (id) => {
  try {
    const allParticipants = await db.any(
      "SELECT * FROM participant WHERE raffle_id=$1 AND win='no'",
      id
    );
    return allParticipants;
  } catch (error) {
    return error;
  }
};

const updateParticipants = async (id) => {
  try {
    const updatedParticipant = await db.one(
      "UPDATE participant SET win='yes' WHERE id=$1",
      id
    );
    return updatedParticipant;
  } catch (error) {
    return error;
  }
};

const deleteParticipant = async (id) => {
  try {
    const deletedParticipant = await db.one(
      " Delete From participant WHERE id=$1",
      id
    );
    return deletedParticipant;
  } catch (error) {
    return error;
  }
};

const getAllWinner = async (id) => {
  try {
    const allWinners = await db.any(
      "SELECT DISTINCT name From winner WHERE raffle_id=$1",
      id
    );
    return allWinners;
  } catch (error) {
    return error;
  }
};

const addWinner = async (participant) => {
  try {
    let { firstname, raffle_id, id } = participant;
    const newWinner = await db.one(
      "INSERT INTO winner (name, raffle_id, participant_id) VALUES ($1, $2, $3) RETURNING * ",
      [firstname, Number(raffle_id), Number(id)]
    );
    return newWinner;
  } catch (error) {
    return error;
  }
};

const updateRaffle = async (id) => {
  console.log("udate queery");
  const date = new Date(Date.now());
  try {
    const updatedParticipant = await db.one(
      "UPDATE raffle SET raffled=$1 WHERE id=$2",
      [date, id]
    );
    return updatedParticipant;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRaffles,
  createOne,
  getRaffleById,
  createNewParticipant,
  getAllParticipants,
  getAllWinner,
  addWinner,
  updateParticipants,
  deleteParticipant,
  updateRaffle,
};
