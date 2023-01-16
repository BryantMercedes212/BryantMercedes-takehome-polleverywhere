\c raffles;

INSERT INTO raffle (name, secret_key, created)
VALUES ('first raffle', '123', '2022-11-14T14:14:45.364Z'),('second raffle', '123', '2022-11-14T14:14:45.364Z' ), ('third raffle', '123', '2022-11-14T14:14:45.364Z');

INSERT INTO participant (
    firstName ,
    lastName ,
    email ,
    phone,
    raffle_id )
VALUES
 ('Bryant', 'Mercedes','123@gmail.com', '21334', 1),
('br', 'mr','123@gmail.com', '21334', 1), 
('kasmyn', 'Castillo','123@gmail.com', '21334', 1), 
('Ruben', 'mr','123@gmail.com', '21334', 1),
('Darien', 'Mercedes','123@gmail.com', '21334', 1),
('Emma', 'Mercedes','123@gmail.com', '21334', 1),
('Gabriela', 'Inoa','123@gmail.com', '21334', 1),
('Sherlie', 'Luna','123@gmail.com', '21334', 1),
('Lol', 'Luna','123@gmail.com', '21334', 1),
('betzy', 'Luna','123@gmail.com', '21334', 1),
('Jordan', 'Manly','123@gmail.com', '21334', 1),
('Manuel', 'Luna','123@gmail.com', '21334', 1);


