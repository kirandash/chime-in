import router from "../components/auth/Routes";
import client from "../constants/apollo-client";
import { isAuthenticatedVar } from "../constants/authenticated";

export const onLogout = () => {
  // set the authenticated variable to false
  isAuthenticatedVar(false);
  router.navigate("/sign-in");
  // resetStore will clear the cache and refetch all active queries.
  client.resetStore();
};
