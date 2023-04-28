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
        return send.climber.gender === gender && send.route.discipline === discipline;
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


