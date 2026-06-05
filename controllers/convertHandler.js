class ConvertHandler {
  constructor() {
    this.unitMap = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };

    this.spellOut = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilograms",
      mi: "miles",
      km: "kilometers",
    };

    this.toLowerUnit = (unit) => {
      if (unit === "L") return "L";
      return unit.toLowerCase();
    };
  }

  getNum(input) {
    const result = input.match(/^[\d./]*/)[0];

    if (!result) return 1;

    if (result.includes("/")) {
      const parts = result.split("/");
      if (parts.length !== 2) return "invalid number";
      return parseFloat(parts[0]) / parseFloat(parts[1]);
    }

    return parseFloat(result);
  }

  getUnit(input) {
    const match = input.match(/[a-zA-Z]+/g);
    if (!match) return "invalid unit";

    let unit = match.join("");

    unit = unit === "l" || unit === "L" ? "L" : unit.toLowerCase();

    const valid = ["gal", "L", "lbs", "kg", "mi", "km"];

    if (!valid.includes(unit)) return "invalid unit";

    return unit;
  }

  getReturnUnit(initUnit) {
    return this.unitMap[initUnit];
  }

  spellOutUnit(unit) {
    return this.spellOut[unit];
  }

  convert(initNum, initUnit) {
    let result;

    switch (initUnit) {
      case "gal":
        result = initNum * 3.78541;
        break;
      case "L":
        result = initNum / 3.78541;
        break;
      case "lbs":
        result = initNum * 0.453592;
        break;
      case "kg":
        result = initNum / 0.453592;
        break;
      case "mi":
        result = initNum * 1.60934;
        break;
      case "km":
        result = initNum / 1.60934;
        break;
    }

    return parseFloat(result.toFixed(5));
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  }
}

module.exports = ConvertHandler;