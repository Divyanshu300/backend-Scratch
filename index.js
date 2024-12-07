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
const morgan = require("morgan");
const app = express(); //ISS LINE KI MADAD SE HMLOGO NE USKO UNPACK KRR DIY HAI AND SAARE CHEEZE JO USKE ANDAR HAI ISKE THROUGH USE KRR LETE HAI
//EXPRESS BHI HTTP KA HI USE KRTA HAI
const userModel = require("./models/user");
const dbConnection = require("./config/db")


app.set("view engine" , "ejs");//TO RENDER HTML THROUGH BACKEND WE USE ejs {Create a new folder views to save ejs files}

//KUCH BHI REQ AATI HAI HMAARE SERVER PRR TOH WOH KISI SPECIFIC ROUTE PR JAANE SE PEHLE ISS FUNCTION SE JAAYE
    //BUILTIN MIDDLEWARE
    //CUSTOM MIDDLEWARE 
    //THIRD PARTY MIDDLEWARE
//MIDDLEWARE HRR ROUTE KE LIYE CHALTA HAI BUT AGAR HMM CHAAHE TOH CUSTOM WAALE KO SPECIFIC ROUTE KE LIYE USE KRR SKTE HAI 
app.use((req , res , next) => {
    console.log("This is middleware")
    const a = 3;
    const b = 5;
    console.log(a + b);

    return next();//AGAR YE NHI LIKHA TOH NORMAL FLOW OF REQ NHI CHALEGA {URL WAALA FUCTION NHI CHAL PAYEGA} INSTEAD PAGE KO RES MILAA NHI TOH WOH USI KA WAITKRTA REH JAYEGA
});

//THIRD PARTY MIDDLE WARE
app.use(morgan('dev'))//YE HME BTAATA HAI KI KON SI REQ AAYI THI , USKA RESPONSE CODE KYAA THA , AND KITNE TIME MEIN USKO RESPONSE MILAA THA

//YE DONO MIDDLEWARE USE KRKE HMM req.body MEIN JO DATA AAYA HAI USKO READ KRR SKENGE 
app.use(express.json());
app.use(express.urlencoded({extended : true})); 

//TO LINK CSS OR ANY OTHER FILE THROUGH BACKEND
app.use(express.static("public"));//USS FOLDER KA NAAM DEDO JISKO HRR JAGAH SE DIRECTLY ACCESS KRR SKE

//SPECIFIC CUSTOM MIDDLEWARFE
// app.get("/" , 
//     (req , res , next) => {
//         const a = 3;
//         const b = 5;
//         console.log(a + b);
//         next();    
//     } , 
//     (req , res)=> { //IF ELSE LAGANE KE JAGAH WE CAN USE THESE
//         // res.send("The home page"); //res.send === res.end
//         res.render("index"); //JO FILE JIS ROUTE PRR SHOW KRNI HAI USKO WHAA RENDER KRRDO
//     }
// )

app.get("/" , (req , res)=> { //IF ELSE LAGANE KE JAGAH WE CAN USE THESE
    res.render("index"); //JO FILE JIS ROUTE PRR SHOW KRNI HAI USKO WHAA RENDER KRRDO
})

app.get("/about" , (req , res)=> { //IF ELSE LAGANE KE JAGAH WE CAN USE THESE
    res.send("The about page"); //res.send === res.end
})

app.get("/profile" , (req , res)=> { //IF ELSE LAGANE KE JAGAH WE CAN USE THESE
    res.send("The profile page"); //res.send === res.end
})

app.post("/get-form-data" , (req , res)=> {
    //HAMESHA INPUT TAG MEIN name ATTRIBUTE KA USE KRNA WRA DATA FRONTEND SE BACKEND AYEGA JAROOR BUT WOH DISPLAY NHI HOGA BECOZ OF NO NAME
    // console.log(req.query);//PRODUCTION MEIN DATA req.query MEIN NHI AYEGA {GET request ke liye we use req.query}
    console.log(req.body);
    res.send("Form data received"); 
})

app.post("/register" , async(req , res) => {
    const {username , email , password} = req.body;
    
    const newUser = await userModel.create({
        username : username,
        email : email,
        password : password
    })

    res.send(newUser);
})




app.listen(3000);

