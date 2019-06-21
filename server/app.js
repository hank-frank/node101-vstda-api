const express = require('express');
const morgan = require('morgan');

const fs = require('fs');
const output = fs.createWriteStream('./stdout.log');
const errorOutput = fs.createWriteStream('./stderr.log');
const { Console } = require('console');
const logger = new Console({ stdout: output, stderr: errorOutput });

const app = express();
// add your code here
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
    for (let i = 0; i < initialData.length; i++) {   //Writing a for loop to look through the array, will nest if statment to check toDoItems value, compare that to :number in /route, if it matches return that object. 
        if (initialData['todoItemId'] = :number) { //this line is incorrect syntax. 
            return initialData[i]; 
        };
    };
    
    res.status(200).send(initialData[i]);
});

app.post('/api/TodoItems/', (req, res) => {
    res.status(200),send(initialData[]);
});

module.exports = app;
