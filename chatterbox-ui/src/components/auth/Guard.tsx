import excludedRoutes from "../../constants/excluded-routes";
import { useGetMe } from "../../hooks/useGetMe";

const Guard = ({ children }: { children: JSX.Element }) => {
  const { data: user } = useGetMe();

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
