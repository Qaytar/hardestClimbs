const express = require('express');
const mongoose = require('mongoose');
const Send = require('./models/send');
const Climber = require('./models/climber');
const Route = require('./models/route');
const app = express();
//{ "serverData": ["Adam Ondra", "Stefano"] }

app.get('/api', async (req, res) => {
    try {
        const serverData = await Send.find()
            .populate('climber')
            .populate('route')
            .exec();

        //console.log("serverData:", serverData);
        res.json(serverData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data" });
    }
});



//Connects to mongoDb
const dbUrl = 'mongodb://127.0.0.1:27017/hardestClimbsLocal';
mongoose.connect(dbUrl)
    .then(() => {
        console.log('mongo connection open')
    })
    .catch((err) => {
        console.log('mongo connection error')
        console.log(err)
    })

app.listen(5000, () => console.log('Server started on port 5000'));

