import Head from "next/head";
import Footer from "@/Components/Footer";
import Navigation from "@/Components/uiComponents/Navigation";

const notFoundPage = () => {
  return (
    <>
      <Head>
        <title>404 Not Found - Jacky&apos;s Blog</title>
        <meta name="description" content={"404 Not Found - Jacky's Blog"} />
      </Head>
      <Navigation />
      <main className="pt-32 pb-24 px-6 sm:px-10 flex justify-center min-h-screen">
        <div className="flex flex-col w-full max-w-3xl">
          <div className="border-b border-line pb-4"></div>
          <div className="py-8 mb-12">
            <h1 className="font-serif text-4xl text-ink mb-4">
              Post not <span className="italic">found.</span>
            </h1>
            <p className="text-soft">
              This post doesn&apos;t exist or has been removed.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default notFoundPage;
