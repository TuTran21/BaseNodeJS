//////////////////////////////////////
/////// ASSIGNMENT 2 - TASK 2////////
/////////////////////////////////////
// REQUIREMENTS
/////////////////////////////////////
// Use fs.readFile() to read the products.json file and convert it to JS object.
// Print the total number of products to console.
// Convert dateUpdated of each item into real Date. (same property name)
// Hint: Using Array.prototype.forEach and Date() constructor
// Install date-fns@next (2.x-alpha version) into the project
// Print the list to the console with following template for each product:
// ${name} - ${price}VND - Cập nhật cách đây: ${fromNow}
// Format the price with comma (,) as thousand separators. (Google for a snippet)

// Use date-fns formatDistance to convert dateUpdated to fromNow with Vietnamese locale
// Expected results
// 0001 - iPhone X - 30,000,000VND - Cập nhật cách đây 3 ngày
// 0002 - Samsung S9 - 25,000,000VND - Cập nhật cách đây 12 giờ

// REQUIRES
const _ = require("lodash");
const formatDistance = require("date-fns/formatDistance");
const format = require("date-fns/format");
const fs = require("fs");
const numberFormat = require("../../functions/numberFormat/numberFormat");
const XLSX = require("xlsx");
//
const readFile = fs.readFile("../../products.json", "utf8", function read(
  err,
  data
) {
  if (err) {
    throw err;
  }
  var products = JSON.parse(data);
  print(products);
  newProducts(products);
});

const print = products => {
  const currentDate = new Date();
  const currency = "VND";
  const printLoop = _.forEach(products, function(value) {
    //  define
    const product = value;
    const dateUpdated = product.dateUpdated;
    // Working with dates
    const dateUpdatedParse = Date.parse(dateUpdated);
    const dateDistance = formatDistance(dateUpdatedParse, currentDate);
    // Working with names
    const productName = product.name;
    // Woring with prices
    const price = product.price;
    const priceFormat = numberFormat(price);
    const priceString = priceFormat + " " + currency;
    // ID
    const productID = product.id;
    //  Printing
    console.log(
      productID +
        " - " +
        productName +
        " - " +
        priceString +
        " - " +
        "updated " +
        dateDistance +
        " ago"
    );
  });
};
//////////////////////////////////////
/////// ASSIGNMENT 2 - TASK 3////////
/////////////////////////////////////
// REQUIREMENT
/////////////////////////////////////
// Task 03 - Score: 3
// Create new field updated from dateUpdated with following format: MM/DD/YYYY (use date-fns)
// Delete dateUpdated field (we don't want to generate this column later to Excel)
// Install xlsx into the previously created project
// Use xlsx library to convert products.json to a Microsoft Excel file buffer
// Write the buffer to hard drive as products.xlsx and should be able to open in Excel.
// cloning new products
const newProducts = products => {
  let newProducts = [];
  const newProductsMap = _.map(products, function productMap(product) {
    const dateUpdated = product.dateUpdated;
    const newDate = dateModify(dateUpdated);
    const newPrice = numberFormat(product.price);
    const newProduct = { ...product, dateUpdated: newDate, price: newPrice };

    newProducts.push(newProduct);
  });
  // Write to new File
  convertJSONToXLSX(newProducts);
};
// modify and format date
const dateModify = date => {
  return format(new Date(date), "mm/dd/yyyy");
};
// write function
const writeFile = products => {
  let data = JSON.stringify(products);
  fs.writeFile("products-2.json", data, function(err) {
    if (err) {
      return console.log(err);
    }
  });
};

function convertJSONToXLSX(products) {
  // create 'worksheet' object from json
  const ws = XLSX.utils.json_to_sheet(products);

  // Optional: config columns width (character length)
  ws["!cols"] = [
    { width: 10 },
    { width: 30 },
    { width: 5 },
    { width: 20 },
    { width: 20 }
  ];

  // create 'workbook' object (which contains multiple sheet)
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Products");

  // convert to Microsoft EXCEL workbook and write to a Buffer object
  const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  fs.writeFile("./products.xlsx", buf, err => {
    if (err) {
      console.error("Write xlsx failed: ", err);
      return;
    }
    console.log("Wrote file successful");
  });
}
