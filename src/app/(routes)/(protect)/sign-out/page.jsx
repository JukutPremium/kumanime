import { signOut } from "@/auth";

export const metadata = {
  title: "Sign Out",
};

export default function SignOut() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="px-6 py-3 bg-green-600 rounded-3xl hover:bg-green-700 transition">
          Sign Out
        </button>
      </form>
    </div>
  );
}
