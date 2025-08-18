// routes/AnimatedRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../components/pageWrapper/PageWrapper";
import ProtectedRoutes from "./ProtectedRoutes";
import { lazy, Suspense } from "react";

// Eager imports (auth pages)
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Lazy imports (everything else)
const Home = lazy(() => import("../pages/home/Home"));
const Movies = lazy(() => import("../pages/movies/Movies"));
const TVshows = lazy(() => import("../pages/tvshows/TVshows"));
const Bookmarked = lazy(() => import("../pages/bookmarked/Bookmarked"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));

const HomeLayout = lazy(() => import("../layouts/outerLayoutWithNav/HomeLayout"));
const HomeLayoutInner = lazy(() => import("../layouts/innerLayoutWithSearch/HomeLayoutInner"));

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          {/* Public routes (eagerly loaded) */}
          <Route
            path="/signin"
            element={
              <PageWrapper>
                <LoginPage />
              </PageWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <PageWrapper>
                <RegisterPage />
              </PageWrapper>
            }
          />

          {/* Protected routes */}
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

          {/* Fallback */}
          <Route
            path="*"
            element={
              <PageWrapper>
                <h1>Not Found</h1>
              </PageWrapper>
            }
          />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
