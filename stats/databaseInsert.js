const mysql = require("mysql");
const houseDetails = require("./fakeHouses.json");
const statsDetails = require("./statsPerCity.json");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "000000",
  database: "realestatemarket",
  port: 3306
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

houseDetails.forEach(houseDetail => {
  const {
    link,
    location,
    size,
    price,
    description,
    title,
    market_date
  } = houseDetail;

  const arrForDatabase = [];

  arrForDatabase.push(link);
  arrForDatabase.push(location.country);
  arrForDatabase.push(location.city);
  arrForDatabase.push(location.address);
  arrForDatabase.push(size.parcel_m2);
  arrForDatabase.push(size.gross_m2);
  arrForDatabase.push(size.net_m2);
  arrForDatabase.push(size.rooms);
  arrForDatabase.push(price.value);
  arrForDatabase.push(price.currency);
  arrForDatabase.push(description);
  arrForDatabase.push(title);
  arrForDatabase.push(market_date);

  const databaseQuerry =
    "INSERT INTO housesForSale (link, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_grossm2, size_rooms, price_value, price_currency, description, title, images, market_date, sold) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

  connection.query(databaseQuerry, [...arrForDatabase], function(error) {
    if (error) throw error;
  });
});

statsDetails.forEach(statsDetail => {
  const { city, data } = statsDetail;

  const arrForDatabase2 = [];

  arrForDatabase.push(city);
  arrForDatabase.push(data.date);
  arrForDatabase.push(data.values.count);
  arrForDatabase.push(data.values.sum_price);

  const databaseQuerry2 =
    "INSERT INTO statsHousesForSale (city, data_date, data_values_count, data.values_sum_price) VALUES (?,?,?,?)";

  connection.query(databaseQuerry2, [...arrForDatabase2], function(error) {
    if (error) throw error;
  });
});

connection.end();
