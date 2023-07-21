import { useEffect} from "react";

import { AuthRoutes } from "./authRoutes";
import { MainRoutes } from "./mainRoutes";


export function Routes() {

  const access_token = null;
  useEffect(() => {});
  return (
    <>
      <div>{access_token ? <MainRoutes /> : <AuthRoutes />}</div>
    </>
  );
}
