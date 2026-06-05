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
  }

  getNum(input) {
    const numPart = input.match(/^[\d./]+/)?.[0];

    // no number → default 1
    if (!numPart) return 1;

    // multiple slashes → invalid
    if ((numPart.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    if (numPart.includes("/")) {
      const [a, b] = numPart.split("/");

      if (!a || !b || isNaN(a) || isNaN(b)) {
        return "invalid number";
      }

      return parseFloat(a) / parseFloat(b);
    }

    // invalid cases like "." or "/"
    if (isNaN(numPart)) return "invalid number";

    return parseFloat(numPart);
  }

  getUnit(input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);

    if (!unitMatch) return "invalid unit";

    let unit = unitMatch[0];

    // handle liter
    if (unit.toLowerCase() === "l") return "L";

    unit = unit.toLowerCase();

    const valid = ["gal", "lbs", "kg", "mi", "km"];

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