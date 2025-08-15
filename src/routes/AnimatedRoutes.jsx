// routes/AnimatedRoutes.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageWrapper from "../components/pageWrapper/PageWrapper";
import ProtectedRoutes from "./ProtectedRoutes";
import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Movies = lazy(() => import("../pages/Movies"));
const TVshows = lazy(() => import("../pages/TVshows"));
const Bookmarked = lazy(() => import("../pages/Bookmarked"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));

const HomeLayout = lazy(() => import("../layouts/HomeLayout"));
const HomeLayoutInner = lazy(() => import("../layouts/HomeLayoutInner"));
const LoginLayout = lazy(() => import("../layouts/LoginLayout"));
const RegisterLayout = lazy(() => import("../layouts/RegisterLayout"));

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
