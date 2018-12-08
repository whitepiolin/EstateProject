function pageFunction(context) {
  var $ = context.jQuery;
  if (context.request.label === "house") {
    const singleHouseDetails = {
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

    return singleHouseDetails;
  } else {
    context.skipOutput();
  }
}
