const mongoose = require('mongoose');
const userModel = require('./user');
mongoose.set("debug", true);

mongoose
    .connect("mongodb://localhost:27017/users", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .catch((error) => console.log(error));

// get users by name or job or both
async function getUsers(name, job) {
    let result;
    if (name === undefined && job === undefined) {
        result = await userModel.find();
    } else if (name && !job) {
        result = await findUserByName(name);
    } else if (!name && job) {
        result = await findUserByJob(job);
    } else if (name && job) {
        result = await findUserByNameJob(name, job);
    }
    return result;
}

// add a user
async function addUser(user) {
    try {
        const userToAdd = new userModel(user);
        const savedUser = await userToAdd.save();
        return savedUser;
    } catch (error) {
        console.log(error);
        return false;
    }
}


// --------------------------------------------------
// ID FUNCTIONS
// --------------------------------------------------
// find a user by id
async function findUserById(id) {
    try {
        return await userModel.findById(id);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

// remove a user (boolean  return)
// - use findByIdAndRemove(id) to remove a user
async function removeUserById(id) {
    try {
        await userModel.findByIdAndRemove(id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}


// --------------------------------------------------
// HELPER FUNCTIONS
// --------------------------------------------------
async function findUserByName(name) {
    return await userModel.find({name: name});
}

async function findUserByJob(job) {
    return await userModel.find({job: job});
}

async function findUserByNameJob(name, job) {
    return await userModel.find({name: name, job: job});
}


// --------------------------------------------------
// EXPORTS
// --------------------------------------------------
module.exports = {
    getUsers,
    findUserById,
    addUser,
    removeUserById,
};

