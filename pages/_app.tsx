import "../styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import client from "@/lib/apollo-client";
import { useEffect } from "react";
import { Toaster } from "sonner";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";

config.autoAddCss = false;

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    router.events.on("routeChangeStart", () => {
      NProgress.start();
    });
    router.events.on("routeChangeComplete", () => {
      NProgress.done();
    });
    router.events.on("routeChangeError", () => {
      NProgress.done();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="font-sans">
      <Head>
        <title>Jacky Cheung | A self-taught Web Developer</title>
        <meta
          name="description"
          content="I am Jacky Cheung, A self-taught Frontend Web Developer. "
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#1B1A17",
            color: "#FAF9F4",
            border: "1px solid #1B1A17",
            borderRadius: "2px",
            fontSize: "13px",
          },
        }}
      />
      <SpeedInsights />
      <Script
        src="https://cloud.umami.is/script.js"
        data-website-id={`${process.env.NEXT_PUBLIC_UMAMI_ID}`}
        data-domains="jackycheung.dev"
      />
    </div>
  );
}
