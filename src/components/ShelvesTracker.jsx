import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import "./ShelvesTracker.css";

export function ShelvesTracker() {
  const [shelves, setShelves] = useState([]);
  const { user } = useParams();

  useEffect(() => {
    fetch(`/books-list-${user}.csv`)
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const books = results.data;

            const grouped = {};

            books.forEach((book) => {
              if (!book.shelf) return;

              const name = book.shelf.trim();

              if (!grouped[name]) {
                grouped[name] = {
                  name,
                  author: "",
                  total: 0,
                  read: 0,
                  books: [],
                };
              }

              grouped[name].total += 1;
              if (book.isRead === "TRUE") {
                grouped[name].read += 1;
              }
              grouped[name].author = book.author;
              grouped[name].books.push(book);
            });
            setShelves(Object.values(grouped));
          },
        });
      });
  }, []);

  return (
    <div className="shelves-page">
      {shelves.map((s) => {
        const percent =
          s.total === 0 ? 0 : Math.round((s.read / s.total) * 100);

        return (
          <div key={s.name} className="shelf-card">
            <div className="shelf-header">
              <h2>{s.name}</h2>
              <span className="shelf-percent">{percent}%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>

            <div className="shelf-stats">
              {s.read} из {s.total} книг
            </div>

            {/* СПИСОК ПОЛОК */}
            <ul className="shelf-book-list">
              {s.books.map((book, index) => (
                <li
                  key={index}
                  className={`shelves-book ${
                    book.isRead === "TRUE" ? "read" : ""
                  }`}
                >
                  <span className="book-author">{book.author}</span>

                  <span className="book-name">{book.name}</span>

                  {book.isRead === "TRUE" && (
                    <span className="book-check">✓</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
