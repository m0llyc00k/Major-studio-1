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
  newChild.className = "rectangle"; //defines what element is
  newChild.style.height = Math.random() * 100 + "px"; // determines size of rectangle
  viz.appendChild(newChild); 
}; 

viz.addEventListener("click", addChildToViz); // creates new rectangle when you click

// Task
// Where can you see the results of the console.log below? How is it different from in previous exercises?

function drawIrisData() {
  window
    .fetch("./iris_json.json")
    .then(data => data.json())
    .then(data => {
      data.forEach(i => {
        addChildToViz(i.petallength);
      });
      console.log(data);
    });
}

drawIrisData();

// function drawIrisData() {
//   window
//     .fetch("./iris_json.json")
//     .then(data => data.json())
//     .then(data => {
//       console.log(data);
//     });
// }

// drawIrisData();

// Task
// Modify the code above to visualize the Iris dataset in the preview of index.html.
// Feel free to add additional CSS properties in index.html, or using JavaScript, as you see fit.
