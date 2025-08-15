import React, { useCallback, useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshMutation } from "../services/authApi";
import { setCredentials } from "../features/authSlice";

// const ProtectedRoutes = () => {
//   const { accessToken } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(true);
//   const dispatch = useDispatch();
//   const [refresh] = useRefreshMutation();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyRefreshToken = async () => {
//       if (!accessToken) {
//         try {
//           const data = await refresh().unwrap();
//           dispatch(setCredentials({ accessToken: data.accessToken }));
//           navigate("/");
//         } catch (err) {
//           // refresh token invalid or expired
//           console.log(err);
//         }
//       }
//       setLoading(false);
//     };

//     verifyRefreshToken();
//   }, [accessToken, dispatch, refresh, navigate]);

//   if (loading) return <p>Loading...</p>;

//   return accessToken ? <Outlet /> : <Navigate to="/signin" />;
// };
const ProtectedRoutes = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  const verifyRefreshToken = useCallback(async () => {
    if (!accessToken) {
      try {
        const data = await refresh().unwrap();
        dispatch(setCredentials({ accessToken: data.accessToken }));
      } catch (err) {
        console.log(err);
      }
    }
    setLoading(false);
  }, [accessToken, dispatch, refresh]);

  useEffect(() => {
    verifyRefreshToken();
  }, [verifyRefreshToken]);

  if (loading) return <p>Loading...</p>;
  return accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
