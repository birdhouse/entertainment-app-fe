// routes/AnimatedRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../components/pageWrapper/PageWrapper";

import Home from "../pages/Home";
import Movies from "../pages/Movies";
import TVshows from "../pages/TVshows";
import Bookmarked from "../pages/Bookmarked";
import ProfilePage from "../pages/ProfilePage";

import HomeLayout from "../layouts/HomeLayout";
import HomeLayoutInner from "../layouts/HomeLayoutInner";
import LoginLayout from "../layouts/LoginLayout";
import RegisterLayout from "../layouts/RegisterLayout";
import ProtectedRoutes from "./ProtectedRoutes";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public routes */}
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
    </AnimatePresence>
  );
}
