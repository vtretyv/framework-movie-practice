let mysql = require('mysql');

let connection = mysql.createConnection({
    user:'root',
    password: 'blazexxx',
    host:'localhost',
    database:'movielist'
});

connection.connect((err)=> {
    if(err) {return console.log(err)};
    console.log('Connected Yo');
});

let selectAll = function(callback) {
    let qs = 'SELECT * FROM movies';
    connection.query(qs, (err,result)=>{
        if (err) {callback(err,null)};
        callback(null,result);
    });
}

let insertMovie = function(data, callback) {
    let qs = `INSERT ${data} INTO movies`;
    connection.query(qs, (err,result)=>{
        
    })
}
