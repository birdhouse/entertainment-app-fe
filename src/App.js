// App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
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

// Page transition wrapper
const PageWrapper = ({ children }) => {
  const variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: "100%" }}
    >
      {children}
    </motion.div>
  );
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/signin"
          element={
            <PageWrapper>
              <LoginLayout />
            </PageWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <PageWrapper>
              <RegisterLayout />
            </PageWrapper>
          }
        />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomeLayout />}>
            <Route
              path="profile"
              element={
                <PageWrapper>
                  <ProfilePage />
                </PageWrapper>
              }
            />

            <Route element={<HomeLayoutInner />}>
              <Route
                index
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="movie"
                element={
                  <PageWrapper>
                    <Movies />
                  </PageWrapper>
                }
              />
              <Route
                path="tv"
                element={
                  <PageWrapper>
                    <TVshows />
                  </PageWrapper>
                }
              />
              <Route
                path="bookmarked"
                element={
                  <PageWrapper>
                    <Bookmarked />
                  </PageWrapper>
                }
              />
            </Route>
          </Route>
        </Route>

        <Route
          path="*"
          element={
            <PageWrapper>
              <h1>Not Found</h1>
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
