require("dotenv").config();
// console.log(process.env.NODE_ENV);
const express = require("express");
const app = express();
const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
const cookieParser =require("cookie-parser");
const cors = require("cors");
const path = require("path")

const corsOptions = require("./config/corsOptions")
const PORT = process.env.PORT || 5000;

connectDB()

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())

// route

app.use("/", express.static(path.join(__dirname,"public")))//server will use the static fill in this way

app.use("/" , require("./routes/root"));
app.use("/auth" , require("./routes/authRoutes"));//second route 
app.use("/users", require("./routes/userRoutes"));//to test the refresh-access-token


app.all("*" , (req, res)=>{
    res.status(404)
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname, "views", "404.html"))

    }else if(req.accepts("json")){
        res.json({message: "404 Not Found"});
    }else{
        res.type("txt").send("404 Not Found")

    }
})
mongoose.connection.once("open", ()=>{
    console.log("connected to MongoDB");
    app.listen(PORT , ()=> {
        console.log(`server running on port ${PORT}`);
    
    });
});
mongoose.connection.on("error", (err) =>{
    console.log(err);
})
