// App.jsx or App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

import Movies from "./pages/Movies";
import TVshows from "./pages/TVshows";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Bookmarked from "./pages/Bookmarked";
import HomeLayoutInner from "./layouts/HomeLayoutInner";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import ProfilePage from "./pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<LoginLayout />} />
        <Route path="/signup" element={<RegisterLayout />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeLayout />}>
            <Route path="profile" element={<ProfilePage />} />

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

// 1.1 page transitions
/* 
  tutorial
*/

// 2.0 reformat code
