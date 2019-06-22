const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser'); //including a bodyparser. did not end up being necesary at this stage but why take it our if we're coming back to this. 


const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const { Console } = require('console');
const logger = new Console({ stdout: output, stderr: errorOutput });  //This is console logger to the stdout.log file. takes format logger.log()

const app = express();
// add your code here
const jsonParser = bodyParser.json(); //to be able to use body-parser

let initialData = [ //initial array of sample data. 
    {
      todoItemId: 0,
      name: 'an item',
      priority: 3,
      completed: false
    },
    {
      todoItemId: 1,
      name: 'another item',
      priority: 2,
      completed: false
    },
    {
      todoItemId: 2,
      name: 'a done item',
      priority: 1,
      completed: true
    }
];
//Instruction: Respond with a generic object.
app.get('/', (req, res) => {
    var status = {
        status: 'ok',
    }
        res.status(200).send(status); //just sending "ok" with status code 200
});
//Instruction: Respond with all items in the dataset.
app.get('/api/TodoItems', (req, res) => {
    res.status(200).send(initialData); //seding full array of sample data above with 200 status
});
//Instruction:Use a route parameter to respond with a single item with a matching todoItemId.
app.get('/api/TodoItems/:number', (req, res) => {
    var url = req.url; //grabbing the requests url
    // logger.log(url);
    var numberFromPath = url.substring(url.lastIndexOf('/') + 1); //taking the last char off of the end of that url, In this case being the number we need from it to compare it to the todoitem #. 
    var index;
    for (let i = 0; i < initialData.length; i++) { 
        // for (var value in initialData[i]) {  //Writing a for loop to look through the array, will nest if statment to check toDoItems value, compare that to :number in /route, if it matches return that object. 
            if (initialData[i]["todoItemId"] == numberFromPath) { //compare the todoItemId number for the index positions id to the number from ther URL, if they match... 
                var toDoVal = initialData[i]["todoItemId"]; // this var is holding the number of the 
                logger.log(toDoVal);
                index = i; //takign the index position as a number to send that to a less local var which can allow the res. below to not run into any errors. 
             };
        // };
    }; 
    logger.log(index);
    res.status(200).send(initialData[index]); //sending the response with the content being the obj from the array above, index of the number pushed out of the for loop above. 
});

//Instructions: Add an item to the dataset. If there is already an item with a matching todoItemId, overwrite the existing item.
app.post("/api/TodoItems/", (req, res) => {
  let newItem = { // my new item, needs itemID to be 0 or test won't pass. 
    todoItemId: 0,
    name: "The Greatest Item of All Time",
    priority: 4,
    completed: false
  };

  for (let i = 0; i < initialData.length; i++) { //iterate through the array, 
    if (initialData[i]["todoItemId"] == newItem["todoItemId"]) { //if the new item is already an item in my array
      initialData[i] = newItem; // overwrite the new item with that existing item. 
      res.status(201).send(newItem); //send that .
    }
  }
  initialData.push(newItem); //else if its not in there push the new item as it is into the array. 
  res.status(201).send(newItem); //send the new item. 
});
// Instructions: Use a route parameter to remove the item with a matching todoItemId from the dataset. Respond to the request with the deleted item.
  app.delete("/api/TodoItems/:number", (req, res) => {
      let url = req.url; //grab the req URL
      let numberFromPath = url.substring(url.lastIndexOf('/') + 1); //get the value of the last number of it, 
      for (let i = 0; i < initialData.length; i++) { //iterate through my array of items
        if (initialData[i]["todoItemId"] == numberFromPath) { //if the number in the URL == the to do item id: 
          let deletedFile = initialData[i]; //delete that items index position. 
          initialData.splice(i, 1); //removes the current index's item, item being the object in my array contianing the entire to do object. 
          res.send(deletedFile); //res.sending the the file that was deleted. 
        }
      }
    });

module.exports = app;
