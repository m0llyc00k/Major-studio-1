// npm install cheerio

var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('./codebeautify.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);

// print (to the console) names of thesis students (this is to make sure your code is doing the right thing before creating it into a file)
//call all 'td' tags


var newData = []

newData.push(content.toString().replace(/"/g, "").replace(/<I><\/I>/, "").trim());

// // write the project titles to a text file
//  // this variable will hold the lines of text
// //call all 'td' tags
// $('td').each(function(i, elem) {
//         // if the 'td' tag has the below style...
//         if ($(elem).attr('style')=='border-bottom:1px solid #e3e3e3; width:260px') {
//         //then replace anything after '-' ',' '(' with nothing // split lines by tabs and turn into an arrays // remove all other arrays that dont have the address
//         addresses.push($(elem).html().replace(/[-,(].*/g, "").split("\n\t\t\t\t\t\t")[1].trim());
//         }
      
     
// });


//write the new file given the parameters above
fs.writeFileSync('fancyData.json', JSON.stringify(newData));


