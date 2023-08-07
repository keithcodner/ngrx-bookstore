const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./app/models');
const {User, Product} = require('./app/models');

const app = express();
app.use(cors());

//all user data
app.get('/user', (req, res) => {

});

//all video data
app.get('/videos', (req, res) => {
    //Product.findAll({ where: { video_title: "Meet Me 24"}})
    Product.findAll()
        .then((products) => {
            res.send(products);
        })
        .catch((err) => {
            console.log(err);
        })
});

// insert video
app.post('/videos', (req, res) => {
    Product.create({
        video_title: req.body.video_title,
        creator: req.body.creator,
        description: req.body.description,
        length: req.body.length,
        cost: req.body.cost
    })
    .catch((err) => {
        console.log(err);
    });

    res.send("Video has been inserted");
});

//update video
app.put('/videos/:id', (req, res) => {
    Product.create({
        video_title: req.body.video_title,
        creator: req.body.creator,
        description: req.body.description,
        length: req.body.length,
        cost: req.body.cost
    },
    {
        where: req.params.id
    })
    .catch((err) => {
        console.log(err);
    });

    res.send("Video has been updated");

});

//delete video
app.delete('/videos/:id', (req, res) => {
    Product.destroy({
        where: req.params.id
    })
    .catch((err) => {
        console.log(err);
    });

    res.send("Video has been deleted");

});

//get single data
// app.get('/user/:id', (req, res) => {
    
// });

app.use(bodyparser.json());

db.sequelize.sync().then((req) => {
    app.listen(3000, ()=>{
        console.log('server running...');
    });
});
