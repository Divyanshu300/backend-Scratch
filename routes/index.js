const express = require("express");
const router = express.Router();
const upload = require("../config/multer");


router.get("/home" , (req , res) => {
    res.render("home");
})

router.post("/upload" , upload.single("file") , (req , res) => {
    console.log(req.file);
    res.send(req.file);
})

module.exports = router;