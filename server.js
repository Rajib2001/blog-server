import express from "express"
import Connection from "./database/db.js";
import dotenv from "dotenv"
import Router from "./routes/route.js";
// import path  from "path";


import cors from "cors"
import bodyParser from "body-parser";


dotenv.config();

const app=express()
app.use(cors());
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))

app.use("/",Router);

// app.get("/",(req,res)=>{
//     app.use(express.static(path.resolve(__dirname,"client","build")));
//     res.sendFile(path.resolve(__dirname,"client","build","index.html"))
// })

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static("client/build"))
// }




const PORT=process.env.PORT || 8001;

app.listen(PORT ,()=>{
    console.log(`Server is running on port ${PORT} Sucessfully.`)
})

// const USERNAME=process.env.DB_USERNAME
// const PASSWORD=process.env.DB_PASSWORD

const URL=process.env.MONGODB_URI  


Connection(URL);