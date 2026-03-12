export function numberToWords(num: number): string {
  const nwords: { [key: number]: string } = {
    0: "",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine",
    10: "ten",
    11: "eleven",
    12: "twelve",
    13: "thirteen",
    14: "fourteen",
    15: "fifteen",
    16: "sixteen",
    17: "seventeen",
    18: "eighteen",
    19: "nineteen",
    20: "twenty",
    30: "thirty",
    40: "forty",
    50: "fifty",
    60: "sixty",
    70: "seventy",
    80: "eighty",
    90: "ninety",
  };

  if (num === 0) return "zero";

  function convert(n: number): string {
    if (n < 21) return nwords[n];
    if (n < 100) {
      const ten = Math.floor(n / 10) * 10;
      const rest = n % 10;
      return nwords[ten] + (rest > 0 ? " " + nwords[rest] : "");
    }
    if (n < 1000) {
      const hundred = Math.floor(n / 100);
      const rest = n % 100;
      return nwords[hundred] + " hundred" + (rest > 0 ? " " + convert(rest) : "");
    }
    if (n < 1000000) {
      const thousand = Math.floor(n / 1000);
      const rest = n % 1000;
      return convert(thousand) + " thousand" + (rest > 0 ? " " + convert(rest) : "");
    }
    return n.toString();
  }

  return convert(num);
}
