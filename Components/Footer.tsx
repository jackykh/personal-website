import { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

interface FooterProps {
  fullScreen?: boolean;
}

const Footer = forwardRef<HTMLElement, FooterProps>((props, ref) => {
  return (
    <footer
      ref={ref}
      className={`w-full ${
        props.fullScreen && "lg:min-h-screen"
      }  py-[8rem] bg-purple-900 flex justify-center items-center`}
    >
      <div className="h-full w-[90%] md:w-[80%] flex flex-col items-center text-[#F9F9C5] font-light text-xl leading-10 tracking-wider">
        <div className="flex flex-col md:flex-row w-full justify-around p-8 border-b border-solid border-[#F9F9C5]">
          <ul className="flex flex-col md:mr-8">
            <li className="uppercase font-extralight text-gray-200">
              Contact Me
            </li>
            <li>
              <Link href="mailto:jackycheungtester@gmail.com">
                jackycheungtester@gmail.com
              </Link>
            </li>
            <li>
              <Link href="https://t.me/az614538">t.me/az614538</Link>
            </li>
          </ul>
          <ul className="flex flex-col">
            <li>
              <Link href="/resume">My Resume</Link>
            </li>
          </ul>
        </div>
        <div className="p-8 flex">
          <div className="[&>*]:mr-8 flex flex-wrap">
            <span>@Jacky Cheung 2022</span>
            <span>Made With TailwindCSS</span>
          </div>
          <div className="[&>*]:mr-8">
            <Link href="https://github.com/jackiecheunq">
              <FontAwesomeIcon icon={faGithub} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
export default Footer;
