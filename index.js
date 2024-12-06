const http = require("http"); //ye node mein already installed hota hai
const { url } = require("inspector");

const server = http.createServer((req , res) => { //jb bhi server ko access krenge to ek function call hoga
    if(req.url === "/about") { //req.url mtlb "localhost:300" ke baad kyaa likha hai like localhost:3000/about {route}
        res.end("The about page");//iss url prr ye text display ho jayega  
    }

    if(req.url === "/profile") {
        res.end("The profile page")
    }
    
    if(req.url === "/") {
        res.end("The home page")
    }
});

server.listen(3000);//server tb hi kaam krega jb usko listen krenge

