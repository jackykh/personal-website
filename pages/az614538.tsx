import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faLocationDot,
  faPhone,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
const Resume = () => {
  return (
    <main className="lg:p-16">
      <div className=" w-full flex flex-col md:flex-row ">
        <div className=" border border-solid border-black">
          {/* Left Part */}
          <div className="w-full flex flex-col [&>*]:p-8">
            <div className=" bg-purple-800 text-white">
              <div className="flex flex-col mb-6">
                <h1 className="text-2xl font-serif mb-2">Cheung Kwing Ho</h1>
                <h3 className="italic">A Self-taught Frontend Web developer</h3>
              </div>
              <ul>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <Link href="mailto:jackycheungtester@gmail.com">
                    jackycheungtester@gmail.com
                  </Link>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  +852-54493108
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                  Hong Kong
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faGlobe} className="mr-2" />
                  <Link href="https://jackycheung.dev">jackycheung.dev</Link>
                </li>
                <li className="flex items-center">
                  <FontAwesomeIcon icon={faGithub} className="mr-2" />
                  <Link
                    href="https://github.com/jackiecheunq"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    github.com/jackiecheunq
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h2 className="uppercase text-xl mb-4 font-serif">Education</h2>
              <ul className="mb-4">
                <li>Bachelor of Social Science</li>
                <li>China Studies in History</li>
                <li className="text-purple-800 font-semibold">
                  Hong Kong Baptist University
                </li>
                <li>
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  2019-2021
                </li>
              </ul>
              <ul>
                <li>Associate Degree of Art</li>
                <li className="text-purple-800 font-semibold">
                  Hong Kong Community College
                </li>
                <li>
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  2017-2019
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Right Part  */}
        <div className="flex-1 h-full border border-solid border-black bg-purple-50 p-16">
          <div className="w-full flex flex-col  [&>*]:mb-8">
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif mb-2">Career Objective</h1>
              <p>
                I am a 2021 graduate with a history degree in Hong Kong. After
                graduation, I find my real passion for frontend deveploment and
                throw all my energies into pursuing related knowledge. I really
                want to be a frontend web developer
              </p>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif mb-2">Core Skill</h1>
              <ul className="grid  grid-cols-autofit-20  auto-rows-min list-disc list-inside">
                <li>HTML, CSS, JavaScript</li>
                <li>React</li>
                <li>Redux</li>
                <li>TypeScript</li>
                <li>SASS</li>
                <li>REST APIs</li>
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB/Mongoose</li>
                <li>Next.js</li>
              </ul>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-serif mb-2">Portfolio</h1>
              <ul className="grid  grid-cols-autofit-20  auto-rows-min list-disc list-inside ">
                <li>
                  <Link
                    href="https://jackiecheunq.github.io/Bookstore/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A Reponsive Bookstore Website DEMO made with React and
                    Firebase Realtime Database
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://milk-tea-8ddb5.web.app/home"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A Full Stack E-Commerce Website made with MERN (MongoDB,
                    Express.js, React, Node.js) stack
                  </Link>
                </li>

                <li>
                  <Link
                    href="https://jackycheung.dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    A Personal Portfolio Website made with Next.js
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-2xl font-serif mb-4">Work History</h1>
              <div className="flex flex-col mb-4">
                <div className="flex">
                  <div className="w-[30%] mr-4">
                    <h3 className="font-semibold">Hospital Authority</h3>
                    <p>Sep 2021- Dec 2021</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Executive Assistant</h3>
                    <p>Perform reception, data entry and clerical duties</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex">
                  <div className="w-[30%] mr-4">
                    <h3 className="font-semibold ">
                      The Chinese University of Hong Kong
                    </h3>
                    <p>Dec 2021- March 2022</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">Project Assistant</h3>
                    <p>Perform reception, data entry and clerical duties</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ">
              <h1 className="text-2xl font-serif mb-4">Languages</h1>
              <ul className="list-disc list-inside">
                <li>Cantonese (Native)</li>
                <li>Mandarin (Proficient)</li>
                <li>English (Good command)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Resume;
