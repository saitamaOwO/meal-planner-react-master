import Head from "next/head";
import Link from "next/link";
import Cookies from "js-cookie";
export default function Home() {
  return (
    <>
      <Head>
        <title>Meal tracker</title>
        <meta name="description" content="Meal tracker system" />
      </Head>
      <section className="w-full min-h-screen flex flex-col items-center justify-center">
        <Link
          href={"/signin"}
          className="w-32 flex items-center justify-center py-1.5 border border-blue-500 bg-blue-500 rounded-md my-2 hover:bg-black transition-all"
        >
          Sign In
        </Link>
        <Link
          href={"/signup"}
          className="w-32 flex items-center justify-center py-1.5 border border-blue-500 bg-blue-500 rounded-md my-2 hover:bg-black transition-all"
        >
          Sign Up
        </Link>
        {Cookies.get("username") && Cookies.get("password") && (
          <Link
            href={"/dashboard"}
            className="w-32 flex items-center justify-center py-1.5 border border-blue-500 bg-blue-500 rounded-md my-2 hover:bg-black transition-all"
          >
            Dashboard
          </Link>
        )}
      </section>
    </>
  );
}
