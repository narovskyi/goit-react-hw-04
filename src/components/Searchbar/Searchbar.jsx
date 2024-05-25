import { useState } from "react";
import css from "./Searchbar.module.css"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Searchbar({ onSubmit }) {
    const [searchPhrase, setSearchPhrase] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        if (searchPhrase.trim() === '') {
            toast.warn('Enter something to search!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
            setSearchPhrase('');
            return;
        }

        onSubmit(searchPhrase.trim());
        setSearchPhrase('');
    }
    
    const handleInputChange = (e) => {
        setSearchPhrase(e.target.value);
    }

    return (
        <header className={css.header}>
            <form
                className={css.searchForm}
                onSubmit={handleSubmit}
            >
                <button
                    className={css.button}
                    type="submit"
                >
                    <span className={css.buttonLabel}>Search</span>
                </button>

                <input
                    className={css.searchInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    value={searchPhrase}
                    onChange={handleInputChange}
                />
            </form>
        </header>
    )
}