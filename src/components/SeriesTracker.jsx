import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Papa from "papaparse";
import "./SeriesTracker.css";

export function SeriesTracker() {
  const [series, setSeries] = useState([]);
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
              if (!book.series) return;

              const name = book.series.trim();

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

            // сортировка книг внутри серии по порядку
            Object.values(grouped).forEach((s) => {
              s.books.sort((a, b) => {
                const aa = Number(a.seriesOrder) || 0;
                const bb = Number(b.seriesOrder) || 0;
                return aa - bb;
              });
            });

            setSeries(Object.values(grouped));
          },
        });
      });
  }, []);

  return (
    <div className="series-page">
      {series.map((s) => {
        const percent =
          s.total === 0 ? 0 : Math.round((s.read / s.total) * 100);

        return (
          <div key={s.name} className="series-card">
            <div className="series-header">
              <h2>{s.name}</h2>
              <p>{s.author}</p>
              <span className="series-percent">{percent}%</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>

            <div className="series-stats">
              {s.read} из {s.total} книг
            </div>

            {/* СПИСОК КНИГ */}
            <ul className="series-book-list">
              {s.books.map((book, index) => (
                <li
                  key={index}
                  className={`series-book ${
                    book.isRead === "TRUE" ? "read" : ""
                  }`}
                >
                  <span className="book-order">{book.seriesOrder || "–"}</span>

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
