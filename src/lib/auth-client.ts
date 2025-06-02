import { createAuthClient } from "better-auth/react";
// import type { Session } from "better-auth/types";

export const authClient = createAuthClient({
  baseURL: "http://localhost:3000",
});
