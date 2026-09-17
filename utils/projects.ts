import myWebsiteImage from "@/public/mywebsite.jpeg";
import resignationCalculatorImage from "@/public/resign.gif";
import doraSearchImage from "@/public/dorasearch.png";
import PastScanImage from "@/public/pastscan.png";
import foodMapImage from "@/public/foodmap.jpeg";
import webVseImage from "@/public/webvse.jpeg";

import { StaticImageData } from "next/image";

export interface projectDetailsType {
  name: string;
  desc: string;
  about: string[];
  img: StaticImageData;
  techs: string[];
  website: string;
  github?: string;
}

export const personalWebsiteDetails: projectDetailsType = {
  name: "Personal Website",
  desc: "Developed a personal website using the Next.js framework",
  about: [
    "Responsive Design: Modern and responsive layout optimized for various devices.",
    "Blog Section: User-friendly blogging platform with SSG and ISR for fast page generation and real-time updates.",
    "AI-Powered Summaries: Integrated Deepseek Chat AI's API to automatically generate concise and informative summaries for blog posts, enhancing reader engagement and content accessibility.",
    "Content Management: Admin panel for managing blog posts, pages, and media using Strapi.",
  ],
  img: myWebsiteImage,
  website: "https://jackycheung.dev/",
  github: "https://github.com/jackykh/personal-website",
  techs: ["Next.js", "Framer Motion", "Strapi", "GraphQL"],
};

   export const foodMapDetails: projectDetailsType = {
     name: "Hong Kong YouTube Food Review Map",
     desc: "An interactive map plotting restaurants reviewed by Hong Kong YouTube food channels, built with Next.js + MapLibre GL and deployed on Cloudflare Workers with a D1-backed read-only datastore.",
     about: [
       "Interactive Map Experience: MapLibre GL renders all restaurants via a GeoJSON source + symbol layers (no DOM markers) and a custom projected tooltip card that auto-flips to stay in viewport.",
       "Dual Browse Modes: Explore by restaurant or by YouTube channel, with full-text search, multi-facet filters (cuisine, venue type, rating, district).",
       "Edge Deployment: Runs on Cloudflare Workers via OpenNext, with an OpenFreeMap vector basemap.",
     ],
     img: foodMapImage,
     website: "https://food.shashin.cc/",
     techs: [
       "Next.js",
       "MapLibre GL",
       "TanStack Query",
       "Cloudflare Workers",
       "Cloudflare D1",
       "OpenNext",
     ],
   };
 

export const webVseDetails: projectDetailsType = {
  name: "SubKu — Web-based Visual Scripting Engine",
  desc: "A web-based visual scripting engine for creating interactive web applications, built with React and TypeScript.",
  about: [
    "Fully Client-Side OCR Pipeline: Runs PP-OCRv6 tiny in ONNX Runtime Web WASM inside dedicated Web Workers.",
    "Browser-Native Video Decoding: Streaming container parsing via Mediabunny + WebCodecs supporting MP4, MOV, MKV, WebM, MPEG-TS, and FLV.",
    "Parallel Worker Architecture: Orchestrator worker coordinates a pool of up to 6 single-threaded OCR lanes (auto-sized from device cores/memory).",
    "Subtitle Archive & Search: Extraction records persisted in SQLite WASM (OPFS) with FTS5 trigram indexing.",
    "Interactive Editing & Export: Draggable/resizable ROI editor, editable subtitle text and timestamps, SRT download, and multilingual UI.",
  ],
  img: webVseImage,
  website: "https://subku.app/",
  techs: [
    "React 19",
    "ONNX Runtime Web",
    "WebCodecs",
    "OpenCV.js",
    "SQLite WASM",
    "Cloudflare Workers",
  ],
};

export const resignationCalculatorDetails: projectDetailsType = {
  name: "Resignation Date Calculator",
  desc: "A smart resignation date calculator for Hong Kong employees with public holiday integration. Gained hundreds of likes and bookmarks on social media platforms for its practical value.",
  about: [
    "Public Holiday Integration: Real-time sync with Hong Kong government's official holiday API",
    "Smart Date Recommendation: Scoring system prioritizing dates with minimal working days and consecutive holidays",
    "Custom Workweek Configuration: Flexible working day settings",
    "Probation & Notice Period Engine: Automatic calculations based on HK employment ordinances and company policies",
  ],
  img: resignationCalculatorImage,
  website: "https://fhr.shashin.cc",
  github: "https://github.com/jackykh/interview-records",
  techs: ["React", "Hong Kong Open Data API", "React Query"],
};

export const doraSearchDetails: projectDetailsType = {
  name: "DoraSearch — Doraemon Manga Full-Text Search",
  desc: "A Doraemon manga full-text search engine that went semi-viral on Social Media (7,000+ likes & saves), built with a React SPA frontend and a cost-optimized Cloudflare Workers + D1 backend.",
  about: [
    "Community-Validated Side Project: Launched as a personal learning project and shared on Xiaohongshu (小紅書), where it received 7,000+ likes and saves plus 300+ positive comments from users and developers.",
    "AI OCR Pipeline at Scale: Processed ~8,000 manga pages (2GB+) with Qwen3-VL, extracting structured text with high OCR accuracy.",
    "Serverless Search Backend: Built lightweight, low-latency search APIs on Cloudflare Workers, using D1 (SQLite) as a relational store for page-level text and search metadata.",
    "Cost-Aware Query Design: Designed a hybrid pagination strategy (cursor-based for prev/next, offset for jump-to-page) plus Cloudflare Cache to minimize scanned rows.",
    "React Search Experience: Implemented a single-page React app with TanStack Router and TanStack Query for URL-driven search state, client-side caching, and smooth navigation across result pages.",
  ],
  img: doraSearchImage,
  website: "https://dorasearch.cc/",
  techs: [
    "React",
    "TanStack Query",
    "TanStack Router",
    "Cloudflare Workers",
    "Cloudflare D1",
    "SQLite FTS",
    "Python",
    "Qwen3-VL",
  ],
};

export const PastScanDetails: projectDetailsType = {
  name: "PastScan — Document OCR & Search Platform for Researchers",
  desc: "A high-performance SaaS platform for historical researchers to upload, automatically OCR, and semantically search scanned PDF documents.",
  about: [
    "AI OCR Pipeline: Advanced text recognition powered by Gemini 3.1",
    "Metadata Extraction: Automated extraction of structured metadata (Table of Contents, title, author, date) for research citation generation",
    "Semantic Search: Vectorization of OCR results using pgvector to enable highly accurate semantic search",
  ],
  img: PastScanImage,
  website: "https://pastscan.com/",
  techs: [
    "Next.js",
    "PyMuPDF",
    "Supabase",
    "Cloudflare Workers",
    "Gemini 3.1",
    "pgvector",
  ],
};
