import styles from './MainButton.module.css';
import { Link } from 'react-router-dom';

function MainButton(props) {
    return (
        <Link to={props.to} className={styles.mainButton}>{props.children}</Link>
    );
}

export default MainButton;