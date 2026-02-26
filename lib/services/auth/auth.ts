import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginFormDataSchema } from "@/lib/types/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  basePath: "/api/v1/todos/auth",
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedCredentials = LoginFormDataSchema.safeParse(credentials);

        if (!validatedCredentials.success) {
          return null;
        }

        const configuredEmail = process.env.AUTH_DEMO_EMAIL ?? "demo@local.dev";
        const configuredPassword =
          process.env.AUTH_DEMO_PASSWORD ?? "password123";

        if (
          validatedCredentials.data.email === configuredEmail &&
          validatedCredentials.data.password === configuredPassword
        ) {
          return {
            id: "demo-user",
            name: "Demo User",
            email: configuredEmail,
          };
        }

        return null;
      },
    }),
  ],
});
