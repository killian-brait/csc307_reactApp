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