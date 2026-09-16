import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { projectDetailsType } from "@/utils/projects";

const ProjectDetailsEl: React.FC<{ detail: projectDetailsType }> = (props) => {
  const { name, desc, about, img, techs, website, github } = props.detail;
  return (
    <div className="py-8 [&>*]:mb-8">
      <div>
        <h3 className="mb-2 font-serif text-2xl text-ink">{name}</h3>
        <p className="text-soft">{desc}</p>
      </div>
      <div>
        {img && (
          <Image
            src={img}
            alt="project preview"
            className="border border-line"
            placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN89R8AAtkB6zy+wn8AAAAASUVORK5CYII="
          />
        )}
      </div>
      <div>
        <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          About
        </h4>
        <ul className="list-disc list-inside text-soft space-y-1.5">
          {about.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Technologies
        </h4>
        <div className="flex gap-2 flex-wrap">
          {techs.map((tech, index) => (
            <span
              className="rounded-full border border-line text-soft px-3 py-1 text-xs"
              key={`${tech}_${index}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          <FontAwesomeIcon icon={faLink} className="mr-2" />
          Website
        </h4>

        <Link
          href={website}
          className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors break-words"
          target="_blank"
          rel="noopener noreferrer"
        >
          {website}
        </Link>
      </div>
      {github && (
        <div>
          <h4 className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <FontAwesomeIcon icon={faGithub} className="mr-2" />
            GitHub
          </h4>
          <Link
            href={github}
            className="text-ink underline decoration-line underline-offset-4 hover:decoration-ink transition-colors break-words"
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
