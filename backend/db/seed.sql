\c raffles;

INSERT INTO raffle (name, secret_key)
VALUES ('first raffle', '123'),('second raffle', '123'), ('third raffle', '123');

INSERT INTO participant (
    firstName ,
    lastName ,
    email ,
    phone,
    raffle_id )
VALUES
 ('br', 'mr','123@gmail.com', '21334', 2),
('br', 'mr','123@gmail.com', '21334', 1), 
('br', 'mr','123@gmail.com', '21334', 3);
