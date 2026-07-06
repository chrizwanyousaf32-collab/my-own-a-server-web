import express from "express";

const app = express();

app.get("/",(req,res)=> {
    res.json("I AM IBRAHIM ")
})
 
app.get("/profile/:username",(req,res)=>{
    res.json(req.params)
})

const port = process.env.PORT || 3000;
app.listen (port, () =>{
    console.log("server is rady")
});