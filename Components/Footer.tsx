import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTelegram,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faXHS } from "./uiComponents/CustomIcon";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-ink text-paper/75">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 pt-20 pb-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-12 pb-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 mb-5">
              Contact
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="mailto:hello@jackycheung.dev"
                  className="hover:text-paper transition-colors"
                >
                  hello@jackycheung.dev
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://t.me/az614538"
                  className="hover:text-paper transition-colors"
                >
                  t.me/az614538
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper/40 mb-5">
              Links
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/resume"
                  className="hover:text-paper transition-colors"
                >
                  My Resume
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/page/1"
                  className="hover:text-paper transition-colors"
                >
                  My Blog
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://stats.uptimerobot.com/4FrqWUJRxs"
                  data-umami-event="Check Website Status"
                  className="hover:text-paper transition-colors"
                >
                  Status Page
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex md:flex-col gap-6 md:items-end text-base text-paper/60 md:pt-1">
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/jackykh"
              className="hover:text-paper transition-colors"
            >
              <FontAwesomeIcon icon={faGithub} />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://t.me/az614538"
              className="hover:text-paper transition-colors"
            >
              <FontAwesomeIcon icon={faTelegram} />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/jacky_cheunq"
              className="hover:text-paper transition-colors"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://xhslink.com/m/1Khg9gwEsBD"
              className="hover:text-paper transition-colors"
            >
              <FontAwesomeIcon icon={faXHS} />
            </Link>
          </div>
        </div>
        <div className="overflow-hidden border-t border-paper/15 pt-10">
          <p className="font-display font-medium uppercase leading-[0.85] tracking-[-0.03em] text-paper text-[clamp(3rem,12.5vw,12rem)] whitespace-nowrap select-none">
            Jacky Cheung
          </p>
        </div>
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
            © Jacky Cheung {new Date().getFullYear()}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
            Hong Kong — Built with Next.js
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
