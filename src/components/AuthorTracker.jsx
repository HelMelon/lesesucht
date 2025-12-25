import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import "./AuthorsTracker.css";

export function AuthorsTracker() {
  const [authors, setAuthors] = useState([]);
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
              if (!book.author) return;

              const author = book.author.trim();

              if (!grouped[author]) {
                grouped[author] = {
                  author: author,
                  total: 0,
                  read: 0,
                  books: [],
                };
              }

              grouped[author].total += 1;

              if (book.isRead === "TRUE") {
                grouped[author].read += 1;
              }

              grouped[author].books.push(book);
            });

            setAuthors(Object.values(grouped));
          },
        });
      });
  }, []);

  return (
    <div className="authors-page">
      {authors.map((s) => {
        const percent =
          s.total === 0 ? 0 : Math.round((s.read / s.total) * 100);

        return (
          <div key={s.author} className="author-card">
            <div className="author-header">
              <h2>{s.author}</h2>
              <span className="author-percent">{percent}%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>

            <div className="author-stats">
              {s.read} из {s.total} книг
            </div>

            {/* СПИСОК КНИГ */}
            <ul className="author-book-list">
              {s.books.map((book, index) => (
                <li
                  key={index}
                  className={`author-book ${
                    book.isRead === "TRUE" ? "read" : ""
                  }`}
                >
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
