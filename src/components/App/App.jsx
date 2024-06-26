import { useState,useEffect } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { ToastContainer } from "react-toastify";
import css from "./App.module.css";
import api from '../../services/api';

const status = {
  IDLE: 'idle',
  NOTHING_FOUND: 'nothing found',
  LAST_PAGE: 'last page',
  RESOLVED: 'resolved',
  ERROR: 'error'
}

export default function App() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [page, setPage] = useState(1);
  const [galleryItems, setGalleryItems] = useState([]);
  const [statusState, setStatusState] = useState(status.IDLE);
  const [showModal, setShowModal] = useState(false);
  const [imageInModal, setImageInModal] = useState({ imageUrl: '', altImageText: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchPhrase) {
      return;
    }
    if (page === 1) {
      setGalleryItems([]);
      setIsLoading(true);
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
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
      })
      .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, searchPhrase]);

  const handleSearchSubmit = (query) => {
    setPage(1);
    setSearchPhrase(query);
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

  const handleLoadMoreBtnClick = () => {
    setPage(page + 1);
  }

  if (statusState === status.IDLE) {
    return (
      <div className={css.wrapper}>
        <Searchbar onSubmit={handleSearchSubmit} />
        {isLoading && <Loader />}
        {!isLoading && <h1 className={css.heading}>You have not searched yet...</h1>}
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }

  if (statusState === status.RESOLVED) {
    return (
      <div className={css.wrapper}>
        <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery galleryItems={galleryItems} handleImageClick={handleImageClick} />
        {isLoading && <Loader />}
        {!isLoading && <LoadMoreBtn onClick={handleLoadMoreBtnClick} />}
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
        >
          <img className={css.image} src={imageInModal.imageUrl} alt={imageInModal.altImageText} width='100%' height='100%' />
        </ImageModal>
        <ToastContainer autoClose={3000}/>
      </div>
      );
  }

  if (statusState === status.LAST_PAGE) {
    return (
      <div className={css.wrapper}>
        <Searchbar onSubmit={handleSearchSubmit} />
        <ImageGallery galleryItems={galleryItems} handleImageClick={handleImageClick} />
        {isLoading && <Loader />}
        {!isLoading && <h1 className={css.heading}>That is all we found for your request.</h1>}
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
        >
          <img className={css.image} src={imageInModal.imageUrl} alt={imageInModal.altImageText} />
        </ImageModal>
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }

  if (statusState === status.NOTHING_FOUND) {
    return (
      <div className={css.wrapper}>
        <Searchbar onSubmit={handleSearchSubmit} />
        {isLoading && <Loader />}
        {!isLoading && <h1 className={css.heading}>Sorry, we could not find any matches...</h1>}
        <ToastContainer autoClose={3000}/>
      </div>
    );
  }

  if (statusState === status.ERROR) {
    return (
      <div className={css.wrapper}>
        <Searchbar onSubmit={handleSearchSubmit} />
        {isLoading && <Loader />}
        {!isLoading && <ErrorMessage />}
        <ToastContainer autoClose={3000}/>
      </div>      
    );
  }
}