import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { projectDetailsType } from "@/utils/projects";

const ProjectDetailsEl: React.FC<{ detail: projectDetailsType }> = (props) => {
  const { name, desc, about, img, techs, website, github } = props.detail;
  return (
    <div className="py-[32px] [&>*]:mb-[24px]">
      <div>
        <h3 className="mb-[8px] font-bold text-[20px]">{name}</h3>
        <p>{desc}</p>
      </div>
      <div>
        {img && (
          <Image
            src={img}
            alt="project preview"
            className="rounded overflow-hidden"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89R8AAtkB6zy+wn8AAAAASUVORK5CYII="
          />
        )}
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
          className="hover:underline break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {website}
        </Link>
      </div>
      {github && (
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
      )}
    </div>
  );
};

export default ProjectDetailsEl;
