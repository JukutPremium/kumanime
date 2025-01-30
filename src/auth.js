import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export function authenticate(request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }

  const token = authHeader.split(" ")[1];
  return token === process.env.AUTH_SECRET;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  session: {
    strategy: "cookie", // Gunakan session berbasis cookie
  },
  callbacks: {
    async session(session, user) {
      // Menambahkan user.id ke session jika perlu
      session.user.id = user.id;
      return session;
    },
  },
});
