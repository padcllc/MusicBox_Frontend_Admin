import React, { useEffect} from "react";

import { useSelector } from "react-redux";

import { MainRoutes } from "./mainRoutes";
import { AuthRoutes } from "./authRoutes";
import { accessTokenSelector } from "../pages/auth/login/slice/login";


export function Routes() {

  const accessToken = useSelector(accessTokenSelector);
  useEffect(() => {
  },[accessToken]);
  return (
    <>
      <div>{accessToken ? <MainRoutes /> : <AuthRoutes />}</div>
    </>
  );
}