const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const path = require('path');
const Climber = require('../models/climber');
const Route = require('../models/route');
const Send = require('../models/send');

const climbersCsvPath = path.join(__dirname, 'climbers.csv');
const routesCsvPath = path.join(__dirname, 'routes.csv');
const sendsMappingCsvPath = path.join(__dirname, 'sends_mapping.csv');

const readCSV = async (csvPath) => {
    try {
        const jsonArray = await csvtojson().fromFile(csvPath);
        return jsonArray;
    } catch (err) {
        console.error(`Error reading CSV file: ${csvPath}`, err);
    }
};

const importData = async (Model, data) => {
    try {
        await Model.insertMany(data);
        console.log(`Imported ${data.length} documents to ${Model.modelName} collection`);
    } catch (err) {
        console.error(`Error importing data to ${Model.modelName} collection`, err);
    }
};

const importSends = async (sendsMapping) => {
    for (const sendMapping of sendsMapping) {
        const climber = await Climber.findOne({ name: sendMapping.climber_name });
        const route = await Route.findOne({ name: sendMapping.route_name });

        if (!climber || !route) {
            console.error('Climber or route not found:', sendMapping);
            continue;
        }

        const send = new Send({
            climber: climber._id,
            route: route._id,
            date: sendMapping.date
        });

        try {
            await send.save();
            console.log(`Imported send for climber ${climber.name} on route ${route.name}`);
        } catch (err) {
            console.error(`Error importing send for climber ${climber.name} on route ${route.name}`, err);
        }
    }
};

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

//calls functions
const main = async () => {
    const climbers = await readCSV(climbersCsvPath);
    const routes = await readCSV(routesCsvPath);
    const sendsMapping = await readCSV(sendsMappingCsvPath);

    await importData(Climber, climbers);
    console.log(`Imported ${climbers.length} climbers`);
    await importData(Route, routes);
    console.log(`Imported ${routes.length} routes`);
    await importSends(sendsMapping);
    console.log(`Importing ${sendsMapping.length} sends`);

    // Close the database connection
    mongoose.connection.close();
};

main();