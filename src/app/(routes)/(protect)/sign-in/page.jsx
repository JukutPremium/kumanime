import { signIn } from "@/auth";

export const metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white">
      <form
        action={async () => {
          "use server";
          await signIn("google", { redirectTo: "/dashboard" });
        }}
      >
        <button className="px-6 py-3 bg-green-600 rounded-3xl hover:bg-green-700 transition">
          Sign In
        </button>
      </form>
    </div>
  );
}
