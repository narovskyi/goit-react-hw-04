import css from "./ImageCard.module.css"

export default function ImageCard({ largeImage, smallImage, altText, onClick }) {
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