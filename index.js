var express = require('express') ;
const app = express() ;
const PORT = process.env.port ||  3000  ;
const routes = require('./src/routes/crmRoutes') ;
const mongoose = require('mongoose') ;

//routes(app) ;

mongoose.connect('mongodb://localhost/test',
    { useNewUrlParser: true }) ;



app.get('/' , function (req, res , next){
   console.log('Request Method : ' , req.method) ;
    next() ;
} , function (req , res, next) {
    console.log('Request Original URL : ', req.originalUrl  ) ;
    next() ;
} ,  function(req , res , next){
    res.send('Request was successful') ;

}  )    ;


app.use(routes) ;


app.listen(PORT , ()=>{
    console.log(`Server is Running on Port: ${PORT}`)  ;
}) ;
