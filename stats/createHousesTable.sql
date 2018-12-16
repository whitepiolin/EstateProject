USE realEstateMarket;

CREATE TABLE fakeHousesForSale(
link VARCHAR(200) NULL,
location_country VARCHAR(50) NOT NULL,
location_city VARCHAR(50) NOT NULL,
-- location_address VARCHAR(200) NULL,
-- location_coordinates_lat VARCHAR(50) NULL,
-- location_coordinates_lng VARCHAR(50) NULL,
size_parcel_m2 VARCHAR(50) NULL,
size_gross_m2 VARCHAR(50) NULL,
size_net_m2 VARCHAR(50) NULL,
size_rooms VARCHAR(50) NOT NULL,
price_value VARCHAR(50) NOT NULL,
price_currency VARCHAR(50) NOT NULL,
description TEXT NULL,
title VARCHAR(200) NULL,
-- images TEXT NULL,
market_date VARCHAR(50) NULL,
-- sold BOOLEAN NOT NULL
);


