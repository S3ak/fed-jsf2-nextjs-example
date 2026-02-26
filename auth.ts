import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { auth, signIn, signOut, handlers } = NextAuth({
  debug: true,
  // basePath: "/api/v1/todos/auth",
  providers: [Google, GitHub],
});
