const express = require("express");
const router = express.Router();
const {body , validationResult} = require("express-validator");//USED FOR DATA VALIDATION IN BACKEND
const userModel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


router.get("/test" , (req , res) => {
    res.send("User Test Route")
});

router.get("/register" , (req , res) => {
    res.render("register");
});

router.post("/register" ,
    body("email").trim().isEmail().isLength({min : 13}),//YE VALIDATION KE LIYE USE HOTE HAI 
    body("username").trim().isLength({min : 3}), 
    body("password").trim().isLength({min : 5}),

    async(req , res) => {
        const errors = validationResult(req);//MAIN ERRORS ISME AATE HAI

        if(!errors.isEmpty()) {
            return res.status(400).json({
                errors : errors.array(),
                message : "Invalid Data"
            })
        }
        
        const { email , username , password } = req.body;

        const hashedPassword = await bcrypt.hash(password , 10);
        
        const newUser = await userModel.create({
            username : username,
            email : email,
            password : hashedPassword,
        });

        res.send(newUser);
    }
);


module.exports = router;