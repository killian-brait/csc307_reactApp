const express = require('express');
const cors = require('cors');

const userServices = require('./models/user/user-services');

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());


// --------------------------------------------------
// BASE ENDPOINT
// --------------------------------------------------
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// --------------------------------------------------
// USERS ENDPOINTS - doesn't access database
// --------------------------------------------------

// get user list & filter by name & filter by job
app.get('/users', async (req, res) => {
  const name = req.query['name'];
  const job = req.query['job'];
  try {
    const result = await userServices.getUsers(name, job);
    res.send({users_list: result});
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error.');
  }
});

// get specific user by Id or 404 error
app.get('/users/:id', async (req, res) => {
  const id = req.params.id; // this may not work, does it need to be req.params['id']? A: no, it works
  try {
    const result = await userServices.findUserById(id);
    if (result === undefined || result.length === 0) {
      res.status(404).send('Resource not found.');
    }
    else {
      res.send({users_list: result});
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error.');
  }
});

// create new user
app.post('/users', async (req, res) => {
  const userToAdd = req.body;
  try {
    const savedUser = await userServices.addUser(userToAdd);
    if (savedUser) {
      res.status(201).send(savedUser).end();
    } else {
      res.status(400).send('Bad Request.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error.');
  }
});

// delete a user by id
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await userServices.removeUserById(id);
    if (result) {
      res.status(204).end();
    } else {
      res.status(404).send('Resource not found.');
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error.');
  }
});


// --------------------------------------------------
// LISTEN ON PORT
// --------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); 


// delete a user by id
// app.delete('/users/:id', (req, res) => {
//   const {id} = req.params;
//   let userToRemove = findUserById(id);
//   if (userToRemove === undefined || userToRemove.length === 0) {
//     res.status(404).send("Resource not found.");
//   } else {
//       removeUser(userToRemove);
//       res.status(204).end();
//     }
// });




  