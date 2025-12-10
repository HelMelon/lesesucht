import logo from "./../assets/logo.png";
import "./Header.css";

import { Routes, Route, Link } from "react-router-dom";
import { BooksPage } from "./../pages/BooksPage";
import { SeriesPage } from "./../pages/SeriesPage";
import { AuthorsPage } from "./../pages/AuthorsPage";
import { ShelvesPage } from "./../pages/ShelvesPage";
import { BookshelfNav } from "./BookshelfNav";
export function Header() {
  return (
    <div className="header">
      <Link className="logo" to="/books">
        <img src={logo} alt="" />
        <h2>Lesesucht</h2>
      </Link>
      <nav className=".bookshelf-nav">
        <Link className="book-link" to="/books">
          Книги
        </Link>
        <Link className="book-link" to="/series">
          Циклы
        </Link>
        <Link className="book-link" to="/authors">
          Авторы
        </Link>
        <Link className="book-link" to="/shelves">
          Полки
        </Link>
      </nav>
    </div>
  );
}
