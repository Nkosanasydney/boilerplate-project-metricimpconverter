const chai = require("chai");
const assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {

  test("convertHandler should correctly read a whole number input.", function () {
    assert.equal(convertHandler.getNum("32L"), 32);
  });

  test("convertHandler should correctly read a decimal number input.", function () {
    assert.equal(convertHandler.getNum("3.5kg"), 3.5);
  });

  test("convertHandler should correctly read a fractional input.", function () {
    assert.equal(convertHandler.getNum("1/2mi"), 0.5);
  });

  test("convertHandler should correctly read a fractional input with a decimal.", function () {
    assert.approximately(convertHandler.getNum("5.5/2kg"), 2.75, 0.001);
  });

  test("convertHandler should correctly return an error on a double-fraction.", function () {
    assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
  });

  test("convertHandler should correctly default to 1 when no number is provided.", function () {
    assert.equal(convertHandler.getNum("kg"), 1);
  });

  test("convertHandler should correctly read each valid input unit.", function () {
    assert.equal(convertHandler.getUnit("32L"), "L");
  });

  test("convertHandler should correctly return an error for an invalid input unit.", function () {
    assert.equal(convertHandler.getUnit("32g"), "invalid unit");
  });

  test("convertHandler should correctly return return unit.", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
  });

  test("convertHandler should correctly spell out unit.", function () {
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  test("convertHandler should correctly convert gal to L.", function () {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.001);
  });

  test("convertHandler should correctly convert L to gal.", function () {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.001);
  });

  test("convertHandler should correctly convert mi to km.", function () {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.001);
  });

  test("convertHandler should correctly convert km to mi.", function () {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.001);
  });

  test("convertHandler should correctly convert lbs to kg.", function () {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.453592, 0.001);
  });

  test("convertHandler should correctly convert kg to lbs.", function () {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.001);
  });

});