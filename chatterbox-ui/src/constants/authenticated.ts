import { makeVar } from "@apollo/client";

// This variable will be used to determine if the user is authenticated
export const isAuthenticatedVar = makeVar(false);
