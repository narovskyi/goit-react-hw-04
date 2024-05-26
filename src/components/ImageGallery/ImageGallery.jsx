import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";

export default function ImageGallery({galleryItems, handleImageClick }) {
    return (
        <>
            <ul className={css.gallery}>                   
                {galleryItems.map(({id, urls, alt_description}) => {
                    return (
                        <li key={id}>
                            <ImageCard largeImage={urls.regular} smallImage={urls.small} altText={alt_description} onClick={handleImageClick} />
                        </li>
                    );
                })}
            </ul>
        </>
    );
}