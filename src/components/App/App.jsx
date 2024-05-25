import { useState } from "react";
import Searchbar from "../Searchbar/Searchbar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { ToastContainer } from "react-toastify";
import css from "./App.module.css";

export default function App() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const [page, setPage] = useState(1);

  const handleSearchSubmit = (query) => {
    setPage(1);
    setSearchPhrase(query);
  }

  return (
    <div className={css.wrapper}>
        <Searchbar onSubmit={handleSearchSubmit} />
          <ImageGallery searchPhrase={searchPhrase} page={page} setPageNumber={setPage} />
        <ToastContainer autoClose={3000}/>
    </div>
  );
}