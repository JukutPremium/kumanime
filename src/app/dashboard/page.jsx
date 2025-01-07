import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) return null; // Jika tidak ada user, kembalikan null

  return (
    <div>
      <h2>User Info</h2>
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}
