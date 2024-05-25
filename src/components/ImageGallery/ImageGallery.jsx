import { useState, useEffect } from "react";
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImgaeGalleryItem/ImageGalleryItem";
import Loader from "../Loader/Loader";
import LoadMoreButton from "../LoadMoreButton/LoadMoreButton";
import Modal from "../Modal/Modal";
import api from '../../services/api'

const status = {
    IDLE: 'idle',
    PENDING: 'pending',
    NOTHING_FOUND: 'nothing found',
    LAST_PAGE: 'last page',
    RESOLVED: 'resolved',
    ERROR: 'error'
}

export default function ImageGallery({ searchPhrase, page, setPageNumber }) {
    const [galleryItems, setGalleryItems] = useState([]);
    const [statusState, setStatusState] = useState(status.IDLE);
    const [showModal, setShowModal] = useState(false);
    const [imageInModal, setImageInModal] = useState({ imageUrl: '', altImageText: '' });
    
    useEffect(() => {
        if (!searchPhrase) {
            return;
        }
        if (page === 1) {
            setStatusState(status.PENDING);
            api.fetchPhoto(page, searchPhrase)
                .then(photos => {
                    if (photos.length === 0) {
                        setStatusState(status.NOTHING_FOUND);
                    } else if (photos.length < 12 && photos.length > 0) {
                        setGalleryItems([...photos]);
                        setStatusState(status.LAST_PAGE);
                    } else {
                        setGalleryItems([...photos]);
                        setStatusState(status.RESOLVED);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setGalleryItems([]);
                    setStatusState(status.ERROR);
                });
        } else {
            api.fetchPhoto(page, searchPhrase)
            .then(photos => {
                if (photos.length < 12 && photos.length >= 0) {
                    setGalleryItems(prevGalleryItems => [...prevGalleryItems, ...photos]);
                    setStatusState(status.LAST_PAGE);
                } else {
                    setGalleryItems(prevGalleryItems => [...prevGalleryItems, ...photos]);
                    setStatusState(status.RESOLVED);
                }
            })
            .catch(() => {
                setGalleryItems([]);
                setStatusState(status.ERROR);
            });
        }
    }, [page, searchPhrase]);

    const handleButtonClick = () => {
        setPageNumber(page + 1);
    }

    const closeModal = () => {
        setShowModal(false);
        setImageInModal({});
    }

    const handleImageClick = (e) => {
        setShowModal(true);
        setImageInModal({
            imageUrl: e.target.dataset.image,
            altImageText: e.target.dataset.alt
        });
    }
    
    if (statusState === status.IDLE) {
        return (
            <h1 className={css.heading}>You have not searched yet...</h1>
        );
    }

    if (statusState === status.PENDING) {
        return (
            <Loader />
        );
    }

    if (statusState === status.RESOLVED) {
        return (
        <>
            <ul className={css.gallery}>
                {galleryItems.map(({id, urls, alt_description}) => {
                    return (
                        <li key={id}>
                            <ImageGalleryItem largeImage={urls.regular} smallImage={urls.small} altText={alt_description} onClick={handleImageClick} />
                        </li>
                    );
                })}
            </ul>
                {showModal && <Modal onClose={closeModal}>
                    <img className={css.image} src={imageInModal.imageUrl} alt={imageInModal.altImageText} />
                </Modal>}
            <LoadMoreButton onClick={handleButtonClick} />
        </>
        );
    }

    if (statusState === status.LAST_PAGE) {
        return (
        <>
            <ul className={css.gallery}>
                {galleryItems.map(({id, urls, alt_description}) => {
                    return (
                        <li key={id}>
                            <ImageGalleryItem largeImage={urls.regular} smallImage={urls.small} altText={alt_description} onClick={handleImageClick} />
                        </li>
                    )
                })}
            </ul>
                {showModal && <Modal onClose={closeModal}>
                    <img className={css.image} src={imageInModal.imageUrl} alt={imageInModal.altImageText} />
                </Modal>}
            <h1 className={css.heading}>That is all we found for your request.</h1>
        </>
        );
    }

    if (statusState === status.NOTHING_FOUND) {
        return (
            <h1 className={css.heading}>Sorry, we could not find any matches...</h1>
        );
    }

    if (statusState === status.ERROR) {
        return (
            <h1 className={css.heading}>Sorry, something went wrong...</h1>
        );
    }
}