// const http = require("http"); //ye node mein already installed hota hai
// const { url } = require("inspector");

// const server = http.createServer((req , res) => { //jb bhi server ko access krenge to ek function call hoga
//     if(req.url === "/about") { //req.url mtlb "localhost:300" ke baad kyaa likha hai like localhost:3000/about {route}
//         res.end("The about page");//iss url prr ye text display ho jayega  
//     }

//     if(req.url === "/profile") {
//         res.end("The profile page")
//     }
    
//     if(req.url === "/") {
//         res.end("The home page")
//     }
// });

// server.listen(3000);//server tb hi kaam krega jb usko listen krenge

//THE ABOVE METHOD IS NOT USED FOR PRODUCTION INSTEAD EXPRESS IS USED FOR PRODUCTION

const express = require("express"); //EXPRESS EK PACKED TOOL BOX HAI
const app = express(); //ISS LINE KI MADAD SE HMLOGO NE USKO UNPACK KRR DIY HAI AND SAARE CHEEZE JO USKE ANDAR HAI ISKE THROUGH USE KRR LETE HAI

//EXPRESS BHI HTTP KA HI USE KRTA HAI

app.set("view engine" , "ejs");//TO RENDER HTML THROUGH BACKEND WE USE ejs {Create a new folder views to save ejs files}

app.get("/" , (req , res)=> { //IF ELSE LAGANE KE JAGAH WE CAN USE THESE
    // res.send("The home page"); //res.send === res.end
    res.render("index"); //JO FILE JIS ROUTE PRR SHOW KRNI HAI USKO WHAA RENDER KRRDO
})

app.get("/about" , (req , res)=> { //IF ELSE LAGANE KE JAGAH WE CAN USE THESE
    res.send("The about page"); //res.send === res.end
})

app.get("/profile" , (req , res)=> { //IF ELSE LAGANE KE JAGAH WE CAN USE THESE
    res.send("The profile page"); //res.send === res.end
})


app.listen(3000);

