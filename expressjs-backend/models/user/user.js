const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        job: {
            type: String,
            required: true,
            trim: true,
            // Q: what does value refer to in the following code?
            // A: value refers to the value of the job field
            validate(value) {
                if (value.length < 2) {
                    throw new Error("Invalid job, must be at least 2 characters.");
                }
            }
        }
    }, 
    { collection: "users_list" } 
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
