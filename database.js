const mysql      = require('mysql');
const houseDetails = require('./apifyResult.json')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '00000000',
  database : 'realestatemarket',
  port: 3306
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

houseDetails.forEach(houseDetail => {
  const {location, size, price, images, description, title} = houseDetail;
  const arrForDatabase = [];
  const link = houseDetail.url;
  arrForDatabase.push(link);
  arrForDatabase.push(location.country);
  arrForDatabase.push(location.city);
  arrForDatabase.push(location.address);
  arrForDatabase.push(location.coordinates.lat);
  arrForDatabase.push(location.coordinates.lng);
  arrForDatabase.push(size.gross_m2);
  arrForDatabase.push(size.rooms);
  arrForDatabase.push(price.value);
  arrForDatabase.push(price.currency);
  arrForDatabase.push(description);
  arrForDatabase.push(title);
  arrForDatabase.push(images.join());

  const databaseQuerry = "INSERT INTO housesForSale (link, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_grossm2, size_rooms, price_value, price_currency, description, title, images) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

  connection.query(databaseQuerry, [...arrForDatabase], function (error){
    if (error) throw error;
  });
})

connection.end();