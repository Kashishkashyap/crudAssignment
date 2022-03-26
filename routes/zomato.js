const express= require('express');
const router = express.Router();
const catchError= require('../utilities/catchError');
const expressError= require('../utilities/expressErrors');
const Zomato= require('../model/zomato');



router.get('/', async (req,res)=>{
    const dishes= await Zomato.find({});
    res.render('design/index', {dishes});
    })
    
    
    // router.get('/new', async (req,res)=>{
    //     const dish = new Zomato({
    //         restaurant: "restaurant",
    //         name: "biryani",
    //         description: "loremipsum,
    //         time: "20min",
    //         discount: '20%',
    //         price: 200,
    //         image: "https://media.istockphoto.com/photos/fresh-tasty-burger-picture-id495204032?k=20&m=495204032&s=612x612&w=0&h=x44AnT8kHv-apqnG9t1ILwf2sIr4uq14CUB7MBaiuOI="
    //     })
    //     await dish.save();
    //     res.send(dish);
    // })
    router.get('/new',catchError((req,res)=>{
        res.render('design/new');
    }))
    router.post('/',catchError(async (req,res) => {
         
            const newdish= new Zomato(req.body.zomato);
            await newdish.save();
            res.redirect(`/zomato/${newdish._id}`);
    
    }))
    router.get('/:id', catchError(async (req,res)=>{
        const {id}= req.params;
        const dishes= await Zomato.findById(id);
        res.render('design/show',{dishes});
    }))
    router.get('/:id/edit',catchError(async (req,res)=>{
        const {id}= req.params;
        const dish=await Zomato.findById(id);
        res.render('design/edit',{dish})
    }))
    
    
    router.put('/:id',catchError(async (req,res)=>{
        const {id}= req.params;
        const dish= await Zomato.findByIdAndUpdate(id,{...req.body.zomato});
        res.redirect(`/zomato/${dish._id}`);
    }))
    router.delete('/:id',catchError(async(req,res)=>{
        const {id}= req.params;
        const deletedish= await Zomato.findByIdAndDelete(id);
        res.redirect('/zomato');
        // res.send(deletedish);
    }))
    module.exports= router;