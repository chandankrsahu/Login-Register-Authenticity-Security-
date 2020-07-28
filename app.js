const express=require("express");
const bodyParser=require("body-parser");
const ejs =require("ejs");

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/userDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const userSchema={
	email:String,
	password:String
};

const User=mongoose.model("User",userSchema);

app.get("/",function(req,res){
	res.render("home");
});

app.get("/login",function(req,res){
	res.render("login");
});
app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
	const x=req.body.username;
	const y=req.body.password;

	const newuser = new User({
		email:x,password:y
	});

	newuser.save(function(err){
		if(err)
			console.log(err);
		else{
			console.log("Successfully registered new user");
			res.render("secrets");
		} 
	});
});

app.post("/login",function(req,res){
	const x=req.body.username;
	const y=req.body.password;

	User.findOne({email:x},function(err,user){
		if(err)
			console.log(err);
		else {
			if(y===user.password)
			{
				res.render("secrets");
				console.log("Successfully loged in");
			}
			else console.log("UFF,wrong password");
		}
	});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
