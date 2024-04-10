import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Schibsted_Grotesk } from "next/font/google";
const font = Schibsted_Grotesk({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`max-w-[1540px] w-full flex justify-center ${font.className}`}
    >
      <Component {...pageProps} />
    </main>
  );
}
