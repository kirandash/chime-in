import { createBrowserRouter } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default router;
