import { handleMouseEnter, handleMouseLeave, handleClick } from '../../utils/functionsHelpers';
import styles from './Popup.module.css';

function Popup(props) {
    return (
        <span
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={`
                ${styles.hoverableSpan}     
                ${(props.popupContent) && styles.underlineForPopup}
                ${(props.styles) && styles[props.styles]}                      
            `}
        >
            {props.children}

            {/* //Displays a popup with the note if there is one */}
            {props.popupContent && (<span className={styles.popupNote}>{props.popupContent}</span>)}
        </span>
    )
}

export default Popup;