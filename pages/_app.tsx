import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import Footer from "../Components/Footer";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Jacky Cheung | A self-taught Web Developer</title>
        <meta
          name="description"
          content="I am Jacky Cheung, A self-taught Frontend Web Developer. "
        />
        <link rel="icon" href="/memoji_Icon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
