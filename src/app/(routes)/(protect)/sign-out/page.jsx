import { signOut } from "@/auth";

export default function SignOut() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Are you sure you want to Sign Out?</h1>

      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="px-6 py-3 bg-red-600 rounded-lg hover:bg-red-700 transition">
          Sign Out
        </button>
      </form>
    </div>
  );
}
