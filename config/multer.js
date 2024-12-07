const multer = require("multer");
const firebaseStorage = require("multer-firebase-storage");
const firebase = require("./firebase");
const serviceAccount = require("../mydrive-ae909-firebase-adminsdk-kczpf-64bfac964c.json");

const storage = firebaseStorage({
    credentials : firebase.credential.cert(serviceAccount),
    bucketName : ""
})

const upload = multer({
    storage : storage,
});

module.exports = upload;