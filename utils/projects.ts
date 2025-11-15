import bookstoreGif from "@/public/bookstore.gif";
import milkTeaStoreGif from "@/public/milktea.gif";
import myWebsiteImage from "@/public/mywebsite.png";
import puzzleLocationGameImage from "@/public/questcard.jpg";
import replytTrackImage from "@/public/replytrack.jpg";
import resignationCalculatorImage from "@/public/resign.gif";
import doraSearchImage from "@/public/dorasearch.png";

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

export const bookstoreDetails: projectDetailsType = {
  name: "A Reponsive Bookstore Website DEMO",
  desc: "Developed a bookstore website using React.js for the frontend.",
  about: [
    "Responsive Design: Ensuring a seamless browsing experience across all devices, from desktops to mobile phones using modern CSS practices.",
    "Custom Styling with SCSS: Leveraging SCSS for styling provided an enhanced level of control over the design, allowing for dynamic variables and mixins that simplify complex styles.",
  ],
  img: bookstoreGif,
  website: "https://bookstore-demo.pages.dev",
  github: "https://github.com/jackykh/bookstore-demo",
  techs: ["React", "SCSS", "Firebase Realtime Database"],
};

export const milkTeaStoretoreDetails: projectDetailsType = {
  name: "A Full Stack e-commerce Website Project",
  desc: "Developed a full-stack e-commerce platform using the MERN stack to create a virtual milk tea shop.",
  about: [
    "User Authentication: Implementing registration, login, logout, and role-based access control.",
    "Homepage Effects: Interactive scrolling effects and progress indicators.",
    "E-commerce Functionality: Product purchase, shopping cart management, order tracking, and product/image uploads with previews.",
    "Order Management: User-friendly order history review.",
  ],
  img: milkTeaStoreGif,
  website: "https://milk-tea-8ddb5.web.app/home",
  github: "https://github.com/jackykh/Milk-Tea-Store",
  techs: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
};

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

export const puzzleLocationGameDetails: projectDetailsType = {
  name: "Quest Card",
  desc: "Developed a mobile game using React Native and Firebase Realtime Database, where players solve location-based puzzles.",
  about: [
    "Single Player: Solve location puzzles by guessing on Google Maps or visiting the actual spot.",
    "Multiplayer: Create rooms, set custom puzzles, and compete with others in real-time.",
    "Real-Time Sync: Firebase Realtime Database enables seamless multiplayer interactions.",
    "Custom Puzzles: Players can design and share their own puzzles.",
    "Google Maps API: Integrated for interactive location-based gameplay.",
  ],
  img: puzzleLocationGameImage,
  website: "https://apps.apple.com/hk/app/quest-card/id6740688552",
  techs: [
    "React Native",
    "Firebase Realtime Database",
    "Google Maps API",
    "App Store Deployment",
  ],
};

export const replyTrackDetails: projectDetailsType = {
  name: "ReplyTrack",
  desc: "Developed a privacy-first iOS reminder app using React Native, solving 'read-but-forgot-to-reply' scenarios through Share Extension integration and localized data processing.",
  about: [
    "Share Extension Workflow: Allow users to save messages from IM app via iOS Share Extension without data upload",
    "Cross-Language Support: Implemented i18n for Chinese(Trad/Simp)/Japanese/English",
    "Privacy by Design: All message metadata processed locally using MMKV, zero cloud synchronization",
    "Reminders: Notification system considering message urgency and time patterns",
  ],
  img: replytTrackImage,
  website: "https://apps.apple.com/hk/app/replytrack/id6741432172",
  techs: [
    "React Native",
    "iOS Share Extension",
    "i18n-js Localization",
    "MMKV",
    "iOS Notifications",
    "App Store Deployment",
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
