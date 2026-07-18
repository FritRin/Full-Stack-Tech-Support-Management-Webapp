#!/bin/bash

psql -U victoria -d sportsprotechsupportdb <<-EOSQL



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
   phone VARCHAR(20) NOT NULL,
   email VARCHAR(100) NOT NULL UNIQUE,
   password VARCHAR(100) NOT NULL);

CREATE TABLE registrations (
   customerID INTEGER NOT NULL REFERENCES customers(customerID),
   productCode VARCHAR(10) NOT NULL REFERENCES products(productCode),
   registrationDate TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   PRIMARY KEY (customerID, productCode));
EOSQL