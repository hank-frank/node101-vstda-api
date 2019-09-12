const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

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
    var numberFromPath = url.substring(url.lastIndexOf('/') + 1); 
    var index;
    for (let i = 0; i < initialData.length; i++) { 
            if (initialData[i]["todoItemId"] == numberFromPath) { 
                var toDoVal = initialData[i]["todoItemId"]; 
                logger.log(toDoVal);
                index = i;
             };
    }; 
    res.status(200).send(initialData[index]);
});

app.post("/api/TodoItems/", (req, res) => {
  let newItem = { 
    todoItemId: 0,
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
