const mysql=require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'QAZwsx822633',
    database:'onlinechatting',
})

module.exports =  connection;
