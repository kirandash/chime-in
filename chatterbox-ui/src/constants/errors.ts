const UNKNOWN_ERROR_MESSAGE =
  "An unknown error occurred. Please try again later.";

const UNKNOWN_ERROR_SNACK = {
  message: UNKNOWN_ERROR_MESSAGE,
  type: "error" as const,
};

export { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_SNACK };
