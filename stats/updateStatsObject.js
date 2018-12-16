var fs = require("fs");
var fakeHouses = JSON.parse(fs.readFileSync("./fakeHouses.json", "utf8"));
var statsPerCity = JSON.parse(fs.readFileSync("./statsPerCity.json", "utf8"));

var newStatsPerDate = {
  city: "",
  data: {
    date: "",
    values: {
      count: 0,
      sum_price: 0
    }
  }
};

for (i = 0; i < 100; i++) {
  const cityName = fakeHouses[i].location.city;
  newStatsPerDate.city = cityName;

  const dataDate = "13-12-2018";
  newStatsPerDate.data.date = dataDate;

  const housePrice = fakeHouses[i].price.value;
  newStatsPerDate.data.values.sum_price += housePrice;

  newStatsPerDate.data.values.count++;
}
statsPerCity.push(newStatsPerDate);

console.log(newStatsPerDate);

fs.readFile("./statsPerCity.json", "utf8", function(err, data) {
  if (err) {
    console.log(err);
  } else {
    obj = JSON.parse(data);
    obj.push(newStatsPerDate);

    fs.writeFile("./statsPerCity.json", JSON.stringify(obj), "utf8", function(
      err
    ) {
      if (err) {
        console.log(err);
      }
      console.log("The file was saved!");
    });
  }
});
