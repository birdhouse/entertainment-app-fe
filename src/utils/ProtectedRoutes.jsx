import React, { use, useEffect, useState } from "react";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRefreshMutation } from "../services/authApi";
import { setCredentials } from "../features/authSlice";

const ProtectedRoutes = () => {
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [refresh] = useRefreshMutation();

  const navigate = useNavigate();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      if (!accessToken) {
        try {
          const data = await refresh().unwrap();
          dispatch(setCredentials({ accessToken: data.accessToken }));
          navigate("/");
        } catch (err) {
          // refresh token invalid or expired
          console.log(err);
        }
      }
      setLoading(false);
    };

    verifyRefreshToken();
  }, [accessToken, dispatch, refresh]);

  if (loading) return <p>Loading...</p>;

  return accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
