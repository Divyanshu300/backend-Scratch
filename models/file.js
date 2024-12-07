const mongoose = require("mongoose");


const fileSchema = new mongoose.Schema({
    path : {
        type : String,
        required : [true , "Path is required"],
    },
    originalname : {
        type : String,
        required : [true , "Original name is required"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : [true , "User is required"]
    }
});

module.exports = fileSchema;

