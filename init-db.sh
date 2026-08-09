#!/bin/bash

psql -U victoria -d sportsprotechsupportdb <<-EOSQL

CREATE TABLE countries (
   countryCode CHAR(2) PRIMARY KEY,
   countryName VARCHAR(50) NOT NULL);

CREATE TABLE products (
   productCode VARCHAR(10) PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   version DECIMAL(18, 1) NOT NULL,
   releaseDate DATE NOT NULL);

CREATE TABLE technicians(   
   techID SERIAL PRIMARY KEY,
   firstName VARCHAR(50) NOT NULL,
   lastName VARCHAR(50) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   phone VARCHAR(20) NOT NULL,
   password VARCHAR(100) NOT NULL);

CREATE TABLE customers (   
   customerID SERIAL PRIMARY KEY,
   firstName VARCHAR(50) NOT NULL,
   lastName VARCHAR(50) NOT NULL,
   city VARCHAR(50) NOT NULL,
   state VARCHAR(50) NOT NULL,
   postalCode VARCHAR(20) NOT NULL,
   countryCode CHAR(2) NOT NULL REFERENCES countries(countryCode),
   phone VARCHAR(20) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL);

CREATE TABLE incidents (
   incidentID SERIAL PRIMARY KEY,
   customerID INTEGER NOT NULL REFERENCES customers(customerID),
   productCode VARCHAR(10) NOT NULL REFERENCES products(productCode),
   techID INTEGER REFERENCES technicians(techID),
   dateOpened TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   dateClosed TIMESTAMP,
   title VARCHAR(50) NOT NULL,
   description TEXT NOT NULL);

CREATE TABLE registrations (
   customerID INTEGER NOT NULL REFERENCES customers(customerID),
   productCode VARCHAR(10) NOT NULL REFERENCES products(productCode),
   registrationDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (customerID, productCode));

CREATE TABLE administrators (
   username VARCHAR(40) PRIMARY KEY,
   password VARCHAR(100) NOT NULL);

CREATE TABLE users (
   id INTEGER NOT NULL,
   username VARCHAR(100) UNIQUE NOT NULL PRIMARY KEY,
   password VARCHAR(100) NOT NULL,
   role VARCHAR(20) NOT NULL);

INSERT INTO administrators (username, password) VALUES ('admin', '\$2b\$10\$5NEZB8Rx6lCQYkjm0VlXKOF9NM7LKXri6jzkgm6J5ZcUXJs9Qi7ia');
INSERT INTO users (id, username, password, role) VALUES (1, 'admin', '\$2b\$10\$5NEZB8Rx6lCQYkjm0VlXKOF9NM7LKXri6jzkgm6J5ZcUXJs9Qi7ia', 'admin');
INSERT INTO countries (countrycode, countryname) VALUES ('US', 'United States');
INSERT INTO countries (countrycode, countryname) VALUES ('UK', 'United Kingdom');
INSERT INTO countries (countrycode, countryname) VALUES ('AU', 'Australia');
INSERT INTO countries (countrycode, countryname) VALUES ('CA', 'Canada');
INSERT INTO countries (countrycode, countryname) VALUES ('FR', 'France');
INSERT INTO products (productcode, name, version, releasedate) VALUES ('DRAFT10', 'Draft Manager 1.0', 1, '2025-07-11');
INSERT INTO products (productcode, name, version, releasedate) VALUES ('LEAG10', 'League Scheduler 1.0', 1, '2025-11-23');
INSERT INTO technicians (firstname, lastname, email, phone, password) VALUES ('John', 'Smith', 'johnsmith@sportspro.com', '111-111-111', '\$2b\$10\$dj28LG2P9DM3.TeoR7gCb.1HIC3uLdHgcZTG4AUwXb0JAdiQPlvvW');
INSERT INTO users (id, username, password, role) VALUES (1, 'johnsmith@sportspro.com', '\$2b\$10\$dj28LG2P9DM3.TeoR7gCb.1HIC3uLdHgcZTG4AUwXb0JAdiQPlvvW', 'technician');
INSERT INTO technicians (firstname, lastname, email, phone, password) VALUES ('Jane', 'Doe', 'janedoe@sportspro.com', '222-222-222', '\$2b\$10\$X1PeoW0FvXjEYlwprAOE6ejkiFH1Yapfhs0lp26O.EWh99Yh2jPje');
INSERT INTO users (id, username, password, role) VALUES (2, 'janedoe@sportspro.com', '\$2b\$10\$X1PeoW0FvXjEYlwprAOE6ejkiFH1Yapfhs0lp26O.EWh99Yh2jPje', 'technician');
INSERT INTO customers (firstname, lastname, city, state, postalcode, countrycode, phone, email, password) VALUES ('Johnathan', 'Sims', 'London', 'Greater London', 'E1 6AN', 'UK', '020 1111 1111', 'johnathansims@magnusmail.com', '\$2b\$10\$I.QbDiUuHBLeNEPW6pSWbu.FiW5ZSQL37EOvygltYM39qYn5JnOyG');
INSERT INTO users (id, username, password, role) VALUES (1, 'johnathansims@magnusmail.com', '\$2b\$10\$I.QbDiUuHBLeNEPW6pSWbu.FiW5ZSQL37EOvygltYM39qYn5JnOyG', 'customer');
INSERT INTO customers (firstname, lastname, city, state, postalcode, countrycode, phone, email, password) VALUES ('Martin', 'Blackwood', 'London', 'Greater London', 'E1 6AN', 'UK', '020 2222 2222', 'martinblackwood@magnusmail.com', '\$2b\$10\$uhi.UAhwCGEl/1iphR6eEuqmUtLXKvUizsg0FQS2hvT.F/fJvRChm');
INSERT INTO users (id, username, password, role) VALUES (2, 'martinblackwood@magnusmail.com', '\$2b\$10\$uhi.UAhwCGEl/1iphR6eEuqmUtLXKvUizsg0FQS2hvT.F/fJvRChm', 'customer');
INSERT INTO registrations (customerid, productcode, registrationdate) VALUES (2, 'DRAFT10', '2026-08-03');
EOSQL