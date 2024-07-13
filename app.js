const express = require('express');
const path = require('path');
const app = express();
const userModel = require("./models/user");
const user = require('./models/user');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.set("view engine","ejs");

app.get('/',(req,res)=>{
  res.render("index");
});


app.get("/read",async (req, res) => {
  let users = await userModel.find();
  res.render("read",{users});
});
//
app.get("/edit/:id", async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render("edit",{user});
});

app.post("/create",async (req,res)=>{
  let {name , email ,url}=req.body;
  let user = await userModel.create({
        name,
        email,
        url
      });
      res.redirect("/read");
});

app.post("/update/:id",async (req,res)=>{
  let {name,email,url}=req.body;
    await userModel.findOneAndUpdate({_id:req.params.id},{name,email,url},{new:true});
    res.redirect("/read");
})

app.get("/delete/:id",async (req,res)=>{
     await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
});

app.listen(3000);