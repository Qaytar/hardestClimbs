import { emptyFAQdata } from "./emptyFAQdata";
import { filterSends, rankClimbers } from '../utils/functionsHelpers';

const FAQdata = emptyFAQdata;


//This function will help populate the questions of the sort 'how many people have climbed ... ¿?'
function fetchClimber(data, europeanGrade) {
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

function countRoutes(data, europeanGrade) {
    console.log('data:', data);
    // Filter sends by given grade
    const routesWithGivenGrade = data.filter(send => send.route.europeanGrade.includes(europeanGrade));

    // Map to route names
    const routeNames = routesWithGivenGrade.map(send => send.route.name);

    // Create a Set from routeNames to eliminate duplicates, then convert back to array
    const uniqueRouteNames = Array.from(new Set(routeNames));

    return uniqueRouteNames;
}



function formatList(list) {
    if (list.length === 1) {
        return list[0];
    } else if (list.length === 2) {
        return list.join(' and ');
    } else {
        return list.slice(0, -1).join(', ') + ', and ' + list.slice(-1);
    }
}

function countSendsRankedClimbers(rankedClimbers, grades) {
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

function climbersByDate(filteredData, grade, type) {
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

export function populateFAQdata(data) {

    const sportWomanData = filterSends(data, 'sport', 'woman');
    const boulderWomanData = filterSends(data, 'boulder', 'woman');
    const boulderManData = filterSends(data, 'boulder', 'man');
    const sportManData = filterSends(data, 'sport', 'man');
    const sportData = filterSends(data, 'sport', 'all');
    const boulderData = filterSends(data, 'boulder', 'all');

    /*SECTION 1*/
    //How many people have climbed ... ?

    //sportMan
    const answer9c = fetchClimber(data, '9c');
    FAQdata.europeanGrades.sportMan[0].answer = `Only ${answer9c.length} people have climbed 9c, ${formatList(answer9c)}`;
    FAQdata.americanGrades.sportMan[0].answer = `Only ${answer9c.length} people have climbed 5.15d, ${formatList(answer9c)}`;

    const answer9bPlus = fetchClimber(data, '9b+');
    FAQdata.europeanGrades.sportMan[1].answer = `Only ${answer9bPlus.length} people have climbed 9b+, ${formatList(answer9bPlus)}`;
    FAQdata.americanGrades.sportMan[1].answer = `Only ${answer9bPlus.length} people have climbed 5.15c, ${formatList(answer9bPlus)}`;

    //sportWoman
    const answer9b = fetchClimber(sportWomanData, '9b');
    FAQdata.europeanGrades.sportWoman[0].answer = `Only ${answer9b.length} woman have climbed 9b, ${formatList(answer9b)}`;
    FAQdata.americanGrades.sportWoman[0].answer = `Only ${answer9b.length} woman have climbed 5.15b, ${formatList(answer9b)}`;

    const answer9aPlus = fetchClimber(sportWomanData, '9a+');
    FAQdata.europeanGrades.sportWoman[1].answer = `Only ${answer9aPlus.length} woman have climbed 9a+, ${formatList(answer9aPlus)}`;
    FAQdata.americanGrades.sportWoman[1].answer = `Only ${answer9aPlus.length} woman have climbed 5.15a, ${formatList(answer9aPlus)}`;

    //boulderMan
    const answerV16 = fetchClimber(data, '8C+');
    FAQdata.europeanGrades.boulderMan[0].answer = `${answerV16.length} people have climbed 8C+, visit page for more details`;
    FAQdata.americanGrades.boulderMan[0].answer = `${answerV16.length} people have climbed V16, visit page for more details`;

    const answerV17 = fetchClimber(data, '9A');
    FAQdata.europeanGrades.boulderMan[1].answer = `Only ${answerV17.length} people have climbed 9A, ${formatList(answerV17)}`;
    FAQdata.americanGrades.boulderMan[1].answer = `Only ${answerV17.length} people have climbed V17, ${formatList(answerV17)}`;

    //boulderWoman
    const answerV14 = fetchClimber(boulderWomanData, '8B+');
    FAQdata.europeanGrades.boulderWoman[0].answer = `${answerV14.length} woman have climbed 8B+, visit page for more details`;
    FAQdata.americanGrades.boulderWoman[0].answer = `${answerV14.length} woman have climbed V14, visit page for more details`;

    const answerV15 = fetchClimber(boulderWomanData, '8C');
    FAQdata.europeanGrades.boulderWoman[1].answer = `Only ${answerV15.length} woman have climbed 8C, ${formatList(answerV15)}`;
    FAQdata.americanGrades.boulderWoman[1].answer = `Only ${answerV15.length} woman have climbed V15, ${formatList(answerV15)}`;

    /*SECTION 2*/
    //How many [grade] routes are there?

    //sportMan
    const answer9cCount = countRoutes(data, '9c');
    FAQdata.europeanGrades.sportMan[2].answer = `There are ${answer9cCount.length} 9c sport climbing routes, ${formatList(answer9cCount)}`;
    FAQdata.americanGrades.sportMan[2].answer = `There are ${answer9cCount.length} 5.15d sport climbing routes, ${formatList(answer9cCount)}`;

    const answer9bPlusCount = countRoutes(data, '9b+');
    FAQdata.europeanGrades.sportMan[3].answer = `There are ${answer9bPlusCount.length} 9b+ sport climbing routes, ${formatList(answer9bPlusCount)}`;
    FAQdata.americanGrades.sportMan[3].answer = `There are ${answer9bPlusCount.length} 5.15c sport climbing routes, ${formatList(answer9bPlusCount)}`;

    //boulderMan
    const answerV16Count = countRoutes(data, '8C+');
    FAQdata.europeanGrades.boulderMan[2].answer = `There are ${answerV16Count.length} 8C+ boulders`;
    FAQdata.americanGrades.boulderMan[2].answer = `There are ${answerV16Count.length} V16 boulders`;

    const answerV17Count = countRoutes(data, '9A');
    FAQdata.europeanGrades.boulderMan[3].answer = `There are ${answerV17Count.length} 9A boulders, ${formatList(answerV17Count)}. Though there is no consensus on Soudain Seul: Simon Lorenzi (2021) and Camile Coudert (2022) suggested 9A but Nico Pelorson (2021) opted for 8C+)`;
    FAQdata.americanGrades.boulderMan[3].answer = `There are ${answerV17Count.length} V17 boulders, ${formatList(answerV17Count)}. Though there is no consensus on Soudain Seul: Simon Lorenzi (2021) and Camile Coudert (2022) suggested V17 but Nico Pelorson (2021) opted for V16)`;

    /*SECTION 3*/
    //Who is the strongest climber?

    //sportMan
    const sportManrankedClimbers = rankClimbers(sportManData);
    const answerStrongestSportMan = countSendsRankedClimbers(sportManrankedClimbers, ['9c', '9b+']);
    FAQdata.europeanGrades.sportMan[4].answer = `${answerStrongestSportMan['top1'].name} has climbed ${answerStrongestSportMan['top1']['9c']} 9c's and ${answerStrongestSportMan['top1']['9b+']} 9b+'s, ${answerStrongestSportMan['top2'].name} has climbed ${answerStrongestSportMan['top2']['9c']} 9c's and ${answerStrongestSportMan['top2']['9b+']} 9b+'s, ${answerStrongestSportMan['top3'].name} has climbed ${answerStrongestSportMan['top3']['9c']} 9c's and ${answerStrongestSportMan['top3']['9b+']} 9b+'s`;
    FAQdata.americanGrades.sportMan[4].answer = `${answerStrongestSportMan['top1'].name} has climbed ${answerStrongestSportMan['top1']['9c']} 5.15d's and ${answerStrongestSportMan['top1']['9b+']} 5.15c's, ${answerStrongestSportMan['top2'].name} has climbed ${answerStrongestSportMan['top2']['9c']} 5.15d's and ${answerStrongestSportMan['top2']['9b+']} 5.15c's, ${answerStrongestSportMan['top3'].name} has climbed ${answerStrongestSportMan['top3']['9c']} 5.15d's and ${answerStrongestSportMan['top3']['9b+']} 5.15's`;

    //sportWoman
    const sportWomanrankedClimbers = rankClimbers(sportWomanData);
    const answerStrongestSportWoman = countSendsRankedClimbers(sportWomanrankedClimbers, ['9b', '9a+']);
    FAQdata.europeanGrades.sportWoman[2].answer = `${answerStrongestSportWoman['top1'].name} has climbed ${answerStrongestSportWoman['top1']['9b']} 9b's and ${answerStrongestSportWoman['top1']['9a+']} 9a+'s, ${answerStrongestSportWoman['top2'].name} has climbed ${answerStrongestSportWoman['top2']['9b']} 9b's and ${answerStrongestSportWoman['top2']['9a+']} 9a+'s, ${answerStrongestSportWoman['top3'].name} has climbed ${answerStrongestSportWoman['top3']['9b']} 9b's and ${answerStrongestSportWoman['top3']['9a+']} 9a+'s`;
    FAQdata.americanGrades.sportWoman[2].answer = `${answerStrongestSportWoman['top1'].name} has climbed ${answerStrongestSportWoman['top1']['9b']} 5.15b's and ${answerStrongestSportWoman['top1']['9a+']} 5.15a's, ${answerStrongestSportWoman['top2'].name} has climbed ${answerStrongestSportWoman['top2']['9b']} 5.15b's and ${answerStrongestSportWoman['top2']['9a+']} 5.15a's, ${answerStrongestSportWoman['top3'].name} has climbed ${answerStrongestSportWoman['top3']['9b']} 5.15b's and ${answerStrongestSportWoman['top3']['9a+']} 5.15a's`;

    //boulderMan
    const boulderManRankedClimbers = rankClimbers(boulderManData);
    const answerStrongestBoulderMan = countSendsRankedClimbers(boulderManRankedClimbers, ['8C+', '9A']);
    FAQdata.europeanGrades.boulderMan[4].answer = `${answerStrongestBoulderMan['top1'].name} has climbed ${answerStrongestBoulderMan['top1']['9A']} 9A's and ${answerStrongestBoulderMan['top1']['8C+']} 8C+'s, ${answerStrongestBoulderMan['top2'].name} has climbed ${answerStrongestBoulderMan['top2']['9A']} 9A's and ${answerStrongestBoulderMan['top2']['8C+']} 8C+'s, ${answerStrongestBoulderMan['top3'].name} has climbed ${answerStrongestBoulderMan['top3']['9A']} 9A's and ${answerStrongestBoulderMan['top3']['8C+']} 8C+'s`;
    FAQdata.americanGrades.boulderMan[4].answer = `${answerStrongestBoulderMan['top1'].name} has climbed ${answerStrongestBoulderMan['top1']['9A']} V17's and ${answerStrongestBoulderMan['top1']['8C+']} V16's, ${answerStrongestBoulderMan['top2'].name} has climbed ${answerStrongestBoulderMan['top2']['9A']} V17's and ${answerStrongestBoulderMan['top2']['8C+']} V16's, ${answerStrongestBoulderMan['top3'].name} has climbed ${answerStrongestBoulderMan['top3']['9A']} V17's and ${answerStrongestBoulderMan['top3']['8C+']} V16's`;

    //boulderWoman
    const boulderWomanRankedClimbers = rankClimbers(boulderWomanData);
    const answerStrongestBoulderWoman = countSendsRankedClimbers(boulderWomanRankedClimbers, ['8C', '8B+']);
    FAQdata.europeanGrades.boulderWoman[2].answer = `${answerStrongestBoulderWoman['top1'].name} has climbed ${answerStrongestBoulderWoman['top1']['8C']} 8C's and ${answerStrongestBoulderWoman['top1']['8B+']} 8B+'s, ${answerStrongestBoulderWoman['top2'].name} has climbed ${answerStrongestBoulderWoman['top2']['8C']} 8C's and ${answerStrongestBoulderWoman['top2']['8B+']} 8B+'s, ${answerStrongestBoulderWoman['top3'].name} has climbed ${answerStrongestBoulderWoman['top3']['8C']} 8C's and ${answerStrongestBoulderWoman['top3']['8B+']} 8B+'s`;
    FAQdata.americanGrades.boulderWoman[2].answer = `${answerStrongestBoulderWoman['top1'].name} has climbed ${answerStrongestBoulderWoman['top1']['8C']} V15's and ${answerStrongestBoulderWoman['top1']['8B+']} V14's, ${answerStrongestBoulderWoman['top2'].name} has climbed ${answerStrongestBoulderWoman['top2']['8C']} V15's and ${answerStrongestBoulderWoman['top2']['8B+']} V14's, ${answerStrongestBoulderWoman['top3'].name} has climbed ${answerStrongestBoulderWoman['top3']['8C']} V15's and ${answerStrongestBoulderWoman['top3']['8B+']} V14's`;

    /*SECTION 4*/
    //Who was the first to climb ... ?

    //sportMan
    const answerFirst9bPlus = climbersByDate(sportManData, '9b+', 'first');
    FAQdata.europeanGrades.sportMan[5].answer = `On ${answerFirst9bPlus.date}, ${formatList(answerFirst9bPlus.names)} became the first to climb 9c (${answerFirst9bPlus.routeName})`;
    FAQdata.americanGrades.sportMan[5].answer = `On ${answerFirst9bPlus.date}, ${formatList(answerFirst9bPlus.names)} became the first to climb 5.15d (${answerFirst9bPlus.routeName})`;

    const answerFirst9c = climbersByDate(sportManData, '9c', 'first');
    FAQdata.europeanGrades.sportMan[6].answer = `On ${answerFirst9c.date}, ${formatList(answerFirst9c.names)} became the first to climb 9c (${answerFirst9c.routeName})`;
    FAQdata.americanGrades.sportMan[6].answer = `On ${answerFirst9c.date}, ${formatList(answerFirst9c.names)} became the first to climb 5.15d (${answerFirst9c.routeName})`;

    //sportWoman
    const answerFirst9aPlus = climbersByDate(sportWomanData, '9a+', 'first');
    FAQdata.europeanGrades.sportWoman[3].answer = `On ${answerFirst9aPlus.date}, ${formatList(answerFirst9aPlus.names)} became the first to climb 9a+ (${answerFirst9aPlus.routeName})`;
    FAQdata.americanGrades.sportWoman[3].answer = `On ${answerFirst9aPlus.date}, ${formatList(answerFirst9aPlus.names)} became the first to climb 5.15a (${answerFirst9aPlus.routeName})`;

    const answerFirst9b = climbersByDate(sportWomanData, '9b', 'first');
    FAQdata.europeanGrades.sportWoman[4].answer = `On ${answerFirst9b.date}, ${formatList(answerFirst9b.names)} became the first to climb 9b (${answerFirst9b.routeName})`;
    FAQdata.americanGrades.sportWoman[4].answer = `On ${answerFirst9b.date}, ${formatList(answerFirst9b.names)} became the first to climb 5.15b (${answerFirst9b.routeName})`;

    //const answerFirst9bPlusWoman = climbersByDate(sportWomanData, '9b+', 'first');
    FAQdata.europeanGrades.sportWoman[5].answer = `No woman has climbed 9b+, yet. Laura Rogoroa is the closest, having climbed Erebor where there's no consensus between 9b and 9b/+`;
    FAQdata.americanGrades.sportWoman[5].answer = `No woman has climbed 5.15c, yet. Laura Rogoroa is the closest, having climbed Erebor where there's no consensus between 9.15b and 5.15b/c`;

    //boulderMan
    const answerFirst8CPlus = climbersByDate(boulderManData, '8C+', 'first');
    FAQdata.europeanGrades.boulderMan[5].answer = `On ${answerFirst8CPlus.date}, ${formatList(answerFirst8CPlus.names)} became the first to climb 8C+ (${answerFirst8CPlus.routeName})`;
    FAQdata.americanGrades.boulderMan[5].answer = `On ${answerFirst8CPlus.date}, ${formatList(answerFirst8CPlus.names)} became the first to climb V16 (${answerFirst8CPlus.routeName})`;

    const answerFirst9A = climbersByDate(boulderManData, '9A', 'first');
    FAQdata.europeanGrades.boulderMan[6].answer = `On ${answerFirst9A.date}, ${formatList(answerFirst9A.names)} became the first to climb 9A (${answerFirst9A.routeName})`;
    FAQdata.americanGrades.boulderMan[6].answer = `On ${answerFirst9A.date}, ${formatList(answerFirst9A.names)} became the first to climb V17 (${answerFirst9A.routeName})`;

    //boulderWoman
    const answerFirst8BPlus = climbersByDate(boulderWomanData, '8B+', 'first');
    FAQdata.europeanGrades.boulderWoman[3].answer = `On ${answerFirst8BPlus.date}, ${formatList(answerFirst8BPlus.names)} became the first to climb 8B+`;
    FAQdata.americanGrades.boulderWoman[3].answer = `On ${answerFirst8BPlus.date}, ${formatList(answerFirst8BPlus.names)} became the first to climb V14`;

    const answerFirst8C = climbersByDate(boulderWomanData, '8C', 'first');
    FAQdata.europeanGrades.boulderWoman[4].answer = `On ${answerFirst8C.date}, ${formatList(answerFirst8C.names)} became the first to climb 8C (${answerFirst8C.routeName})`;
    FAQdata.americanGrades.boulderWoman[4].answer = `On ${answerFirst8C.date}, ${formatList(answerFirst8C.names)} became the first to climb V15 (${answerFirst8C.routeName})`;

    //const answerFirst9AWoman = climbersByDate(boulderWomanData, '9A', 'first');
    FAQdata.europeanGrades.boulderWoman[5].answer = `No woman has climbed 9A, yet`;
    FAQdata.americanGrades.boulderWoman[5].answer = `No woman has climbed V16, yet`;

    /*SECTION 5*/
    //What's the most recent ... ?

    //sportMan     
    const answerRecent9bPlus = climbersByDate(sportData, '9b+', 'recent');
    FAQdata.europeanGrades.sportMan[7].answer = `The most recent 9c climb was on ${answerRecent9bPlus.date}, by ${formatList(answerRecent9bPlus.names)} (${answerRecent9bPlus.routeName})`;
    FAQdata.americanGrades.sportMan[7].answer = `The most recent 5.15d climb was on ${answerRecent9bPlus.date}, by ${formatList(answerRecent9bPlus.names)} (${answerRecent9bPlus.routeName})`;

    const answerRecent9c = climbersByDate(sportData, '9c', 'recent');
    FAQdata.europeanGrades.sportMan[8].answer = `The most recent 9c climb was on ${answerRecent9c.date}, by ${formatList(answerRecent9c.names)} (${answerRecent9c.routeName})`;
    FAQdata.americanGrades.sportMan[8].answer = `The most recent 5.15d climb was on ${answerRecent9c.date}, by ${formatList(answerRecent9c.names)} (${answerRecent9c.routeName})`;

    //sportWoman
    const answerRecent9aPlus = climbersByDate(sportWomanData, '9a+', 'recent');
    FAQdata.europeanGrades.sportWoman[6].answer = `The most recent 9a+ climb was on ${answerRecent9aPlus.date}, by ${formatList(answerRecent9aPlus.names)} (${answerRecent9aPlus.routeName})`;
    FAQdata.americanGrades.sportWoman[6].answer = `The most recent 5.15a climb was on ${answerRecent9aPlus.date}, by ${formatList(answerRecent9aPlus.names)} (${answerRecent9aPlus.routeName})`;

    const answerRecent9b = climbersByDate(sportWomanData, '9b', 'recent');
    FAQdata.europeanGrades.sportWoman[7].answer = `The most recent 9b climb was on ${answerRecent9b.date}, by ${formatList(answerRecent9b.names)} (${answerRecent9b.routeName})`;
    FAQdata.americanGrades.sportWoman[7].answer = `The most recent 5.15b climb was on ${answerRecent9b.date}, by ${formatList(answerRecent9b.names)} (${answerRecent9b.routeName})`;

    //boulderMan
    const answerRecent8CPlus = climbersByDate(boulderData, '8C+', 'recent');
    FAQdata.europeanGrades.boulderMan[7].answer = `The most recent 8C+ climb was on ${answerRecent8CPlus.date}, by ${formatList(answerRecent8CPlus.names)} (${answerRecent8CPlus.routeName})`;
    FAQdata.americanGrades.boulderMan[7].answer = `The most recent V16 climb was on ${answerRecent8CPlus.date}, by ${formatList(answerRecent8CPlus.names)} (${answerRecent8CPlus.routeName})`;

    const answerRecent9A = climbersByDate(boulderData, '9A', 'recent');
    FAQdata.europeanGrades.boulderMan[8].answer = `The most recent 9A climb was on ${answerRecent9A.date}, by ${formatList(answerRecent9A.names)} (${answerRecent9A.routeName})`;
    FAQdata.americanGrades.boulderMan[8].answer = `The most recent V17 climb was on ${answerRecent9A.date}, by ${formatList(answerRecent9A.names)} (${answerRecent9A.routeName})`;

    //boulderWoman
    const answerRecent8BPlus = climbersByDate(boulderWomanData, '8B+', 'recent');
    FAQdata.europeanGrades.boulderWoman[6].answer = `The most recent 8B+ climb was on ${answerRecent8BPlus.date}, by ${formatList(answerRecent8BPlus.names)} (${answerRecent8BPlus.routeName})`;
    FAQdata.americanGrades.boulderWoman[6].answer = `The most recent V14 climb was on ${answerRecent8BPlus.date}, by ${formatList(answerRecent8BPlus.names)} (${answerRecent8BPlus.routeName})`;

    const answerRecent8C = climbersByDate(boulderWomanData, '8C', 'recent');
    FAQdata.europeanGrades.boulderWoman[7].answer = `The most recent 8C climb was on ${answerRecent8C.date}, by ${formatList(answerRecent8C.names)} (${answerRecent8C.routeName})`;
    FAQdata.americanGrades.boulderWoman[7].answer = `The most recent V15 climb was on ${answerRecent8C.date}, by ${formatList(answerRecent8C.names)} (${answerRecent8C.routeName})`;


    return FAQdata;
}
