//USED TO SEPERATE NUMBERS WITH COMMAS BY THOUNDSANDS
//EX: 123,456

module.exports = function numberFormat(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
