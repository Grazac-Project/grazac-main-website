// Building blocks for the Grazac Build case study page (pages/BuildProject.js).
import { useEffect, useRef, useState } from "react";
import { imageUrl } from "../lib/sanity";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// White or ink text, whichever reads better on the client's brand colour.
export const textOn = (hex) => {
  const match = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex || "");
  if (!match) return "#ffffff";
  const full = match[1].length === 3 ? match[1].replace(/./g, (c) => c + c) : match[1];
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const linear = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
  return luminance > 0.4 ? "#1f1035" : "#ffffff";
};

// Writes how far the page has scrolled past `ref` into its --gz-par custom
// property, so children can drift at different speeds (a light parallax).
// Pass `ready` so it re-attaches once the real element replaces a placeholder.
export const useParallax = (ref, ready = true) => {
  useEffect(() => {
    const el = ref.current;
    if (!ready || !el || prefersReducedMotion()) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const offset = Math.min(Math.max(-el.getBoundingClientRect().top, 0), 900);
      el.style.setProperty("--gz-par", `${offset}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [ref, ready]);
};

// Auto-scroll speed in pixels per second, so long and short screenshots read at the same pace.
const SCROLL_SPEED = { desktop: 220, mobile: 70 };
// Share of the gz-screen-scroll keyframes spent moving (it pauses 8% at each end).
const SCROLL_MOVING = 0.84;

// A screenshot in a browser or phone frame. Long screenshots scroll slowly
// inside the frame; visitors can also scroll it themselves.
export const DeviceScreen = ({
  image,
  device,
  label,
  index = 0,
  caption,
  className = "",
  eager = false,
  focusable = true,
}) => {
  const viewRef = useRef(null);
  const imgRef = useRef(null);
  const [timing, setTiming] = useState(null);

  useEffect(() => {
    const view = viewRef.current;
    const img = imgRef.current;
    if (!view || !img || typeof ResizeObserver === "undefined") return undefined;
    const measure = () => {
      const distance = img.offsetHeight - view.clientHeight;
      if (!img.complete || distance <= 0) return setTiming(null);
      const duration = distance / SCROLL_SPEED[device] / SCROLL_MOVING;
      // Start each frame at a different point so neighbouring screens don't move in step.
      setTiming({ animationDuration: `${duration}s`, animationDelay: `${-duration * index * 0.35}s` });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(view);
    observer.observe(img);
    img.addEventListener("load", measure);
    return () => {
      observer.disconnect();
      img.removeEventListener("load", measure);
    };
  }, [device, index]);

  return (
    <figure className={`gz-screen gz-screen--${device} ${className}`.trim()}>
      <div className="gz-screen__frame">
        {device === "desktop" && (
          <div className="gz-screen__bar" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        )}
        <div
          className="gz-screen__view"
          ref={viewRef}
          tabIndex={focusable ? 0 : -1}
          aria-label={`${label}, scrollable`}
        >
          <img
            ref={imgRef}
            className={timing ? "is-scrolling" : undefined}
            src={imageUrl(image, device === "desktop" ? 1600 : 800)}
            alt={image.alt || label}
            loading={eager ? "eager" : "lazy"}
            style={timing || undefined}
          />
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
};

// Counts a result like "10k+" or "98%" up from zero when it scrolls into view.
export const CountUp = ({ value }) => {
  const match = /^(\D*)([\d,]*\.?\d+)(.*)$/.exec(value || "");
  const target = match ? parseFloat(match[2].replace(/,/g, "")) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const ref = useRef(null);
  const [current, setCurrent] = useState(match && !prefersReducedMotion() ? 0 : target);

  useEffect(() => {
    const el = ref.current;
    if (!match || !el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setCurrent(target);
      return undefined;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / 1400, 1);
        setCurrent(target * (1 - (1 - progress) ** 3));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // Re-run only when the value itself changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!match) return <strong>{value}</strong>;
  const formatted = current.toLocaleString("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <strong ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        {formatted}
        {match[3]}
      </span>
    </strong>
  );
};

// "How we built it": steps scroll past on the left while a sticky device on the
// right switches to the screen for the step in the middle of the viewport.
export const ScrollStory = ({ steps, name }) => {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(Number(entry.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [steps.length]);

  const deviceOf = (step) => (step.device === "desktop" ? "desktop" : "mobile");

  return (
    <div className="gz-story">
      <ol className="gz-story__steps">
        {steps.map((step, index) => (
          <li
            key={step._key || index}
            ref={(el) => {
              stepRefs.current[index] = el;
            }}
            data-index={index}
            className={`gz-story__step${index === active ? " is-active" : ""}`}
          >
            <span className="gz-story__num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            {step.text && <p>{step.text}</p>}
            {/* Phones and small tablets show each screen under its step instead of the sticky stage. */}
            <DeviceScreen
              className="gz-story__inline"
              image={step.screen}
              device={deviceOf(step)}
              label={`${name}: ${step.title}`}
            />
          </li>
        ))}
      </ol>
      <div className="gz-story__stage" aria-hidden="true">
        {steps.map((step, index) => (
          <div
            key={step._key || index}
            className={`gz-story__layer gz-story__layer--${deviceOf(step)}${index === active ? " is-active" : ""}`}
          >
            <DeviceScreen
              image={step.screen}
              device={deviceOf(step)}
              label={`${name}: ${step.title}`}
              focusable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
