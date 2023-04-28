// import filterSends from '../utils/filterSends';
// function SportWomanPage2(props) {
//     const climberSends = fetchClimberSends(climber.name, props.SendData)
//     return (
//         <div>
//             <h1>SportWomanPage2</h1>
//             {filterClimbers(props.ClimberData, 'sport', 'woman').map((climber, index) => (
//                 <p key={index}>
//                     {climber.name} - //map thru all sends for this climber available in climberSends and display send[0].route.name(send[0].route.grade), etc..
                            //which should look like Adam Ondra - Silence(9c), Pura Vida(9b+), ...

//                 </p>
//             ))}
//         </div>
//     )
// }

//AND! filterClimber should also retrieve them sorted by the ranking to be developed. function could be calle rankClimbers and look like rankClimbers(sport, woman)
//if its too trucky maybe its better so separae and have filterClimber(woman, sport) and then have 4 functions for ranking like.. rankSportWoman([arrayOfClimber]), etc.
//doesnt seem like it would be to tricky. Just implement one ranking option u just need to stablish a grade hierarchy and keep that updated.
// export default SportWomanPage2;