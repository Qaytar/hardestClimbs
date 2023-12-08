/**
 * rankedGrades.js
 * 
 * This file simply contains some useful constants.
 * They need to be maintained by the admin with climbing criteria as things change. * 
 */

export const rankedEuropeanGrades = {
    sport: ['9c', '9b+', '9b+ or 9b/+', '9b or 9b/+', '9b', '9b or 9a+', '9a+'],
    boulder: ['9A', '9A or 8C+', '8C+', '8C+ or 8C', '8C', '8C+ or 8C', '8B+', '8B+ or 8B']
}

export const rankedAmericanGrades = {
    sport: ['5.15d', '5.15c', '5.15c or 5.15b/c', '5.15b or 5.15b/c', '5.15b', '5.15b or 5.15a', '5.15a'],
    boulder: ['V17', 'V17 or V16', 'V16', 'V16 or V15', 'V15', 'V15 or V14', 'V14', 'V14 or V13']
}

export const highestGrades = {
    sport:
    {
        woman: ['9b', '9b or 9b/+', '9b or 9a+'],
        man: ['9c'],
    },
    boulder: {
        man: ['9A', '9A or 8C+'],
        woman: ['8C']
    }
}

export const AmericanHighestGrades = {
    sport:
    {
        woman: ['5.15b', '5.15b or 5.15b/c', '5.15b or 5.15a'],
        man: ['5.15d'],
    },
    boulder: {
        man: ['V17', 'V17 or V16'],
        woman: ['V16 or V15', 'V15', 'V15 or V14']
    }
}

export const cutOffGrades = {
    sport:
    {
        woman: ['9a+'],
        man: ['9b+'],
    },
    boulder: {
        man: ['8C+'],
        woman: ['8B+']
    }
}

export const AmericanCutOffGrades = {
    sport:
    {
        woman: ['5.15a'],
        man: ['5.15c'],
    },
    boulder: {
        man: ['V16'],
        woman: ['V14']
    }
}