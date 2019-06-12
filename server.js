'use strict';

const express = require('express');
const bodyParse = require('body-parser');
const mongo = require('mongodb').MongoClient;

const app = express();
const url = 'mongodb://localhost:27017/';

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/register', (req, res) => {
    const date = new Date();
    const register = {
        username: req.body.user,
        password: req.body.pass,
        hour: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds()
    };
    mongo.connect(url, (req, db) => {
        const dbo = db.db('portal');
        dbo.collection('register').insertOne(register);
        db.close();
    });

    res.sendFile(__dirname + "/index.html");
});

app.post('/login', (req, res) => {
    const credentials = {
        username: req.body.lUser,
        password: req.body.lPass
    };
    const query = {
        username: { $eq: credentials.username },
        password: { $eq: credentials.password }
    };

    mongo.connect(url, (req, db) => {
        const dbo = db.db('portal');

        dbo.collection('register').find(query).toArray((req, res) => {
            if (res.length > 0)
                doLogin(true);
            else
                doLogin(false);
            db.close();
        });
    });

    const doLogin = (value) =>
        value ? res.send('<h1>Logado com sucesso</h1>') : res.send('<h1>Username or Password are incorrect!</h1>');
});

app.listen(3000, () => console.log("ON 3000!"));