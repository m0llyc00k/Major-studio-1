/*
String documentation:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String

Example by Dan Shiffman:
https://www.youtube.com/watch?v=DcoAjEZYies

*/

function getInput() {
  let input = document.getElementById("myInput").value;
  processText(input)
}

function processText(input) {

  //output just the text:
    addText("The text is: " + input);
  
  // Task: What's the text length?
    addText("The text is: " + input.length);

  // Task: What's the fifth character in the text?
    addText("The text is: " + input.charAt(5));

  // Task: Output the last 10 characters of the text
      addText("The text is: " + input.substring(input.length - 10));

  // Task: What's the second word in the text?
      addText("The text is: " + input.split(' ').slice(1, 2));

  // where in the text does the word "rainbows" appear?
      addText("The text is: " + input.split(' ').indexOf('rainbows'));


  // replace the word "love" with another verb
      addText("The text is: " + input.replaceAll('love', 'hate'));

  // how many times does the word "love" appear
      addText("The text is: " + (input.split('love').length -1));

  // count how many times each letter appears within the text and create a visualization of it
        

      addText("The text is: " + (input.toLowerCase().split('')))

}

function charCount(str) {
var result = {};
str.replace(/\S/g, function(l){result[l] = (isNaN(result[l]) ? 1 : result[l] + 1);});
return result;
}
console.log(charCount("I love rainbows and I love kittens"));



// two functions that actually write to the DOM. We're using D3 here but could also use vanilla javascript

function addText(text){
 d3.select('#app')
 .append('p')
 .text(text);
}


function addLetterWithSize(letter, textSize){
  d3.select('#concretePoetry')
  .append('span')
  
  .text(letter)
  .style("font-size", textSize+"px")
  ;
}

 
