exports.mongodb = () => {
    const mongoose = require('mongoose');
    
    mongoose.connect("mongodb://localhost:27017/teste");

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
        const registerSchema = new mongoose.Schema({
            username: String,
            password: String
        });
        const register = mongoose.model('register', registerSchema);
        const newregister = new register(req.body);

        newregister.save().then(() => console.log("OK"));
    });

    const register = new user(req.body);

    register.save().then(item => {
        res.send('Item saved');
    }).catch(err => res.status(400).send('unable to save'));
}