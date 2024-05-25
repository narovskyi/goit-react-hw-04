import css from "./LoadMoreButton.module.css";

export default function LoadMoreButton({ onClick }) {
    return <button className={css.button} onClick={onClick}>Load more</button>;
}