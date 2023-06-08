//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
// const pp = require('popups');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutpageContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactpageContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

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
        startContent: homeStartingContent,
        posts: posts
      });
    }
   });
 })

app.get("/about", function (req, res) { 
  res.render("about", {aboutContent : aboutpageContent});
 })
 
 app.get("/contact", function (req, res) { 
  res.render("contact", {contactContent : contactpageContent});
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
    // const Deltitle = req.body.postToDelete;
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

  // posts.forEach(function (post) { 
  //   const storedTitle = _.lowerCase(post.title);
  //   if (reqTitle === storedTitle) {
  //     res.render("post", {requestTitle: post.title, requestContent: post.content});
  //   }
  //  });
   
  });

app.listen(3000, function() {
  console.log("Server started on port 3000");
});