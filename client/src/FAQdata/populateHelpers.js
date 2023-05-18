/**
 * populateHelpers.js
 * 
 * This file contains a collection of helper functions used in populateFAQData.js*
 * The functions fetch and modify the data to answer the questions
 * The data used is the same array of Sends that is used in the whole app, no other data is sent from the backend
 */



/**fetchClimber
 * Fetches unique climbers who have climbed a certain grade.
 * @param {Array} data - The array of sends to filter.
 * @param {string} europeanGrade - The European climbing grade to filter by.
 * @returns {Array} - An array of unique climber names who have climbed the specified grade.
 */
//Helps populate questions like.. 'how many people have climbed..?'
export function fetchClimber(data, europeanGrade) {
    // Filter sends by the specified gender and grade
    const filteredData = data.filter(function (send) {
        // Check if the route's European grade contains the specified grade
        const gradeMatches = send.route.europeanGrade.includes(europeanGrade);
        return gradeMatches;
    });

    // Map over the filtered sends to extract the climber's name
    const climbers = filteredData.map(function (send) {
        return send.climber.name;
    });

    // Remove duplicate climber names
    const uniqueClimbers = [...new Set(climbers)];

    return uniqueClimbers;
}

/**countRoutes
 * Counts the number of unique routes with a given grade.
 * @param {Array} data - The array of sends to filter.
 * @param {string} europeanGrade - The European climbing grade to filter by.
 * @returns {Array} - An array of unique route names with the specified grade.
 */
//Helps populate questions like.. 'How many [grade] routes are there?'
export function countRoutes(data, europeanGrade) {
    console.log('data:', data);
    // Filter sends by given grade
    const routesWithGivenGrade = data.filter(send => send.route.europeanGrade.includes(europeanGrade));

    // Map to route names
    const routeNames = routesWithGivenGrade.map(send => send.route.name);

    // Create a Set from routeNames to eliminate duplicates, then convert back to array
    const uniqueRouteNames = Array.from(new Set(routeNames));

    return uniqueRouteNames;
}


/**formatList
 * Formats a list of items into a grammatically correct string.
 * @param {Array} list - The array of items to format.
 * @returns {string} - A string of items formatted in a grammatically correct way.
 */
//Helps populate all questions that involve listing items
export function formatList(list) {
    if (list.length === 1) {
        return list[0];
    } else if (list.length === 2) {
        return list.join(' and ');
    } else {
        return list.slice(0, -1).join(', ') + ', and ' + list.slice(-1);
    }
}

/**countSendsRankedClimbers
 * Counts the number of sends of each specified grade for the top 3 climbers.
 * @param {Array} rankedClimbers - The array of ranked climbers to analyze.
 * @param {Array} grades - The array of European climbing grades to count.
 * @returns {Object} - An object with the number of sends of each grade for the top 3 climbers.
 */

export function countSendsRankedClimbers(rankedClimbers, grades) {
    // Only consider the top 3 climbers
    const topClimbers = rankedClimbers.slice(0, 3);

    // Initialize an empty result object
    const result = {};

    // Loop through the top climbers
    for (let i = 0; i < topClimbers.length; i++) {
        // Initialize a counter object for the current climber
        const counter = { name: topClimbers[i].climber.name };

        // Combine sport and boulder sends
        const allSends = [...topClimbers[i].sends.sport, ...topClimbers[i].sends.boulder];

        // Loop through the grades
        for (const grade of grades) {
            // Count the number of sends of the current grade
            counter[grade] = allSends.filter(send => send.europeanGrade.includes(grade)).length;
        }

        // Add the counter to the result object
        result[`top${i + 1}`] = counter;
    }

    return result;
}


/**climbersByDate
 * Fetches climbers who have climbed a certain grade on a certain date.
 * @param {Array} filteredData - The array of filtered sends to analyze.
 * @param {string} grade - The European climbing grade to filter by.
 * @param {string} type - The type of date to filter by ('first' or 'recent').
 * @returns {Object} - An object with the names of the climbers, the date, and the route name.
 */
export function climbersByDate(filteredData, grade, type) {
    // Filter sends by given grade
    const sendsWithGivenGrade = filteredData.filter(send => send.route.europeanGrade.includes(grade));

    // If there are no sends that match the criteria, return an empty object
    if (sendsWithGivenGrade.length === 0) {
        return {};
    }

    // Sort the sends by date in ascending or descending order based on the type
    if (type === 'first') {
        sendsWithGivenGrade.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (type === 'recent') {
        sendsWithGivenGrade.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        return {}; // return an empty object if type is neither 'first' nor 'recent'
    }

    // Get the date based on the type
    const targetDate = sendsWithGivenGrade[0].date;

    // Get the names of all climbers who have sends with the target date
    const climberNames = sendsWithGivenGrade
        .filter(send => new Date(send.date).getTime() === new Date(targetDate).getTime())
        .map(send => send.climber.name);

    // Remove duplicate names
    const uniqueClimberNames = Array.from(new Set(climberNames));

    // Return an object with properties names and date
    return {
        names: uniqueClimberNames,
        date: targetDate,
        routeName: sendsWithGivenGrade[0].route.name
    };
}