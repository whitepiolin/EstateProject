var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var statsTable = require('./routes/statstable.js'); 
var app = express();
var connection  = require('express-myconnection'); 

app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : '000000',
        port : 3306, 
        database:'realestatemarket'
},'pool')
);
app.get('./views/table.ejs', statsTable.list);
app.use(app.router);
http.createServer(app).listen(app.get(3000), function(){
    console.log('Express server listening on port ' + app.get(3000));
});