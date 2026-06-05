"use strict";

const ConvertHandler = require("../controllers/convertHandler");
const convertHandler = new ConvertHandler();

module.exports = function (app) {
  app.get("/api/convert", (req, res) => {
    const input = req.query.input;

    if (!input) {
      return res.json({ error: "invalid number and unit" });
    }

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    const numError = initNum === "invalid number";
    const unitError = initUnit === "invalid unit";

    if (numError && unitError) {
      return res.json({ error: "invalid number and unit" });
    }
    if (numError) {
      return res.json({ error: "invalid number" });
    }
    if (unitError) {
      return res.json({ error: "invalid unit" });
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const string = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    return res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string,
    });
  });
};