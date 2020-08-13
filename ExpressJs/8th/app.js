var name=process.argv[2];

var path=require('path');
var express=require('express');

var app=express();

app.set('view engine', 'pug');


app.set('views', path.join(__dirname, 'templates'));

app.get('/home',function(req,res){
   
    res.render(name, {date: new Date().toDateString()});
});

app.listen(3000);
