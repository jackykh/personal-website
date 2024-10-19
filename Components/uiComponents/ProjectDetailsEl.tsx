import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

interface projectDetailsType {
  name: string;
  desc: string;
  about: string[];
  img: StaticImageData;
  techs: string[];
  website: string;
  github: string;
}

const ProjectDetailsEl: React.FC<{ detail: projectDetailsType }> = (props) => {
  const { name, desc, about, img, techs, website, github } = props.detail;
  return (
    <div className="py-[32px] [&>*]:mb-[24px]">
      <div>
        <h3 className="mb-[8px] font-bold text-[20px]">{name}</h3>
        <p>{desc}</p>
      </div>
      <div className="w-full h-[180px] xs:h-[236px] overflow-hidden rounded">
        <Image
          src={img}
          alt="project preview"
          className="object-cover object-center"
          placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89R8AAtkB6zy+wn8AAAAASUVORK5CYII="
        />
      </div>
      <div>
        <h4 className="mb-[13px] font-bold text-[18px]">About</h4>
        <ul className="list-disc list-inside">
          {about.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="mb-[13px] font-bold text-[18px]">Technologies</h4>
        <div className="flex gap-[8px] flex-wrap">
          {techs.map((tech, index) => (
            <span
              className="rounded border border-solid border-purple-900 text-purple-900 bg-purple-100 py-[4px] px-[8px]"
              key={`${tech}_${index}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-[8px] font-bold text-[18px]">
          <FontAwesomeIcon icon={faLink} className="mr-[8px]" />
          Website
        </h4>

        <Link
          href={website}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {website}
        </Link>
      </div>
      <div>
        <h4 className="mb-[8px] font-bold text-[18px]">
          <FontAwesomeIcon icon={faGithub} className="mr-[8px]" />
          GitHub
        </h4>
        <Link
          href={github}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {github}
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailsEl;
export type { projectDetailsType };
