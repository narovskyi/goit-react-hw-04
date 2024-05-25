import css from "./ImageGalleryItem.module.css"

export default function ImageGalleryItem({ largeImage, smallImage, altText, onClick }) {
    return (
            <img
                className={css.image}
                src={smallImage}
                alt={altText}
                onClick={onClick}
                data-image={largeImage}
                data-alt={altText}
            />
    );
}