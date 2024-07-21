const express = require('express');
const app = express();
const path = require("path");
const userModel = require(`./models/user`)

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get("/", (req,res)=>{
    res.render("index");
})

app.get("/read",async (req,res)=>{
    let allUsers = await userModel.find();
    res.render("read",{users:allUsers});
   
})

app.post("/create",async (req,res)=>{
    let createdUser = await userModel.create({
        name: req.body.Name,
        email: req.body.Email,
        imageurl: req.body.Imageurl
    })
    res.redirect("read");
})

app.get("/delete/:id",async (req,res)=>{
    let deletedUser = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.get("/edit/:userid",async (req,res)=>{
    let user = await userModel.findOne({_id: req.params.userid});
    res.render("edit",{user:user});
})

app.post("/update/:userid",async (req,res)=>{
    await userModel.findOneAndUpdate({_id:req.params.userid},{name:req.body.Name,email:req.body.Email,imageurl:req.body.Imageurl},{new:true});
    res.redirect("/read");
})

// app.post("/update",async (req,res)=>{
//     let updatedUser = await userModel.findOneAndUpdate({})
// })


app.listen(5000);