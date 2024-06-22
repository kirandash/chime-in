import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { isAuthenticatedVar } from "../../constants/authenticated";
import { snackVar } from "../../constants/snack";
import { UNKNOWN_ERROR_SNACK } from "../../constants/errors";

const Guard = ({ children }: { children: JSX.Element }) => {
  const { data: user, error } = useGetMe();

  useEffect(() => {
    if (user) {
      // set the authenticated variable to true
      isAuthenticatedVar(true);
    }
  }, [user]);

  useEffect(() => {
    if (error?.networkError) {
      snackVar(UNKNOWN_ERROR_SNACK);
    }
  }, [error]);

  // we don't have access to router here, so we will use js

  return (
    <>
      {excludedRoutes.includes(window.location.pathname) ? (
        children
      ) : user ? (
        children
      ) : (
        <>Unauthorized</>
      )}
    </>
  );
};

export default Guard;
