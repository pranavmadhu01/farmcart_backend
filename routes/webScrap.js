const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();

router.get("/pricedata", function (req, res, next) {
  axios("https://market.todaypricerates.com/Kerala-vegetables-price").then(
    (response) => {
      var vegetableName;
      var marketPrice;
      var retailPrice;
      var shoppingMall;
      const html = response.data;
      const $ = cheerio.load(html);
      const arrayvegetableName = [];
      const arraymarketPrice = [];
      const arrayretailPrice = [];
      const arrayshoppingMall = [];
      const priceData = [];
      $(".Row div:nth-child(1)", html).each(function () {
        vegetableName = $(this).text();
        arrayvegetableName.push(vegetableName);
      });
      $(".Row div:nth-child(3)", html).each(function () {
        marketPrice = $(this).text();
        arraymarketPrice.push(marketPrice);
      });
      $(".Row div:nth-child(4)", html).each(function () {
        retailPrice = $(this).text();
        arrayretailPrice.push(retailPrice);
      });
      $(".Row div:nth-child(5)", html).each(function () {
        shoppingMall = $(this).text();
        arrayshoppingMall.push(shoppingMall);
      });

      priceData.push({
        arrayvegetableName,
        arraymarketPrice,
        arrayretailPrice,
        arrayshoppingMall,
      });

      res.status(200).json({
        success: true,
        result: priceData,
      });
    }
  );
});

module.exports = router;
