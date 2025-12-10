import { useState } from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Books } from "./components/Books";
import { SeriesTracker } from "./components/SeriesTracker";
import { Routes, Route, Link } from "react-router-dom";
import { BooksPage } from "./pages/BooksPage";
import { SeriesPage } from "./pages/SeriesPage";
import { AuthorsPage } from "./pages/AuthorsPage";
import { ShelvesPage } from "./pages/ShelvesPage";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/books" element={<BooksPage />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/authors" element={<AuthorsPage />} />
        <Route path="/shelves" element={<ShelvesPage />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
