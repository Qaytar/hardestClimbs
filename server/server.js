// const express = require('express');
const mongoose = require('mongoose');
const Send = require('./models/send');
const Climber = require('./models/climber');
const Route = require('./models/route');
const app = express();
require('dotenv').config();

app.get('/api', async (req, res) => {
    try {
        // fetches all Sends from database and populates climber and route, which means the outcome is the entirity of the data.
        const serverData = await Send.find()
            .populate('climber')
            .populate('route')
            .exec();


        res.json(serverData);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ message: "Error fetching data" });
    }
});



// Connects to mongoDb. use either of the following two lines depending on if you are working localy or not.

/*local*/
const dbUrl = 'mongodb://127.0.0.1:27017/hardestClimbsLocal';

/*remote (vercel)*/
//const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl)
    .then(() => {
        console.error('mongo connection open')
    })
    .catch((err) => {
        console.error('mongo connection error')
        console.info(err)
    })

// uncomment when woking localy, but since deployment is on vercel which is serverless I need to export the app instead
//use either of the following two lines depending on if you are working localy or not.

/*local*/
//app.listen(5000, () => console.log('Server started on port 5000'));
kjhgfd
/*remote (vercel)*/
//module.exports = app;

