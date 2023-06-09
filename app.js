const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");


const homestuff = "The saved responses are as follows";
const aboutstuff = "There is usage of nodeJS, DJango, CSS, HTML";
const contactstuff = "Vasu Mittal \n BITS Pilani";

const app = express();

mongoose.connect("mongodb://localhost:27017/blogDB");

const postSchema = {
  title: String,
  content: String
}

const Post = mongoose.model("Post", postSchema);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) { 
  Post.find({}, function (err, posts) { 
    if(!err){
      res.render("home", {
        startContent: homestuff,
        posts: posts
      });
    }
   });
 })

app.get("/about", function (req, res) { 
  res.render("about", {aboutContent : aboutstuff});
 })
 
 app.get("/contact", function (req, res) { 
  res.render("contact", {contactContent : contactstuff});
 })
 
 app.get("/delete", function(req, res){
  res.render("delete");
 }) 
 
 app.get("/update", function(req, res){
  res.render("update");
 })
 app.get("/compose", function (req, res) { 
  res.render("compose");
 })

 app.post("/compose", function (req, res) { 

  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postContent
  });

  post.save(function (err) { 
    if(!err){
      res.redirect("/");
    }
   });
  })



  app.post("/delete", function(req,res){
    
    const DelId = req.body;
    const id = Object.keys(DelId);
    id.forEach((i) =>   Post.findOneAndDelete({_id: id},function(err, mes){
      if(!err){
        
        console.log(mes);
        res.redirect("/");
        
      }
      else{
        console.log(err);
      }
    }));

  
  })




app.get("/posts/:postId", function (req, res) { 
  const reqPostId = req.params.postId;

  Post.findOne({_id: reqPostId}, function (err, post) { 
    if (!err){
      res.render("post", {
        title: post.title,
        content: post.content
      })
    }
   })


  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
