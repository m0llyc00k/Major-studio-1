// Smithsonian API example code
// check API documentation for search here: http://edan.si.edu/openaccess/apidocs/#api-search-search
// Using this data set https://collections.si.edu/search/results.htm?q=Flowers&view=grid&fq=data_source%3A%22Cooper+Hewitt%2C+Smithsonian+Design+Museum%22&fq=online_media_type%3A%22Images%22&media.CC0=true&fq=object_type:%22Embroidery+%28visual+works%29%22

// put your API key here;
const apiKey = "g41p5R2gTJACnqmLuuBs0bVwYfV4L6domSyjDHMa";  

// search base URL
const searchBaseURL = "https://api.si.edu/openaccess/api/v1.0/search";

// constructing the initial search query
// const search =  'mask AND unit_code:"FSG"';
const search =  `Memorabilia and Ephemera-Political and Activist Ephemera`;


// array that we will write into
let myArray = [];


// string that will hold the stringified JSON data
let jsonString = '';

// search: fetches an array of terms based on term category
function fetchSearchData(searchTerm) {
    let url = searchBaseURL + "?api_key=" + apiKey + "&q=" + searchTerm;
    console.log(url);
    window
    .fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      
      // constructing search queries to get all the rows of data
      // you can change the page size
      let pageSize = 1000;
      let numberOfQueries = Math.ceil(data.response.rowCount / pageSize);
      console.log(numberOfQueries)
      for(let i = 0; i < numberOfQueries; i++) {
        // making sure that our last query calls for the exact number of rows
        if (i == (numberOfQueries - 1)) {
          searchAllURL = url + `&start=${i * pageSize}&rows=${data.response.rowCount - (i * pageSize)}`;
        } else {
          searchAllURL = url + `&start=${i * pageSize}&rows=${pageSize}`;
        }
        console.log(searchAllURL)
        fetchAllData(searchAllURL);
      
      }
    })
    .catch(error => {
      console.log(error);
    })
}

// fetching all the data listed under our search and pushing them all into our custom array
function fetchAllData(url) {
  window
  .fetch(url)
  .then(res => res.json())
  .then(data => {
    console.log(data)

    data.response.rows.forEach(function(n) {
      addObject(n);
    });
    jsonString += JSON.stringify(myArray);
    console.log(myArray);
  })
  .catch(error => {
    console.log(error)
  })

}

// create your own array with just the data you need
function addObject(objectData) {  
  
  // we've encountered that some places have data others don't
  let currentPlace = "";
  if(objectData.content.indexedStructured.place) {
    currentPlace = objectData.content.indexedStructured.place[0];
  }
    let currentDate = "";
  if(objectData.content.indexedStructured.date) {
    currentDate = objectData.content.indexedStructured.date[0];
  }
  let currentTopic = "";
  if(objectData.content.indexedStructured.topic) {
    currentTopic = objectData.content.indexedStructured.topic;
   }
  // let subTopic = ""; 
  // for (var i = 0; i < currentTopic.length; i++) {
  //       subTopic += currentTopic[i] 
  // }
  
      let currentType = "";
  if(objectData.content.indexedStructured.object_type) {
    currentType = objectData.content.indexedStructured.object_type[0];
  }
        let currentDescription = "";
  if(objectData.content.freetext.notes) {
    currentDescription = objectData.content.freetext.notes[0]["content"];
  }
  myArray.push({
    id: objectData.id,
    title: objectData.title,
    link: objectData.content.descriptiveNonRepeating.record_link,
    type: currentType,
    topic: currentTopic,
    // subtopic: subTopic,
    date: currentDate,
    place: currentPlace,
    Description: currentDescription
  })
// // create our counter object
// let frequencyCount = {};
// function count(data) {
//   // iterating through our data
//   data.forEach(data => {
//     // javascript objects have key: value pairs
//     // we're going to set the key to be the material type
//     // and value of that key to be the counter
//     // ex) bronze: 1231
//     // getting all the'keys'in our frequency counter
//     // at first there will be no keys
//     let keys = Object.keys(frequencyCount)
//     // checking if the current material of our data is in keys
//     // if not, jump to the else statement and create a new key and set the counter to 1
//     // if there is a key that corresponds to our material, add 1 to our counter
//     for(i=0;i < data.currentTopic.length;i++){
//       if(keys.includes(data.currentTopic[i])) {
//         frequencyCount[data.currentTopic[i]] += 1;
//       } else {
//         frequencyCount[data.currentTopic[i]] = 1;
//       }
//   }
//   });
//   console.log(frequencyCount)


}


fetchSearchData(search);



//---------------------------UNIT CODES------------------------------
// ACAH: Archives Center, National Museum of American History
// ACM: Anacostia Community Museum
// CFCHFOLKLIFE: Smithsonian Center for Folklife and Cultural Heritage
// CHNDM: Cooper-Hewitt, National Design Museum
// FBR: Smithsonian Field Book Project
// FSA: Freer Gallery of Art and Arthur M. Sackler Gallery Archives
// FSG: Freer Gallery of Art and Arthur M. Sackler Gallery
// HAC: Smithsonian Gardens
// HMSG: Hirshhorn Museum and Sculpture Garden
// HSFA: Human Studies Film Archives
// NAA: National Anthropological Archives
// NASM: National Air and Space Museum
// NMAAHC: National Museum of African American History and Culture
// NMAfA: Smithsonian National Museum of African Art
// NMAH: Smithsonian National Museum of American History
// NMAI: National Museum of the American Indian
// NMNHANTHRO: NMNH - Anthropology Dept.
// NMNHBIRDS: NMNH - Vertebrate Zoology - Birds Division
// NMNHBOTANY: NMNH - Botany Dept.
// NMNHEDUCATION: NMNH - Education & Outreach
// NMNHENTO: NMNH - Entomology Dept.
// NMNHFISHES: NMNH - Vertebrate Zoology - Fishes Division
// NMNHHERPS: NMNH - Vertebrate Zoology - Herpetology Division
// NMNHINV: NMNH - Invertebrate Zoology Dept.
// NMNHMAMMALS: NMNH - Vertebrate Zoology - Mammals Division
// NMNHMINSCI: NMNH - Mineral Sciences Dept.
// NMNHPALEO: NMNH - Paleobiology Dept.
// NPG: National Portrait Gallery
// NPM: National Postal Museum
// SAAM: Smithsonian American Art Museum
// SI: Smithsonian Institution, Digitization Program Office
// SIA: Smithsonian Institution Archives
// SIL: Smithsonian Libraries