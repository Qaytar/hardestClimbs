import { handleMouseEnter, handleMouseLeave, handleClick } from '../../utils/functionsHelpers';
import styles from './Popup.module.css';

function Popup(props) {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints;

    const eventHandlers = isTouchDevice ? {
        onClick: handleClick,
    } : {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
    };

    return (
        <span
            {...eventHandlers}
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