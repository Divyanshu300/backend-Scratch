const jwt = require("jsonwebtoken");

function auth(req , res , next) {
    const token = req.cookies.token;

    if(!token) {
        return res.status(401).json({
            message : "Unauthorized",
        })
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);//AGAR TOKEN SAME NHI HUA {TEMPERED} TOH CATCH PRR CHALAA JAYEGA 
        req.user = decoded;//AGAR TOKEN SAME HAI TOH req.user MEIN USER KO SAVE KRR DO
        return next();
    }
    catch(error) {
        return res.status(401).json({
            message : "Unauthorized",
        })
    }
}

module.exports = auth;