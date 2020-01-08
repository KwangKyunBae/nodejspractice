var express = require('express')
var app = express()

app.use(express.static('public'))

app.listen(3000,function(){
    console.log("start! express server on 3000 port")
});

console.log('end of server...')

app.get('/',function(req,res) {
    res.sendFile(__dirname + "/public/main.html")
});