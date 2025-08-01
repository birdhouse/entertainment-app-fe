// App.jsx or App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Movies from "./pages/Movies";
import TVshows from "./pages/TVshows";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Bookmarked from "./pages/Bookmarked";
import HomeLayoutInner from "./layouts/HomeLayoutInner";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<h1>Sign In</h1>} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeLayout />}>
            <Route element={<HomeLayoutInner />}>
              <Route index element={<Home />} />
              <Route path="movie" element={<Movies />} />
              <Route path="tv" element={<TVshows />} />
              <Route path="bookmarked" element={<Bookmarked />} />
            </Route>
          </Route>
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

// nav
// styles

// backend
// mongoDB
// JWT auth
