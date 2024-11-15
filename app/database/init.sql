CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, username, email, password) VALUES
('Colton', 'Palfrey', 'coltonpalfrey', 'colton.p@hotmail.com', 'password'),
('Tanner', 'Bjorgan', 'tannerbjorgan', 'tannerbjorgan@gmail.com', 'password');
