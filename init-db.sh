#!/bin/bash

psql -U postgres -d sportsprotechsupportdb <<-EOSQL

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
   id SERIAL PRIMARY KEY,
   username VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR(100) NOT NULL,
   role VARCHAR(20) NOT NULL);
EOSQL