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
      <main className="py-28 px-12 flex justify-center">
        <div className="flex flex-col w-[60rem] max-w-full">
          <div className="flex [&>*]:mr-4 border-b border-black py-2 text-base font-light"></div>
          <div className="py-4 mb-12">
            <h1 className="text-3xl font-semibold mb-4">Post Not found</h1>
            <p>This post doesn&apos;t existed or has been removed.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default notFoundPage;
