import { useEffect, useState } from "react";
import Hero from "@/Components/Hero";
import Intro from "@/Components/Intro";
import ProjectShowcase from "@/Components/ProjectShowcase";
import ContactSection from "@/Components/ContactSection";
import Footer from "@/Components/Footer";
import Navigation from "@/Components/uiComponents/Navigation";
import SectionBg from "@/Components/uiComponents/SectionBg";
import PixelGrid from "@/Components/uiComponents/PixelGrid";
import Head from "next/head";

export default function Home() {
  const [bg, setBg] = useState("#FAF9F4");
  const [dir, setDir] = useState<"up" | "down">("down");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y !== last) setDir(y > last ? "down" : "up");
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        <PixelGrid color={bg} direction={dir} />
        <Navigation />
        <SectionBg color="#FAF9F4" onActive={setBg}>
          <Hero />
        </SectionBg>
        <SectionBg color="#F0EDE2" onActive={setBg}>
          <Intro />
        </SectionBg>
        <SectionBg color="#DDE5DA" onActive={setBg}>
          <ProjectShowcase />
        </SectionBg>
        <SectionBg color="#FFFFFF" onActive={setBg}>
          <ContactSection />
        </SectionBg>
        <div className="relative z-10">
          <Footer />
        </div>
      </main>
    </>
  );
}
