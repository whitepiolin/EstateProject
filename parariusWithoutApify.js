const rp = require("request-promise");
const tough = require("tough-cookie");
const cheerio = require("cheerio");
const uuidv1 = require("uuid/v1");

// const cookie = new tough.Cookie({
//   key: uuidv1(),
//   value: uuidv1(),
//   domain: "www.pararius.nl",
//   httpOnly: true,
//   maxAge: 31536000
// });

// const cookiejar = rp.jar();
// cookiejar.setCookie(cookie, "https://www.pararius.nl");

for (let i = 1; i < 3; i++) {
  const text1 = "https://www.pararius.nl/koopwoningen/rotterdam/page-";
  url = `${text1}${i}`;

  rp(url, {
    headers: {
      "User-Agent":
        "Mozilla/4.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
    },
    // jar: cookiejar,
    transform: body => {
      return cheerio.load(body);
    }
  })
    .then($ => {
      const links = [];
      $(".details").each((i, elem) => {
        links[i] = $(elem)
          .find("a")
          .attr("href");
      });
      links.join(", ");

      const linksOfHouses = links.map(item => {
        return `https://www.pararius.nl${item}`;
      });

      linksOfHouses.forEach(link => {
        rp({
          uri: link,
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36"
          },
          // jar: cookiejar,
          transform: body => {
            return cheerio.load(body);
          }
        })
          .then($ => {
            const singleHouseDetails = {
              type: "",
              price: "",
              roomNumber: "",
              address: {
                region: "",
                street: "",
                postcode: ""
              }
            };

            const typeData = $(
              ".details-container dl:nth-child(4) dd:nth-child(2)"
            ).text();
            singleHouseDetails.type = typeData;

            const priceData = $(
              ".details-container dl:nth-child(2) dd:nth-child(8)"
            ).text();
            singleHouseDetails.price = priceData;

            const roomNumberData = $(
              ".details-container dl:nth-child(2) dd:nth-child(14)"
            ).text();
            singleHouseDetails.roomNumber = roomNumberData;

            const regionData = $(
              ".details-container dl:nth-child(2) dd:nth-child(2)"
            ).text();
            singleHouseDetails.address.region = regionData;

            const streetData = $(
              ".details-container dl:nth-child(2) dd:nth-child(4)"
            ).text();
            singleHouseDetails.address.street = streetData;

            const postcodeData = $(
              ".details-container dl:nth-child(2) dd:nth-child(6)"
            ).text();
            singleHouseDetails.address.postcode = postcodeData;

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
