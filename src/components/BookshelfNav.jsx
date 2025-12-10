import { Link } from "react-router-dom";
import "./BookshelfNav.css";
export function BookshelfNav() {
  return (
    <nav className="simple-nav">
      <Link to="/books">Книги</Link>
      <Link to="/series">Циклы</Link>
      <Link to="/authors">Авторы</Link>
      <Link to="/shelves">Полки</Link>
    </nav>
  );
}
