import "../styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import useMediaQuery from "../hooks/useMediaQuery";
import { useEffect } from "react";

config.autoAddCss = false;

export default function App({ Component, pageProps, router }: AppProps) {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const isHomepage = router.pathname === "/";

  useEffect(() => {
    document.body.className =
      isHomepage && isLargeScreen ? "scrollbar-hide" : "";
  }, [isLargeScreen, isHomepage]);

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
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <Analytics />
    </>
  );
}
