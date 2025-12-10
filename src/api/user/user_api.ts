export type LoginData = {
  username: string;
  password: string;
};

export const authUser = async (
  { username, password }: LoginData,
  signal: AbortSignal | undefined = undefined,
) => {
  const response = await fetch("/api/auth/login", {
    signal,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (response.ok) {
    return null;
  }

  throw await response.json();
};

export const getCurrentUser = async (
  signal: AbortSignal | undefined = undefined,
) => {
  const response = await fetch("/api/auth/me", {
    signal,
    method: "GET",
  });

  if (response.ok) {
    return await response.json();
  }

  throw await response.json();
};
