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

router.get("/login" , (req , res) => {
    res.render("login");
})

router.post("/login" , 
    body("username").trim().isLength({min : 3}),
    body("password").trim().isLength({min : 5}),
    async(req , res) => {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({
                error : errors.array(),
                message : "Invalid Details"
            });
        } 
        
        const {username , password} = req.body;

        const user = await userModel.findOne({
            username : username
        });

        if(!user) {
            return res.status(404).json({
                message : "username or password incorrect"
            })
        }

        const isMatch = await bcrypt.compare(password , user.password);

        if(!isMatch) {
            return res.status(400).json({
                message : "username or password incorrect"
            })
        }

        const token = jwt.sign({
                userId : user._id,
                email : user.email,
                username : user.username,
            },
            process.env.JWT_SECRET
        );

        //COOKIE USE KRNE KE LIYE cookie-parser KA USKE KRTE HAI 3rd PARTY MIDDLEWARE
        //BROWSER AGAR KUCH BHI REQUEST KRTA HAI SERVER SE TOH YE COOKIE USS REQUEST KE SAATH JATI HAI
        res.cookie("token" , token);//HMESHA TOKEN KO COOKIE MEIN SAVE KRTE HAI COOKIE ISSILIYE BNTI HAI
        res.send("Logged In");
    }
);

module.exports = router;