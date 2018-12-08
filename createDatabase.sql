CREATE database realEstateMarket;
USE realEstateMarket;

CREATE TABLE housesForSale(
link VARCHAR(200) NULL,
location_country VARCHAR(50) NOT NULL,
location_city VARCHAR(50) NOT NULL,
location_address VARCHAR(200) NULL,
location_coordinates_lat VARCHAR(50) NULL,
location_coordinates_lng VARCHAR(50) NULL,
size_parcelm2 VARCHAR(50) NULL,
size_grossm2 VARCHAR(50) NULL,
size_netm2 VARCHAR(50) NULL,
size_rooms VARCHAR(50) NOT NULL,
price_value VARCHAR(50) NOT NULL,
price_currency VARCHAR(50) NOT NULL,
description TEXT NULL,
title VARCHAR(200) NULL,
images TEXT NULL
);

-- CREATE TABLE housesForSale(
-- link VARCHAR(200) NOT NULL,
-- location_country VARCHAR(50) NOT NULL,
-- location_city VARCHAR(50) NOT NULL,
-- location_address VARCHAR(200) NULL,
-- location_coordinates_lat FLOAT NULL,
-- location_coordinates_lng FLOAT NULL,
-- size_parcelm2 FLOAT NULL,
-- size_grossm2 FLOAT NULL,
-- size_netm2 FLOAT NULL,
-- size_rooms FLOAT NOT NULL,
-- price_value FLOAT NOT NULL,
-- price_currency VARCHAR(50) NOT NULL,
-- description TEXT NULL,
-- title VARCHAR(200) NULL,
-- images TEXT NULL,
-- PRIMARY KEY (link)
-- );


