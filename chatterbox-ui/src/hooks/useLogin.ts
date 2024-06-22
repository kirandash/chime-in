import { useState } from "react";
import { API_URL } from "../constants/urls";
import client from "../constants/apollo-client";
import { UNKNOWN_ERROR_MESSAGE } from "../constants/errors";

interface LoginRequest {
  email: string;
  password: string;
}

const useLogin = () => {
  const [error, setError] = useState<string>("");

  const login = async (request: LoginRequest) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      if (res.status === 401) {
        setError("Credentials are invalid");
      } else {
        // unknown error handling globally
        setError(UNKNOWN_ERROR_MESSAGE);
      }
      return;
    }
    setError("");
    // refetch all active cached queries
    await client.refetchQueries({ include: "active" });
  };

  return { login, error };
};

export { useLogin };
