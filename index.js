var express = require('express') ;
const app = express() ;
const PORT = process.env.port ||  3000  ;
const routes = require('./src/routes/crmRoutes') ;
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser') ;

//routes(app) ;
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({extended : true})) ;

mongoose.connect('mongodb://localhost/test',
    { useNewUrlParser: true }) ;


const BlogSchema  = require('./src/models/crmModel') ;
const blogModel = mongoose.model('blog' , BlogSchema) ;


app.post('/newBlog' ,  (req, res) =>{
    let blog = blogModel(req.body) ;
    blog.save((err , blogModel) =>{
        if(err){
            res.send(err) ;
        }
        else
            res.json(blog) ;
    })
}) ;


let getAllBlogs = (req, res) =>{
    blogModel.find({} , (err , blog) =>{
        if(err){
            res.send(err) ;
        }
        else
            res.json(blog) ;
    });
};


app.get('/getBlogs' , getAllBlogs) ;


let getBlogById = (req , res) =>{
        blogModel.findById(req.params.blogId , (err , blog) =>{
            if(err){
                res.send(err);
            }else{
                res.json(blog) ;
            }
        }) ;
};


app.get('/blog/:blogId' , getBlogById ) ;



app.use(routes) ;


app.listen(PORT , ()=>{
    console.log(`Server is Running on Port: ${PORT}`)  ;
}) ;
