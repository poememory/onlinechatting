const express =require("express");
const user =express.Router();
const connection=require('../mysql');

const currentDate = new Date();
// 格式化日期为 YYYY-MM-DD
const formattedDate = currentDate.toISOString().split('T')[0];
function generateUniqueId() {
    const timestamp = new Date().getTime()%10000; // 获取当前时间戳
    const random = Math.floor(Math.random() * 10000%100); // 生成一个随机数
    const uniqueId = parseInt(`${timestamp}${random}`, 10);
    return uniqueId;
}

user.post("/register", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const newuser = {
        user_id: generateUniqueId(),
        username: username,
        password: password,
        register_date: formattedDate
    }

    // 检查用户名是否已存在
    connection.query('SELECT * FROM users WHERE username = ?', [username], (error, results, fields) => {
        if (error) {
            console.error('Error executing query: ' + error.stack);
            res.status(500).send({msg:'Internal Server Error'});
            return;
        }

        // 如果查询结果非空，表示用户名已存在
        if (results.length > 0) {
            res.status(409).send({msg:'Username already exists'});
            return;
        }

        // 用户名不存在，插入新用户
        connection.query('INSERT INTO users SET ?', newuser, (error, results, fields) => {
            if (error) {
                res.status(500).send({
                    msg: 'fail'
                });
                console.error('Error executing query: ' + error.stack);
                return;
            }
            console.log('Inserted a new user with id ' + results.insertId);
            res.status(200).send({
                msg: 'success'
            });
        });
    });
});


user.post('/login', (req, res) => {
    let username=req.body.username;
    let password=req.body.password;
    // 执行查询
    connection.query(
        'SELECT * FROM users WHERE username = ? AND password = ?',
        [username, password],
        (error, results, fields) => {
            if (error) {
                console.error('Error executing query: ' + error.stack);
                res.status(500).send({msg:'Internal Server Error'});
                return;
            }

            // 检查查询结果
            if (results.length > 0) {
                // 用户验证成功
                res.status(200).send({msg:'ok'});
            } else {
                // 用户验证失败
                res.status(401).send({msg:'Invalid username or password'});
            }
        }
    );
});

module.exports=user;