import { useEffect } from "react";
import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";
import { isAuthenticatedVar } from "../../constants/authenticated";

const Guard = ({ children }: { children: JSX.Element }) => {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (user) {
      // set the authenticated variable to true
      isAuthenticatedVar(true);
    }
  }, [user]);

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
