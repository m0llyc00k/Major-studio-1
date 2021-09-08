/*
  Exercise 6
  DOM manipulation with vanilla JS
*/

// Task
// What does DOM stand for? Document Object Model

// Task
// Open the file index.html in AWS Cloud9. Click "Preview" > "Preview File index.html". (Note that you can open it in a new window). What do you see?
// Pink vertical rectangle 

// Task
// Delete the div with the class rectangle from index.html and refresh the preview.
//The rectangle disappers

// Task
// What does the following code do?
const viz = document.body.querySelector(".viz"); //Finds a specific element with specific values of an attribute - selects html elements
const button = document.body.querySelector("#button");
 

console.log(viz, viz.children); //calls all of the parent and child elements of the element viz

// creates new child element in 'viz'
const addChildToViz = () => {
  const newChild = document.createElement("div");
  newChild.className = "rectangle"; 
  newChild.style.height = Math.random() * 100 + "px"; 
  newChild.style.width = Math.random() * 100 + "px"; 
  viz.appendChild(newChild); 
}; 


function drawIrisData() {
  window
    .fetch("./iris_json.json")
    .then(data => data.json())
    .then(data => {
      data.forEach(i => {
        addChildToViz(i.petallength, i.petalwidth);
      });
      console.log(data);
    });
}

button.addEventListener("click", drawIrisData);




// function drawIrisData() {
//   window
//     .fetch("./iris_json.json")
//     .then(data => data.json())
//     .then(data => {
//       console.log(data);
//     });
// }

// drawIrisData();


