import Link from "next/link";
import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 Internal Server Error</title>
        <meta name="description" content={"500 Internal Server Error"} />
      </Head>
      <main className="grid min-h-screen place-items-center px-6 py-24">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
            500
          </p>
          <h1 className="mt-6 font-serif text-4xl sm:text-6xl text-ink">
            Internal Server <span className="italic">Error.</span>
          </h1>
          <p className="mt-6 text-soft leading-relaxed">
            We are already working to solve the problem.
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
              Contact support <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
