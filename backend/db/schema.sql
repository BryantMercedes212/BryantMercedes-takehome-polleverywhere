DROP DATABASE IF EXISTS raffles;
CREATE DATABASE raffles;

\c raffles;

DROP TABLE IF EXISTS raffle;

CREATE TABLE raffle (
 id SERIAL PRIMARY KEY,
 name TEXT NOT NULL,
 secret_key TEXT NOT NULL,
 created TIMESTAMP NOT NULL,
 raffled TIMESTAMP 
);

DROP TABLE IF EXISTS participant;

CREATE TABLE participant (
    id SERIAL PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    win TEXT DEFAULT 'no',
    lost BOOLEAN DEFAULT false,
    raffle_id INTEGER NOT NULL,
    FOREIGN KEY (raffle_id) REFERENCES raffle(id)
);

DROP TABLE IF EXISTS winner;

CREATE TABLE winner (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    raffle_id INTEGER NOT NULL,
    participant_id INTEGER NOT NULL,
    FOREIGN KEY (raffle_id) REFERENCES raffle(id),
    FOREIGN KEY (participant_id) REFERENCES participant(id)
);
