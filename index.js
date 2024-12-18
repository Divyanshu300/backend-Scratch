const express = require("express");
const app = express();
require("dotenv").config();
const connectToDB = require("./config/db");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");
const cookieParser = require("cookie-parser");
connectToDB();

app.set("view engine" , "ejs");//EK FOLDER BNAA DO ISKE BAAD view KE NAAM SE 
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));

//YHAA PRR KOI BHI ROUTE NHI LIKHTE PRODUCTION MEIN
// app.get("/" , (req , res) => {
//     res.render("index")
// });

app.use("/" , indexRoutes);//THE ROUTE WILL START WITH /{WHATEVER ROUTE WE WANT TO USE}
app.use("/user" , userRoutes);//THE ROUTE WILL START WITH /user/{WHATEVER ROUTE WE WANT TO USE}

app.listen(3000 , () => {
    console.log("Server is running on port 3000")
});