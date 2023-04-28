import { Link } from 'react-router-dom';
import filterSends from '../utils/filterSends';

function HomePage(props) {


    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <h3>Navigation</h3>
                <ul>
                    <li>
                        <Link to='/SportWoman'>SportWoman</Link>
                    </li>
                    <li>
                        <Link to='/SportWoman2'>SportWoman2</Link>
                    </li>
                    <li>
                        <Link to='/SportMan'>SportMan</Link>
                    </li>
                    <li>
                        <Link to='/BoulderWoman'>BoulderWoman</Link>
                    </li>
                    <li>
                        <Link to='/BoulderMan'>BoulderMan</Link>
                    </li>
                </ul>
            </nav>
            <section>
                <h4>Summary Tables</h4>
                <div>
                    <h5>Sport Climbing - Woman</h5>
                    {filterSends(props.data, 'sport', 'woman', 3).map((send, index) => (
                        <p key={index}>
                            {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                        </p>
                    ))}
                </div>
                <div>
                    <h5>Sport Climbing - Man</h5>
                    {filterSends(props.data, 'sport', 'man', 3).map((send, index) => (
                        <p key={index}>
                            {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                        </p>
                    ))}
                </div>
                <div>
                    <h5>Boulder - Man</h5>
                    {filterSends(props.data, 'boulder', 'man', 3).map((send, index) => (
                        <p key={index}>
                            {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                        </p>
                    ))}
                </div>
                <div>
                    <h5>Boulder - Woman</h5>
                    {filterSends(props.data, 'boulder', 'woman', 3).map((send, index) => (
                        <p key={index}>
                            {send.route.name} ({send.route.europeanGrade}), by {send.climber.name} on {send.date}
                        </p>
                    ))}
                </div>

            </section>
        </div>
    )
}

export default HomePage;