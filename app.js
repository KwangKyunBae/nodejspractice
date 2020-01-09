var express = require('express')
var app = express()
var bodyParser= require('body-parser')
var mysql = require('mysql');
var cors = require('cors')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port : '3306',
    password : 'dgu1234!',
    database : 'jsman'
})

connection.connect()

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.listen(3000,function(){
    console.log("start! express server on 3000 port")
});

console.log('end of server...')

app.get('/',function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
});

app.post('/email_post',function(req,res){
    console.log(req.body.email)
    
    res.render('email.ejs',{'email' : req.body.email})
});

app.post('/ajax_send_email', function(req,res){
    var email = req.body.email;
    var responseData = {};
    
    var query = connection.query('select name from user where email="' + email + '"',function(err, rows)
    {
        if(err) throw err;
        if(rows[0]){
            responseData.result = "ok";
            responseData.name = rows[0].name;
        }else {
            responseData.result = "none";
            responseData.name ="";
        }

        res.json(responseData);
    })

    
});