import styles from './PopupInstructions.module.css';
import Popup from '../ui/Popup';

function PopupInstructions() {

    const popupContent = 'Yup, just like that :).';

    return (
        <div className={styles.wrapper}>
            <i className={styles.noteInstructions}>
                <Popup popupContent={popupContent}>underlined text</Popup>&nbsp;hides extra info
            </i>
        </div >
    )
}

export default PopupInstructions;