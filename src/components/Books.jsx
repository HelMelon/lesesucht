import { useEffect, useState } from "react";
import Papa from "papaparse";
import { BookCard } from "./BookCard";

export function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("/my-books.csv")
      .then((res) => res.text())
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setBooks(results.data);
          },
        });
      });
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}
