// Smithsonian API example code
// check full API documentation here: https://edan.si.edu/openaccess/apidocs/


// put your API key here;
const apiKey = "g41p5R2gTJACnqmLuuBs0bVwYfV4L6domSyjDHMa";  

// Access to individual objects by ID
const objectBaseURL = "https://api.si.edu/openaccess/api/v1.0/content/";

var object = {};

//fetches content based on id of an object.

function fetchContentDataById(id) {
  let url = objectBaseURL + id + "?api_key="+apiKey;
  window
  .fetch(url)
  .then(res => res.json())
  .then(data => {
    object = data;
    console.log("Here's the content data of the specified object:", object);
   
  })
  
  .catch(error => {
    console.log(error);
  });
}

fetchContentDataById("edanmdm:saam_1983.69");





// Task 1: Find a different object on https://collections.si.edu/search/ and retrieve the data with the code above
// Make sure to check the box "Only return results with CC0 media" when searching
// Task 2: Write the result into a variable and explore different variables through the Console

