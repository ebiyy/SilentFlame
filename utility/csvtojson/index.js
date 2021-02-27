// // require csvtojson module
// const CSVToJSON = require('csvtojson');

// // convert users.csv file to JSON array
// CSVToJSON()
//   .fromFile('nutrients.csv')
//   .then((nutrients) => {
//     // users is a JSON array
//     // log the JSON array
//     console.log(nutrients);
//   })
//   .catch((err) => {
//     // log error if any
//     console.log(err);
//   });
const path = require('path');
const fs = require('fs');
const csvFilePath = path.join(__dirname, '/organic_acid.csv');
const CSVToJSON = require('csvtojson');
CSVToJSON()
  .fromFile(csvFilePath)
  .then((jsonObj) => {
    console.log(jsonObj);
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
    fs.writeFile(
      path.join(__dirname, 'organic_acid.json'),
      JSON.stringify(jsonObj, null, 4),
      (err) => {
        if (err) {
          throw err;
        }
        console.log('JSON array is saved.');
      },
    );
  });
