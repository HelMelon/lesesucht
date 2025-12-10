import "./BookCard.css";
export function BookCard({ book }) {
  return (
    <div className="book-card">
      <div className="book-spine" />

      <div className="book-content">
        <div className="book-title">{book.name}</div>
        <div className="book-author">{book.author}</div>

        <div className="book-meta">
          <span>{book.year}</span>
          <span>{book.genres}</span>
        </div>

        {book.series && (
          <div className="book-series">
            {book.series} · #{book.seriesOrder}
          </div>
        )}

        <div className="book-flags">
          {book.isRead === "true" && <span className="flag read">Read</span>}
          {book.isReread === "true" && (
            <span className="flag reread">Reread</span>
          )}
          {book.isOnShelf === "true" && (
            <span className="flag shelf">{book.shelf}</span>
          )}
        </div>
      </div>
    </div>
  );
}
