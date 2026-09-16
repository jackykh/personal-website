import Head from "next/head";
import Link from "next/link";
import Footer from "@/Components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content={"404 Not Found"} />
      </Head>
      <main className="grid min-h-screen place-items-center px-6 py-24">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            404
          </p>
          <h1 className="mt-6 font-serif text-4xl sm:text-6xl text-ink">
            Page not <span className="italic">found.</span>
          </h1>
          <p className="mt-6 text-soft leading-relaxed">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-8">
            <Link href={"/"} className="btn">
              Go back home
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="mailto:hello@jackycheung.dev"
              className="text-sm text-soft underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink transition-colors"
            >
              Contact support <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
