DROP DATABASE IF EXISTS todoapp;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS todos;

CREATE DATABASE todoapp;

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);

CREATE TABLE todos(
  todo_id SERIAL PRIMARY KEY,
  user_id SERIAL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id) 
      REFERENCES users(user_id)
      ON DELETE CASCADE
);