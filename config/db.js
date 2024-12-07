const mongoose = require("mongoose");

const connectToDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log(error)
    })

}
module.exports = connectToDB;    