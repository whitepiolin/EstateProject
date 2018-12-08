const rp = require("request-promise");
const cheerio = require("cheerio");

for (let i = 1; i < 3; i++) {
  const text1 =
    "https://www.marktplaats.nl/z/huizen-en-kamers/huizen-te-koop/amsterdam.html?categoryId=2142&attributes=S%2C4548&currentPage=";
  url = `${text1}${i}`;

  rp(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
    },
    transform: body => {
      return cheerio.load(body);
    }
  })
    .then($ => {
      const links = [];

      $(".listing-title-description").each(function(i, elem) {
        links[i] = $(elem)
          .find("a")
          .attr("href");
      });
      links.join(", ");

      const linksOfHouses = links.map(item => {
        return item;
      });
      console.log(linksOfHouses);
      linksOfHouses.forEach(url => {
        rp({
          uri: url,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
          },
          transform: body => {
            return cheerio.load(body);
          }
        })
          .then($ => {
            const singleHouseDetails = {
              link: `${url}`,
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
              images: []
            };

            const cityData = $(
              "#vip-ad-attributes > div > table.first-column.attribute-table.single-value-attributes > tbody > tr:nth-child(1) > td.value"
            ).text();
            singleHouseDetails.location.city = cityData;

            const addressData = $().text();
            singleHouseDetails.location.address = addressData;

            const latData = $().text();
            singleHouseDetails.location.coordinates.lat = latData;

            const lngData = $().text();
            singleHouseDetails.location.coordinates.lng = lngData;

            const parcelData = $(
              "#vip-ad-attributes > div > table.second-column.attribute-table.single-value-attributes > tbody > tr:nth-child(1) > td.value"
            ).text();
            singleHouseDetails.size.parcel_m2 = parcelData;

            const grossData = $().text();
            singleHouseDetails.size.gross_m2 = grossData;

            const netData = $(
              "#vip-ad-attributes > div > table.first-column.attribute-table.single-value-attributes > tbody > tr:nth-child(3) > td.value"
            ).text();
            singleHouseDetails.size.net_m2 = netData;

            const roomsData = $(
              "#vip-ad-attributes > div > table.first-column.attribute-table.single-value-attributes > tbody > tr:nth-child(2) > td.value"
            ).text();
            singleHouseDetails.size.rooms = roomsData;

            const priceData = $("#vip-ad-price-container > span").text();
            singleHouseDetails.price.value = priceData;

            const titleData = $("#title").text();
            singleHouseDetails.title = titleData;

            const descriptionData = $("#vip-ad-description").text();
            singleHouseDetails.description = descriptionData;

            const images = $("#vip-image-viewer div.image").find("img");
            const imgArray = [];
            var i;
            for (i = 0; i < 10; i++) {
              const image = $(images[i]);
              const src = image.attr("src");
              imgArray.push(src);
            }
            singleHouseDetails.images = imgArray;

            console.log(singleHouseDetails);
          })
          .catch(error => {
            console.log(error);
          });
      });
    })
    .catch(error => {
      console.log(error);
    });
}
