import css from "./ImageModal.module.css"
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function ImageModal({ onRequestClose, isOpen, children }) {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={css.modal}
            overlayClassName={css.overlay}
        >
            {children}
        </Modal>        
    );
    
}