CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80) NOT NULL,
  first VARCHAR(80) NOT NULL,
  last VARCHAR(80) NOT NULL,
  email VARCHAR(160) NOT NULL,
  password VARCHAR(160) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);