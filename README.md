# lesesucht — трекер чтения

SPA для учёта прочитанного: книги, авторы, циклы книг и полки. React 19 + Vite.

## Что умеет

- полки пользователя: разложить книги по подборкам
- книги с карточками и обложками
- авторы и циклы (серии) — отдельные разделы
- импорт данных из CSV (`papaparse`)
- маршруты вида `/:user/books`, `/:user/series`, `/:user/authors`, `/:user/shelves`

## Стек

React 19, React Router 7, Vite 7, papaparse, CSS-модули вручную (у каждого компонента свой `.css`).
React Compiler включён через Babel-плагин.

## Структура

```
src/
  pages/       # BooksPage, AuthorsPage, SeriesPage, ShelvesPage
  components/  # BookCard, Books, Header, Footer, *Tracker, BookshelfNav
  layouts/     # UserLayout
  App.jsx      # маршруты
```

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run lint
```
