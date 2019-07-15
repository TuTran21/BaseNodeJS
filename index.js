// IMPORTS REQUIRES
var _ = require("lodash");
////////////////////////////
/////// ASSIGNMENT 1///////
///////////////////////////
console.log("////////////// ASSIGNMENT 1 ////////////////");
const students = [
  {
    name: "Nam",
    age: 24,
    gender: "male"
  },
  {
    name: "Mai",
    age: 22,
    gender: "female"
  },
  {
    name: "Trang",
    age: 23,
    gender: "female"
  },
  {
    name: "An",
    age: 20,
    gender: "male"
  },
  {
    name: "Thien",
    age: 27,
    gender: "male"
  }
];

const studentsGender = _.countBy(students, "gender");
console.log("Count by gender:");
console.log(studentsGender);
console.log("Male: " + studentsGender.male);
console.log("Female: " + studentsGender.female);

const studentsName = _.map(students, "name");
console.log("Students names:");
console.log(studentsName);

////////////////////////////
/////// ASSIGNMENT 2///////
///////////////////////////
console.log("//////////////// ASSIGNMENT 2 /////////////////");
const readline = require("readline");

const userInfoInput = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// userInfoInput.question("What's your name? ", name => {
//   userInfoInput.question("What's your year of birth? ", yob => {
//     userInfoInput.question("Where is your hometown? ", hometown => {
//       user = {
//         name: name,
//         yob: yob,
//         hometown: hometown
//       };
//       console.log("Welcome");
//     });
//   });
// });

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

const invoke = async () => {
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
      " years old living at " +
      user.hometown
  );
  userInfoInput.close();
};

invoke();
