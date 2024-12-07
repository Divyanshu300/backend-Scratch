const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://pathakdivyanshu800:Divyanshu9555@cluster0.lvmtpyh.mongodb.net/backend-scratch")
.then(() => {
    console.log("Connected to database");
})
.catch((error) => {
    console.log(error)
})

module.exports = connection;    