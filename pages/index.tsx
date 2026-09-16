import Hero from "@/Components/Hero";
import Intro from "@/Components/Intro";
import ProjectShowcase from "@/Components/ProjectShowcase";
import ContactSection from "@/Components/ContactSection";
import Footer from "@/Components/Footer";
import Navigation from "@/Components/uiComponents/Navigation";
import Head from "next/head";

export default function Home() {
  const JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jacky Cheung | Web Developer",
    alternateName: [
      "Jacky Portfolio | Blog | Resume",
      "JC's Website | Web Developer",
    ],
    url: "https://jackycheung.dev",
  };
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JsonLd) }}
          key="jsonld"
        />
      </Head>
      <main className="w-full">
        <Navigation />
        <Hero />
        <Intro />
        <ProjectShowcase />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
