import router from "../components/auth/Routes";
import client from "../constants/apollo-client";

export const onLogout = () => {
  router.navigate("/sign-in");
  // resetStore will clear the cache and refetch all active queries.
  client.resetStore();
};
