import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UserLayout } from "./layouts/UserLayout";
import { BooksPage } from "./pages/BooksPage";
import { SeriesPage } from "./pages/SeriesPage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { ShelvesPage } from "./pages/ShelvesPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/:user" element={<UserLayout />}>
          <Route path="books" element={<BooksPage />} />
          <Route path="series" element={<SeriesPage />} />
          <Route path="authors" element={<AuthorsPage />} />
          <Route path="shelves" element={<ShelvesPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
