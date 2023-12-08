const mongoose = require('mongoose');
const csvtojson = require('csvtojson');
const path = require('path');
const Climber = require('../models/climber');
const Route = require('../models/route');
const Send = require('../models/send');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const climbersCsvPath = path.join(__dirname, 'climbers.csv');
const routesCsvPath = path.join(__dirname, 'routes.csv');
const sendsMappingCsvPath = path.join(__dirname, 'sends_mapping.csv');


// const parseDate = (dateStr) => {
//     const parts = dateStr.split('-');
//     if (parts.length === 3) {
//         console.log('input:', dateStr)
//         // This will map 'Jan' to 0, 'Feb' to 1, etc.
//         const monthIndex = new Date(Date.parse(parts[0] + " 1, 2012")).getMonth();
//         // Assumption: the year is in the 2000s.
//         const year = 2000 + parseInt(parts[1], 10);
//         console.log('output:', new Date(year, monthIndex))
//         return new Date(year, monthIndex);
//     } else if (parts.length === 1) {
//         console.log('input:', dateStr)
//         // Only the year provided
//         const year = parseInt(parts[0], 10);
//         console.log('output:', new Date(year, 0))
//         return new Date(year, 0); // January 1 of the given year
//     } else {
//         // Invalid date format
//         throw new Error('Invalid date format: ' + dateStr);
//     }
// };


// Expects dates to come from the .csv either in format "mmm-YY" or a just the year as a number ``2018`
const parseDate = (dateStr) => {
    console.log('input:', dateStr)
    const parts = dateStr.split('-');

    if (parts.length === 2) {
        // This will map 'Jan' to 0, 'Feb' to 1, etc.
        const monthIndex = new Date(Date.parse(parts[0] + " 1, 2012")).getMonth();
        // Assumption: the year is in the 2000s.
        const year = 2000 + parseInt(parts[1], 10);
        console.log('output:', new Date(year, monthIndex))
        return new Date(year, monthIndex);
    } else if (parts.length === 1) {
        console.log('input:', dateStr)
        // Only the year provided
        const year = parseInt(parts[0], 10);
        console.log('output:', new Date(year, 0))
        return new Date(year, 0); // January 1 of the given year
    } else {
        // Invalid date format
        throw new Error('Invalid date format: ' + dateStr);
    }
};


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
            date: parseDate(sendMapping.date)
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
//const dbUrl = 'mongodb://127.0.0.1:27017/hardestClimbsLocal';
const dbUrl = process.env.MONGODB_URL;


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