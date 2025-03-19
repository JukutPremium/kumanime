import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="font-bold text-3xl">
      <p>
        Kuma<span className="text-primary">nime</span>
      </p>
    </Link>
  );
}
