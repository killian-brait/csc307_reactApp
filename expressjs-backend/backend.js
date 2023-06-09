const express = require('express');
const app = express();
const port = 8000;

// Static data
const users = {
  users_list: [
  ],
};

app.use(express.json());

// endpoints
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// get user list & filter by name & filter by job
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job == undefined) {
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else if (name != undefined && job != undefined) {
      let result = findUserByNameJob(name, job);
      result = {users_list: result};
      res.send(result);
    }
    else {
        res.send(users);
    }
});

// get specific user by Id or 404 error
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserById(id);
    if (result === undefined || result.length === 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

// create new user
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
    // if (error = validateData(userToAdd)) {
        
    // }
    // else {
    //     res.send(error);
    // }
});

// delete a user by id
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  let userToRemove = findUserById(id);
  if (userToRemove === undefined || userToRemove.length === 0)
    res.status(404).send("Resource not found.");
  else {
    removeUser(userToRemove);
    res.status(200).end();
  }
});

// helper functions
function addUser(user) {
    users['users_list'].push(user);
}

function removeUser(user) {
  const index = users['users_list'].indexOf(user);
  users['users_list'].splice(index, 1);
}

function validateData(user) {
    return true;
}

const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}

const findUserByNameJob = (name, job) => {
  return users['users_list'].filter( (user) => {
    if (user.name === name && user.job === job) return true;
    else return false;
  });
}

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
}); 

  