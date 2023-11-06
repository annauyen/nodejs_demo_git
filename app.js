const express = require("express");
const  mysql = require("mysql");
const path = require("path");
const dotenv = require("dotenv");
const app = express();
const publicDirectory = path.join(__dirname, './public' );
console.log(__dirname);

app.use (express.urlencoded({extended: false}));

// Noi dung dien vao form chuyen thanh chuoi JSON
app.use(express.json());

dotenv.config({ path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect( (err) => {
    if(err){
        console.log(err)
    }
    else{
        console.log("Connected to mysql")
    }
})

app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));


// Define Routes
app.use('/', require('./routes/pages'));  
app.use('/auth', require('./routes/auth')); //auth nay danh cho phuong thuc POST

app.listen(5000,() =>{
    console.log("Server started on port 5000")
})