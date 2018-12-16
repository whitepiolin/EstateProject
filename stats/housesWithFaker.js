const faker = require("faker");
const fs = require("fs");

const house = [
  {
    link: "",
    location: {
      country: "Netherlands",
      city: "",
      address: "",
      coordinates: {
        lat: "",
        lng: ""
      }
    },
    size: {
      parcel_m2: "",
      gross_m2: "",
      net_m2: "",
      rooms: ""
    },
    price: {
      value: "",
      currency: "Euro"
    },
    description: "",
    title: "",
    images: [],
    market_date: "",
    sold: false
  }
];

const generateHouse = function() {
  return {
    link: faker.internet.url(),
    location: {
      country: faker.address.country(),
      city: "Amsterdam"
      // faker.address.city()
    },
    size: {
      parcel_m2: faker.random.number(),
      gross_m2: faker.random.number(),
      net_m2: faker.random.number(),
      rooms: faker.random.number(),      
    },
    price: {
      value: faker.random.number(),
      currency: "EUR"
    },
    description: faker.lorem.text(),
    title: faker.random.words(),
    market_date: "12/12/2018"
  };
};

const generator = function() {
  const houses = [];
  const n = 100;
  for (let i = 0; i < n; i++) {
    houses.push(generateHouse());
  }
  
  fs.writeFileSync(
    "./fakeHouses.json",
    JSON.stringify(houses, null, 2),
  );
  console.log("written to json");
};

generator();




