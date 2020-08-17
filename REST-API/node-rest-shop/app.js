const express=require('express');
const morgan=require('morgan');
const app=express();
const bodyparser=require('body-parser');
const mongoose=require('mongoose');

const productRoutes=require('./api/routes/products');
const orderRoutes=require('./api/routes/orders');

mongoose.connect("mongodb+srv://Vrushali:"+process.env.password+"@cluster0.hidz8.mongodb.net/<dbname>?retryWrites=true&w=majority",{ useNewUrlParser: true });

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept,Authorization"
    );

    if(req.method==="OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT,POST,PATCH,DELETE,GET");
        res.status(200).json({});
    }
    next();
});

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

app.use((req,res,next)=>{
    const error=new Error("Not Found!");
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status( error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports=app;