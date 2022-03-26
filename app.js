const express= require('express');
const app= express();
const path= require('path');
const zomatoRoutes= require('./routes/zomato');
const ejsMate= require('ejs-mate')
app.engine('ejs',ejsMate);
const Zomato= require('./model/zomato');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
const methodOverride= require('method-override')
app.use(methodOverride('_method'));

const dotenv= require('dotenv');

dotenv.config({path:'./config/config.env'})

const catchError= require('./utilities/catchError');
const expressError= require('./utilities/expressErrors');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
useUnifiedTopology:true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("DataBase Connected");
});

app.use('/zomato', zomatoRoutes);

app.all('*',(req,res,next)=>{
  next(new expressError("page not found", 404))
 })
 app.use((err,req,res,next)=>{
     const {statusCode= 500}= err;
     if(!err.message){
        err.message= "something is wrong";
     }
     res.status(statusCode).render('error', {err});
   
 })

app.listen(3000, ()=>{
    console.log("listening on port 3000");
})