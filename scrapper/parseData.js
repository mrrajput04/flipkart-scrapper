const cheerio = require("cheerio");

const parseData = (html) => {
  const $ = cheerio.load(html);
  const data = $("._2kHMtA");
  if (data.html() === null) {
    return null;
  }
  const products = [];
  data.each((idx,el) => {
    const fullPhoneDetails = {};
    const derivedHTML = $(el).html();
    const load = cheerio.load(derivedHTML);
    fullPhoneDetails.url =
      "https://www.flipkart.com" + load("._1fQZEK").attr("href");
    fullPhoneDetails.imageURL = load("img").attr("src");
    fullPhoneDetails.name = load("._4rR01T").text();
    fullPhoneDetails.rating = {};
    fullPhoneDetails.rating.score = load("._3LWZlK").text();
    fullPhoneDetails.rating.rating = load("._2_R_DZ").text();
    fullPhoneDetails.det = [];
    load(".fMghEO ul li").each((i, li) => {
      fullPhoneDetails.det.push(load(li).text());
    });
    fullPhoneDetails.price = {};
    fullPhoneDetails.price.sellingPrice = load("._1_WHN1").text();
    fullPhoneDetails.price.actualPrice = load("._27UcVY").text();
    fullPhoneDetails.price.discount = load("._3Ay6Sb").text();

    products.push({
      Product: fullPhoneDetails.name,
      details: fullPhoneDetails,
    });
  });
  return products;
};

module.exports = parseData;
