import styles from '../components/sendsPagesComp/ComponentStyles.module.css';

/**filterSends
 * Filters and sorts sends based on discipline, gender, and an optional limit.
 * @param {Array} data - The array of sends to filter and sort.
 * @param {string} discipline - The climbing discipline to filter by (e.g. 'sport', 'boulder').
 * @param {string} gender - The gender to filter by (e.g. 'man', 'woman').
 * @param {number} [limit] - The maximum number of sends to return. If not provided, all matching sends will be returned.
 * @returns {Array} - The filtered and sorted sends.
 */
export function filterSends(data, discipline, gender, limit) {
    // Filter sends by the specified discipline and gender
    const filteredData = data.filter(function (send) {
        if (gender === 'all') {
            return send.route.discipline === discipline;
        } else {
            return send.climber.gender === gender && send.route.discipline === discipline;
        }
    });

    // Sort sends by date in descending order (most recent first)
    const sortedData = filteredData.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    // If limit is provided, slice the array to return only the specified number of sends
    const limitedData = sortedData.slice(0, limit || data.length);

    // Map over the filtered and sorted sends to format the date
    const formattedData = limitedData.map(function (send) {
        return {
            ...send,
            date: new Date(send.date).toLocaleString('en-US', { month: 'short', year: 'numeric' }),
        };
    });

    return formattedData;
}



/**rankClimbers
 * Ranks climbers based on their sends.
 * @param {Array} data - The array of sends to rank.
 * @returns {Array} - The ranked climbers.
 *PENDING TO DOCUMENT AND UNDERSTAND THIS FUNCTION
 */
const { rankedEuropeanGrades } = require('../utils/rankedGrades');
export function rankClimbers(sends) {
    const climbers = new Map();

    for (const send of sends) {
        const { climber, route } = send;

        if (!climbers.has(climber._id)) {
            climbers.set(climber._id, {
                climber,
                sends: [],
            });
        }

        climbers.get(climber._id).sends.push(route);
    }


    const rankedClimbers = Array.from(climbers.values())
        .map(({ climber, sends }) => ({
            climber,
            sends: {
                sport: sends.filter((route) => route.discipline === 'sport'),
                boulder: sends.filter((route) => route.discipline === 'boulder'),
            },
        }))
        .sort((a, b) => {
            const sportComparison = compareByGrades(a.sends.sport, b.sends.sport, rankedEuropeanGrades.sport);
            if (sportComparison !== 0) return sportComparison;

            const boulderComparison = compareByGrades(a.sends.boulder, b.sends.boulder, rankedEuropeanGrades.boulder);
            return boulderComparison;
        });


    return rankedClimbers;
}

function compareByGrades(aSends, bSends, gradeList) {
    const aGrades = countSendsByGrade(aSends, gradeList);
    const bGrades = countSendsByGrade(bSends, gradeList);

    for (let i = 0; i < gradeList.length; i++) {
        if (aGrades[i] > bGrades[i]) return -1;
        if (aGrades[i] < bGrades[i]) return 1;
    }

    return 0;
}

function countSendsByGrade(sends, gradeList) {
    const gradeCount = new Array(gradeList.length).fill(0);

    for (const send of sends) {
        const index = gradeList.indexOf(send.europeanGrade);
        if (index !== -1) {
            gradeCount[index]++;
        }
    }

    return gradeCount;
}

/**countClimbers, used in the subtitles of the pages
 * Counts the number of unique climbers in an array of sends.
 * @param {Array} sendsArray - An array of sends objects to count climbers from.
 * @param {Array} targetGrades - (optional) If present, it will return the number of climbers that climbed at least 1 route of any of the grades within the array.
 *  
 */
export const countClimbers = (sendsArray, targetGrades) => {
    const uniqueClimbers = new Set();

    for (let send of sendsArray) {
        if (send.climber) {
            if (!targetGrades || (send.route && targetGrades.includes(send.route.europeanGrade))) {
                uniqueClimbers.add(send.climber._id.toString());
            }
        }
    }

    return uniqueClimbers.size;
}



/**hadleMouseEnter, handleMouseLeave and handleClick
 * Two functions to handle the hover effect over the grade to display the note
 * @param {event} event - The event that triggers the function
 *  
 */

export const handleMouseEnter = (event) => {
    const popup = event.target.querySelector(`.${styles.gradeNotePopup}`);
    if (popup) {
        popup.style.display = 'block';
    }
};
export const handleMouseLeave = (event) => {
    const popup = event.target.querySelector(`.${styles.gradeNotePopup}`);
    if (popup) {
        popup.style.display = 'none';
    }
};

export const handleClick = (event) => {
    const popup = event.target.querySelector(`.${styles.gradeNotePopup}`);
    if (popup) {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
    }
};


