const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./app/models');
const {User, Product} = require('./app/models');

const app = express();
app.use(cors());
app.use(bodyparser.json());

//all video data
app.get('/videos', async(req, res) => {
    //Product.findAll({ where: { video_title: "Meet Me 24"}})
    await Product.findAll()
        .then((products) => {
            res.send(products);
        })
        .catch((err) => {
            console.log(err);
        })
});

// insert video
app.post('/videos', async (req, res) => {

    const video = {
        cost: req.body.cost,
        video_title: req.body.video_title,
        creator: req.body.creator,
        description: req.body.description,
        length: req.body.length,
       
      };

    await Product.create(req.body)
    .catch((err) => {
        console.log(err);
    });

    res.send("Video has been inserted");
});

//update video
app.put('/videos/:id', async (req, res) => {
    await Product.update({
        video_title: req.body.video_title,
        creator: req.body.creator,
        description: req.body.description,
        length: req.body.length,
        cost: req.body.cost
    },
    {
        where: {id: req.params.id}
    })
    .catch((err) => {
        console.log(err);
    });

    res.send("Video has been updated");

});

//delete video
app.delete('/videos/:id', async (req, res) => {
    await Product.destroy({
        where: {id: req.params.id}
    })
    .catch((err) => {
        console.log(err);
    });

    res.send("Video has been deleted");

});

//get single data
// app.get('/user/:id', (req, res) => {
    
// });



db.sequelize.sync().then((req) => {
    app.listen(3000, ()=>{
        console.log('server running...');
    });
});
