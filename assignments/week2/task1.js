////////////////////////////
/////// ASSIGNMENT 2///////
///////////////////////////
///////////////// TASK 1//////////////////////
// REQUIREMENTS
// Create new project folder (you are free to choose its name)
// Use npm init to create a package.json and a new Node.js project from scratch
// Create index.js in the project folder and write some code to satisfy below test case
// Try to run the project with node command in terminal
// The Node.js app must satisfy following test case:
// Expected result
// # inside project folder, run:
// node .
// # The node app will prompt for few questions:
// > What\'s your name? [user enter their name and enter]
// > What\'s your year of birth? [user enter their yob and enter]
// > What\'s your home town? [user enter their home town and enter]
// # After user answers the three questions, respond with:
// > Thank you. Hello [name], so you are [age] year old and from [homeTown].
// # Note that you must convert [yob] to [age]
// # Use different color in console.log for [name] [age] and [homeTown]
//////////////////////////////////////////////
const _ = require("lodash");
const readline = require("readline");

const userInfoInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let user = {
  name: "",
  yob: "",
  hometown: ""
};

const name = () => {
  return new Promise((resolve, reject) => {
    userInfoInput.question("What's your name? ", answer => {
      user = { ...user, name: answer };
      resolve();
    });
  });
};

const yob = () => {
  return new Promise((resolve, reject) => {
    userInfoInput.question("What's your year of birth? ", answer => {
      user = { ...user, yob: answer };
      resolve();
    });
  });
};

const hometown = () => {
  return new Promise((resolve, reject) => {
    userInfoInput.question("What's your hometown? ", answer => {
      user = { ...user, hometown: answer };
      resolve();
    });
  });
};

const invokeInput = async () => {
  await name();
  await yob();
  await hometown();

  // DATE CALCULATION
  const currentYear = new Date().getFullYear();
  const userAge = currentYear - Number(user.yob);
  // OUTPUT
  console.log(
    "Welcome " +
      user.name +
      ", who is now " +
      userAge +
      " years old and comes from " +
      user.hometown
  );
  userInfoInput.close();
};

invokeInput();
//////////////////////////////////////
/////// ASSIGNMENT 2 - TASK 3////////
/////////////////////////////////////
// REQUIREMENT
// Create new field updated from dateUpdated with following format: MM/DD/YYYY (use date-fns)
// Delete dateUpdated field (we don't want to generate this column later to Excel)
// Install xlsx into the previously created project
// Use xlsx library to convert products.json to a Microsoft Excel file buffer
// Write the buffer to hard drive as products.xlsx and should be able to open in Excel.
