import Link from "next/link";

export default function Custom500() {
  return (
    <>
      <section className="bg-gray-900 h-screen">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-purple-900">
              500
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">
              Internal Server Error.
            </p>
            <p className="mb-4 text-lg font-light text-gray-400">
              We are already working to solve the problem.{" "}
            </p>
            <div className="flex items-center justify-center gap-x-6">
              <Link
                href={"/"}
                className="rounded-md bg-purple-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-900"
              >
                Go back home
              </Link>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="mailto:hello@jackycheung.dev"
                className="text-sm font-semibold text-white"
              >
                Contact support <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
