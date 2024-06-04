const extractErrorMsg = (err: any) => {
  const errorMsg = err.graphQLErrors[0]?.extensions?.originalError?.message;
  if (!errorMsg) {
    return;
  }
  if (Array.isArray(errorMsg)) {
    return formatErrorMsg(errorMsg[0]);
  } else {
    return formatErrorMsg(errorMsg);
  }
};

// formatErrorMsg takes an error message and returns the same message with the first letter capitalized.
const formatErrorMsg = (err: string) => {
  return err.charAt(0).toUpperCase() + err.slice(1);
};

export { extractErrorMsg };
