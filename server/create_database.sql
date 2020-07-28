CREATE DATABASE todoapp;

CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL
);

CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100)
);