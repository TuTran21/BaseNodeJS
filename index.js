// IMPORTS REQUIRES
var _ = require("lodash");
////////////////////////////
/////// ASSIGNMENT 1///////
///////////////////////////

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
