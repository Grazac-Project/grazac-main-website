import { imageUrl } from "../lib/sanity";

// Auto-scrolling strip of Sanity logos ({ _id, name, logo, website }).
// Used for incubated startups (/startup).
const LogoMarquee = ({ items, className = "" }) => {
  // Repeat the logos so one loop is wider than the screen (no gap in the scroll).
  const repeated = Array.from({ length: Math.ceil(10 / items.length) }, () => items).flat();

  return (
    <div className={`gz-marquee ${className}`.trim()}>
      <div className="gz-marquee__track">
        {[0, 1].map((copy) => (
          <div className="gz-marquee__group" key={copy} aria-hidden={copy === 1 || undefined}>
            {repeated.map((item, index) => {
              const logo = imageUrl(item.logo, 360);
              if (!logo) return null;
              // Only the first copy is announced/focusable; the rest are visual repeats.
              const visible = copy === 0 && index < items.length;
              const img = <img src={logo} alt={visible ? item.name : ""} loading="lazy" />;
              return (
                <div className="gz-marquee__item" key={`${item._id}-${index}`}>
                  {item.website ? (
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noreferrer"
                      tabIndex={visible ? undefined : -1}
                    >
                      {img}
                    </a>
                  ) : (
                    img
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
