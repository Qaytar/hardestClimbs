import { emptyFaqMetaData } from "./emptyFaqMetadata";

faqMetaData = emptyFaqMetaData;

//here will define functions that will help retrieve data that will be used to populate answers
//This function will help populate the questions of the sort 'how many people have climbed 5.15d?'
function fetchClimber(data, grade) {

}

export function populateFaqMetaData(data) {
    /*SECTION 1*/
    //using the functions defined above to phrase an answer and assing it to its question

    faqMetaData.americanGrades.sportMan[0].answer = `Only ${fetchClimber(data, '5.15d').lenght} people have climberd 5.15d. They are: ${fetchClimber(data, '5.15d')}`;



    /*SECTION 2, 3 etc.*/
    //other functions will help fetch the data of question of different natura like 'how many v17 boulders are there?' or 'whos is the strongest female climber?'

    return faqMetaData;
}
