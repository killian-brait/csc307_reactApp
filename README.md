# csc307_reactApp

Building first web application with react and express (js)


### Backend testing with curl:
curl -X POST
     -H "Content-Type: application/json" 
     -d '{"id": "qw33", "name": "Boss Baby", "job": "Zookeeper"}' 
     http://localhost:8000/users


### If `npm start` isn't working:
1. Try running `npm install` (this probably won't fix it, but is worth a shot)
2. Delete ./react_frontend/node_modules AND ./react_frontend/package-lock.json
3. Run `npm install` again

### Mongo DB Commands (Local):
1. Start the mongoDB service: ```brew services start mongodb-community@6.0```
2. Stop the mongoDB service: ```brew services stop mongodb-community@6.0```
3. Verify that the service is running: ```brew services list```
4. Connect and use mongoDB: ```mongosh```

### Mongosh Commands
1. Show databases (from inside the mongo shell): ```show dbs``` 
2. Insert a new user: ```db.users_list.insertOne({"name":"Killian", "job":"Student"})```
3. Fetch all users: ```db.users_list.find()```
4. Fetch a specific user by name: ```db.users_list.find( { name : "Killian" } )```
5. Fetch a specific user by job: ```db.users_list.find( {job : "Janitor" } )```
6. Fetch users by name and job: ```db.users_list.find( { name : "Killian", job : "Student" } )```
7. Fetch a specific user by id: ```db.users_list.find( { _id: ObjectId("644725af46b0563dfc78969f") } )```
8. Delete one user by id: ```db.users_list.deleteOne( { _id: ObjectId("644726ee46b0563dfc7896a0") } )```
9. Update both fields of one user using id: ```db.users_list.updateOne( { _id: ObjectId("644725af46b0563dfc78969f") }, { $set: { name : "Killian", job : "Student" } } )```
10. Create a new collection: ```db.gift_cards.insertOne( { balance: 50, type: "Tech", company: "Apple" } )```
11. List all collections in db: ```show collections```