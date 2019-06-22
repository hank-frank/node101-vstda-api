const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');


const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const { Console } = require('console');
const logger = new Console({ stdout: output, stderr: errorOutput });

const app = express();
// add your code here
const jsonParser = bodyParser.json(); 

let initialData = [
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

app.get('/', (req, res) => {
    var status = {
        status: 'ok',
    }
        res.status(200).send(status); 
});

app.get('/api/TodoItems', (req, res) => {
    res.status(200).send(initialData);
});

app.get('/api/TodoItems/:number', (req, res) => {
    var url = req.url; 
    logger.log(url);
    var numberFromPath = url.substring(url.lastIndexOf('/') + 1);
    var index;
    for (let i = 0; i < initialData.length; i++) { 
        // for (var value in initialData[i]) {  //Writing a for loop to look through the array, will nest if statment to check toDoItems value, compare that to :number in /route, if it matches return that object. 
            if (initialData[i]["todoItemId"] == numberFromPath) { 
                var toDoVal = initialData[i]["todoItemId"];
                // logger.log(initialData[i][key]);
                logger.log(toDoVal);
                // res.status(200).send(initialData[i]);
                // index.push(initialData[i]);
                index = i; 
             };
        // };
    }; 
    logger.log(index);
    res.status(200).send(initialData[index]);
});

// app.post('/api/TodoItems/', (req, res) => {
//     // res.status(201).send(req.body);
//     // let newItem = req.body; 
//     let newItem = {
//         todoItemId: 0,
//         name: "The Greatest Item of All Time",
//         priority: 4,
//         completed: false
//       };
   
//     for (let i = 0; i < initialData.length; i++) {
//             if (initialData[i]["todoItemId"] == newItem.todoItemId) {
//             initialData[i] = newItem;
//             res.status(201).send(req.body);
//         }
//     }
//     initialData.push(req.body);
//     //   res.status(201).send(req.body);
//     });
app.post("/api/TodoItems/", (req, res) => {
    let newItem = {
      todoItemId: 1,
      name: "The Greatest Item of All Time",
      priority: 4,
      completed: false
    };
  
    for (let i = 0; i < initialData.length; i++) {
      if (initialData[i]["todoItemId"] == newItem["todoItemId"]) {
        initialData[i] = newItem;
        res.status(201).send(newItem);
      }
    }
    initialData.push(newItem);
    res.status(201).send(newItem);
  });

    app.delete("/api/TodoItems/:number", (req, res) => {
        let url = req.url;
        let numberFromPath = url.substring(url.lastIndexOf('/') + 1);
        for (let i = 0; i < initialData.length; i++) {
          if (initialData[i]["todoItemId"] == numberFromPath) {
            let deletedFile = initialData[i];
            initialData.splice(i, 1);
            res.send(deletedFile);
          }
        }
      });




module.exports = app;
