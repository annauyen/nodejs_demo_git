const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const e = require('express');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});


exports.register = (req, res) => {
    console.log(req.body);

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.pswd;
    const passwordConfirm = req.body.pswdConfirm;

    db.query('SELECT email FROM users WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.log(error)
        }

        if (results.length > 0) {
            return res.render('register', {
                message: 'Email already used'
            })
        }
        
        else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Password do not match'
            })
        }

        let hashedPass = await bcrypt.hash(password, 8);
        console.log(hashedPass);

        db.query('INSERT INTO users SET ?',{name: name, email: email, password: hashedPass}, (error, results) =>{
            if (error) {
                console.log(error)
            }
            else{
                console.log(results)
                return res.render('register', {
                    message: 'User registered'
                })
            }
        })

    });

    // res.send("Form submitted")
}

