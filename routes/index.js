const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const auth = require("../middlewares/auth");
const fileModel = require("../models/file");


router.get("/home" , auth , (req , res) => {
    res.render("home");
})

router.post("/upload" , auth , upload.single("file") , async(req , res) => {
    const newFile = await fileModel.create({
        path : req.file.path,
        originalname : req.file.originalname,
        user : req.user.userId
    });

    res.json(newFile);
})

module.exports = router;