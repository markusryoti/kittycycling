import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: new Pool({
    host: "db",
    user: "user",
    password: "password",
    database: "cycle",
  }),
});
