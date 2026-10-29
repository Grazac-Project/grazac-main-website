import { Link } from "react-router-dom";
import { imageUrl } from "../lib/sanity";

// Moves the "View" bubble to follow the pointer over the cover image.
const followPointer = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--gz-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--gz-y", `${event.clientY - rect.top}px`);
};

// A Grazac Build client project: cover image, "Name — tagline" and services.
// Links to its case study (/build/:slug) when it has a slug.
export const ProjectCard = ({ project }) => {
  const cover = imageUrl(project.coverImage, 1200, 1100);
  // Projects without a cover yet show their logo on a tinted panel instead.
  const logo = !cover && imageUrl(project.logo, 480);
  const services = (project.services || []).join(", ");

  const content = (
    <>
      <div className="gz-project__media" onMouseMove={project.slug ? followPointer : undefined}>
        {cover ? (
          <img src={cover} alt={(project.coverImage && project.coverImage.alt) || ""} loading="lazy" />
        ) : (
          logo && <img className="gz-project__logo" src={logo} alt="" loading="lazy" />
        )}
        {project.slug && (
          <span className="gz-project__view" aria-hidden="true">
            View
          </span>
        )}
      </div>
      <h3 className="gz-project__title">
        {project.name}
        {project.tagline && <span>{project.tagline}</span>}
      </h3>
      {services && <p className="gz-project__services">{services}</p>}
    </>
  );

  return project.slug ? (
    <Link to={`/build/${project.slug}`} className="gz-project">
      {content}
    </Link>
  ) : (
    <article className="gz-project">{content}</article>
  );
};

export default ProjectCard;
