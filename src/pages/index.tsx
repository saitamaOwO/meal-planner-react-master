import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center">
      <Link href={"/signin"} className="w-32 flex items-center justify-center py-1.5 border border-blue-500 bg-blue-500 rounded-md my-2 hover:bg-black transition-all">
        Sign In
      </Link>
      <Link href={"/signup"} className="w-32 flex items-center justify-center py-1.5 border border-blue-500 bg-blue-500 rounded-md my-2 hover:bg-black transition-all">
        Sign Up
      </Link>
    </section>
  );
}
