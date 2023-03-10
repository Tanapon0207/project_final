const express = require('express')
const bodyParse = require("body-parser")
const mongoose = require("mongoose")
const { request, response } = require('express')

const app = express()

app.use(bodyParse.json())
app.use(express.static('Front_end'))
app.use(bodyParse.urlencoded({
    extended:true
}))


mongoose.connect("mongodb://0.0.0.0:27017/db_project",{
    useNewUrlParser:true,
    useUnifiedTopology:true

    
})



var db = mongoose.connection;

db.on('error',()=>console.log('error in connecting database'));
db.once('open',()=>console.log("Connected to Database"));

app.get("/",(req,res)=>{
    return res.redirect("index.html");
}).listen(3001);

app.post("/login",(request,response)=>{
    try{
        const username = request.body.username;
        const password = request.body.password;

      const user=  db.collection("admin").findOne({username:username},(err,
            res)=>{

                if (res === null){
                    console.log("IN");
                }
                else if (err) throw err;
                if (res.password === password){

                    console.log("login");
                    return response.redirect("graph.html")
                }
            })

        console.log(`${username} and ${password}`);

    }catch(error){

        console.log("Invalid information");

    }
})

