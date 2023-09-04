const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const db = require('./app/models');
const {User, Product, Order, Transaction} = require('./app/models');

const app = express();
app.use(cors());
app.use(bodyparser.json());

// ------------ Manage Video Products Routes ------------------

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

// ------------ Manage Login Products Routes ------------------

// login check
app.post('/auth', async (req, res) => {

    let userResponse = {
        id: "",
        name: "",
        username: "",
        email: "",
        token: "",
        other: "",
        created_at: "",
        status: "false",
    };

    await User.findAll({ where: { username: req.body.username,  password: req.body.password}})
    .then((user) => {
        userResponse.id = user[0].id;
        userResponse.name = user[0].name;
        userResponse.username = user[0].username;
        userResponse.email = user[0].email;
        userResponse.token = user[0].token;
        userResponse.other = user[0].other;
        userResponse.created_at = user[0].created_at;
        userResponse.status = "successful_login";
        res.send(userResponse);
    })
    .catch((err) => {
        console.log(err);
        userResponse.token = "false";
        userResponse.status = "false";
        res.send(userResponse);
    });

});


// ------------ Manage Transaction Routes ------------------

//get transaction
app.get('/transaction', async(req, res) => {
    //Product.findAll({ where: { video_title: "Meet Me 24"}})
    await Transaction.findAll()
        .then((transaction) => {
            res.send(transaction);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get some transactios
app.get('/transactionById', async(req, res) => {
    await Transaction.findAll({ where: { trnsx_id: req.body.id}})
    //await Transaction.findAll()
        .then((transaction) => {
            res.send(transaction);
        })
        .catch((err) => {
            console.log(err);
        })
});

//insert transaction
app.post('/transaction', async(req, res) => {
 
    await Transaction.create(req.body)
    .catch((err) => {
        console.log(err);
    });

    res.send("Transaction has been inserted");
});

// ------------ Manage Order Routes ------------------

//get order
app.get('/order', async(req, res) => {
    //Product.findAll({ where: { video_title: "Meet Me 24"}})
    await Order.findAll()
        .then((order) => {
            res.send(order);
        })
        .catch((err) => {
            console.log(err);
        })
});

//get one order
app.get('/orderById', async(req, res) => {
    await Order.findAll({ where: { id: req.body.id}})
    //await Order.findAll()
        .then((order) => {
            res.send(order);
        })
        .catch((err) => {
            console.log(err);
        })
});
//inseert order
app.post('/order', async(req, res) => {
   
    await Order.create(req.body)
    .catch((err) => {
        console.log(err);
    });

    res.send("Order has been inserted");
});

//get single data
// app.get('/user/:id', (req, res) => {
    
// });

db.sequelize.sync().then((req) => {
    app.listen(3000, ()=>{
        console.log('server running...');
    });
});
