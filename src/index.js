const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'video_catelog',
    port: 3306,
});

db.connect(err => {
    if(err) {console.log(err, 'db err');}
    console.log('database connected');
});

app.use(cors());
app.use(bodyparser.json());
app.listen(3000, ()=>{
    console.log('server running...');
});