import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./ImageModal.module.css"

const modalRoot = document.querySelector('#modal-root');

export default function ImageModal({ onClose, children }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Escape') {
                onClose();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return createPortal(
        <div className={css.overlay} onClick={handleBackdropClick}>
            <div className={css.modalBlock}>
                {children}
            </div>
        </div>,
        modalRoot
    );
    
}