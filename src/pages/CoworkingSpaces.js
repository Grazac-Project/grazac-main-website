// @ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiArrowRight, FiTag } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  TbArmchair2,
  TbBolt,
  TbBrandSpeedtest,
  TbCheck,
  TbParking,
  TbPlant,
  TbSparkles,
  TbTable,
  TbUsers,
} from "react-icons/tb";
import Tour from "../components/Tour/Tour";
import { paymentOptions, DAILY_RATE } from "../workspacePlans";
import "../styles/pages.css";

import dailyImg from "../images/redesign/ws-daily.jpg";
import weeklyImg from "../images/redesign/ws-weekly.jpg";
import monthlyImg from "../images/redesign/ws-monthly.jpg";
import quarterlyImg from "../images/redesign/ws-quarterly.jpg";
import yearlyImg from "../images/redesign/ws-yearly.jpg";
import customImg from "../images/redesign/ws-custom.jpg";
import deskImg from "../images/redesign/ws-desk.jpg";
import meetingImg from "../images/redesign/ws-meeting.jpg";
import boardroomImg from "../images/redesign/ws-boardroom.jpg";
import heroImg from "../images/redesign/ws-hero.jpg";
import virtualImg from "../images/redesign/ws-virtual.jpg";
import registeredImg from "../images/redesign/ws-registered.jpg";

const naira = (amount) => `₦${amount.toLocaleString()}`;

// Office plans are priced over WhatsApp; the chat opens with the plan pre-filled.
const WHATSAPP_NUMBER = "2348068365951";
const whatsappLink = (planName) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hello Grazac, I'd like to know more about the ${planName} plan and its price.`
  )}`;

const membershipDetails = {
  daily: { name: "Daily Membership", unit: "day", image: dailyImg, access: "Access for 1 working day" },
  weekly: { name: "Weekly Membership", unit: "week", image: weeklyImg, access: "7 days of access" },
  monthly: { name: "Monthly Membership", unit: "month", image: monthlyImg, access: "31 days of access" },
  quarterly: { name: "Quarterly Membership", unit: "quarter", image: quarterlyImg, access: "91 days of access" },
  yearly: { name: "Yearly Membership", unit: "year", image: yearlyImg, access: "365 days of access" },
};

const sharedPerks = [
  "Access to the shared workspace",
  "High-speed internet",
  "24-hour power supply",
  "Access to the relaxation space",
];

// Prices come from workspacePlans.js so this page always matches checkout.
const memberships = [
  ...paymentOptions.map((option) => {
    const detail = membershipDetails[option.value];
    const saving = Math.round((1 - option.amount / (option.days * DAILY_RATE)) * 100);
    return {
      key: option.value,
      name: detail.name,
      image: detail.image,
      price: naira(option.amount),
      unit: detail.unit,
      badge: saving > 0 ? `Save ${saving}%` : null,
      features: [detail.access, ...sharedPerks],
      to: `/bookSpace?plan=${option.value}`,
    };
  }),
  {
    key: "custom",
    name: "Custom Days",
    image: customImg,
    price: naira(DAILY_RATE),
    unit: "day",
    badge: "Flexible",
    features: [
      "Pick any days that suit your schedule",
      "Bundle pricing when your days match a plan",
      ...sharedPerks.slice(0, 3),
    ],
    to: "/bookSpace?plan=custom",
  },
];

const spaces = [
  {
    key: "desk",
    name: "Dedicated Desk",
    image: deskImg,
    features: [
      "A personal desk that's yours every day",
      "A consistent, reliable workspace",
      "Impress clients with a professional base",
      "High-speed internet and 24-hour power",
    ],
  },
  {
    key: "meeting",
    name: "Meeting Room",
    image: meetingImg,
    features: [
      "Well-furnished room for your team",
      "Ideal for brainstorming sessions",
      "Host productive training sessions",
      "Set up to suit your needs",
    ],
  },
  {
    key: "boardroom",
    name: "Executive Boardroom",
    image: boardroomImg,
    features: [
      "Private room for business meetings",
      "Focus and comfort for your team",
      "A quiet environment to think in",
      "High-speed internet and 24-hour power",
    ],
  },
];

const officePlans = [
  {
    key: "virtual",
    name: "Virtual Office",
    image: virtualImg,
    imagePosition: "center 30%",
    features: [
      "Professional business address in Abeokuta",
      "Mail and package reception",
      "Access to meeting rooms when you need them",
      "Workspace access on selected days",
      "Access to the Grazac community and events",
    ],
  },
  {
    key: "registered",
    name: "Registered Office",
    image: registeredImg,
    features: [
      "Registered business address for your company",
      "Mail and official letters handled for you",
      "Signage display at our office",
      "Access to community events and news",
    ],
  },
].map((plan) => ({
  ...plan,
  priceNote: "Chat with us for pricing",
  href: whatsappLink(plan.name),
  cta: "Chat on WhatsApp",
  ctaIcon: <FaWhatsapp />,
}));

const amenities = [
  { label: "High-speed Internet", icon: <TbBrandSpeedtest /> },
  { label: "24-hour Power Supply", icon: <TbBolt /> },
  { label: "40+ Dedicated Desks", icon: <TbTable /> },
  { label: "Meeting Rooms", icon: <TbUsers /> },
  { label: "Relaxation Space", icon: <TbArmchair2 /> },
  { label: "Cleaning Services", icon: <TbSparkles /> },
  { label: "Car Parking Space", icon: <TbParking /> },
  { label: "Conducive Environment", icon: <TbPlant /> },
];

const PlanCard = ({ plan, index }) => (
  <article
    className="gz-plan"
    data-aos="fade-up"
    data-aos-delay={(index % 3) * 100}
    data-aos-once="true"
  >
    <div className="gz-plan__img">
      <img
        src={plan.image}
        alt=""
        loading="lazy"
        style={plan.imagePosition ? { objectPosition: plan.imagePosition } : undefined}
      />
      {plan.badge && <span className="gz-plan__badge">{plan.badge}</span>}
    </div>
    <div className="gz-plan__body">
      <h3 className="gz-h3">{plan.name}</h3>
      <p className="gz-plan__price">
        {plan.price ? (
          <>
            <strong>{plan.price}</strong> / {plan.unit}
          </>
        ) : (
          <strong className="gz-plan__note">{plan.priceNote || "Price on request"}</strong>
        )}
      </p>
      <ul className="gz-plan__list">
        {plan.features.map((feature) => (
          <li key={feature}>
            <TbCheck aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      {plan.href ? (
        <a
          href={plan.href}
          target="_blank"
          rel="noreferrer"
          className="gz-btn gz-plan__btn gz-btn--primary"
        >
          {plan.ctaIcon} {plan.cta}
        </a>
      ) : (
        <Link
          to={plan.to}
          className={`gz-btn gz-plan__btn ${plan.price ? "gz-btn--primary" : "gz-btn--ghost"}`}
        >
          {plan.cta || "Book now"} <FiArrowRight />
        </Link>
      )}
    </div>
  </article>
);

const CoworkingSpaces = () => {
  const [tour, setTour] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="gz">
      <Helmet>
        <title>Co-working Spaces - Grazac</title>
        <meta
          name="description"
          content="Flexible co-working memberships from ₦3,000 a day, plus dedicated desks, meeting rooms, virtual and registered offices at Grazac, Abeokuta."
        />
        <meta name="theme-color" content="#773DD3" />
        <meta property="og:title" content="Co-working Spaces - Grazac"></meta>
        <meta property="og:url" content="https://www.grazac.com.ng/coworking-spaces" />
      </Helmet>
      <Tour tour={tour} setTour={setTour} />

      {/* Intro */}
      <section className="gz-hero">
        <div className="gz-container gz-hero__grid">
          <div className="gz-hero__copy">
            <span className="gz-eyebrow">Grazac Co-working</span>
            <h1 className="gz-display">
              Co-working <span className="gz-accent">spaces.</span>
            </h1>
            <p className="gz-lead">
              From flexible day passes and long-term memberships to meeting rooms and virtual
              offices, Grazac has a workspace for every budget and working style.
            </p>
            <ul className="gz-facts">
              <li>
                <TbBolt /> 24-hour power
              </li>
              <li>
                <TbBrandSpeedtest /> High-speed internet
              </li>
              <li>
                <TbTable /> 40+ dedicated desks
              </li>
            </ul>
            <div className="gz-actions">
              <a href="#memberships" className="gz-btn gz-btn--primary">
                See plans <FiArrowRight />
              </a>
              <button type="button" className="gz-btn gz-btn--ghost" onClick={() => setTour(true)}>
                Book a tour
              </button>
            </div>
          </div>

          <div className="gz-hero__media gz-hero__media--single" data-aos="fade-left" data-aos-once="true">
            <div className="gz-hero__photo">
              <img src={heroImg} alt="Workstations at the Grazac co-working space" />
            </div>
            <div className="gz-chip gz-hero__chip">
              <span className="gz-chip__icon">
                <FiTag />
              </span>
              <span>
                <strong>From {naira(DAILY_RATE)} / day</strong>
                Flexible memberships
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="gz-section gz-section--tint" id="memberships">
        <div className="gz-container">
          <div className="gz-section-head">
            <span className="gz-eyebrow">Memberships</span>
            <h2 className="gz-h2">Pick a plan, book in minutes</h2>
            <p className="gz-lead">
              Every membership includes the full Grazac experience. The longer you stay, the more
              you save.
            </p>
          </div>
          <div className="gz-plans">
            {memberships.map((plan, index) => (
              <PlanCard key={plan.key} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Private spaces */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-section-head">
            <span className="gz-eyebrow">Private spaces</span>
            <h2 className="gz-h2">Desks and rooms for your team</h2>
            <p className="gz-lead">
              Need a permanent desk or a room for your next meeting? Chat with us on WhatsApp and
              we'll set it up.
            </p>
          </div>
          <div className="gz-plans">
            {spaces.map((space, index) => (
              <PlanCard
                key={space.key}
                plan={{
                  ...space,
                  priceNote: "Chat with us for pricing",
                  href: whatsappLink(space.name),
                  cta: "Chat on WhatsApp",
                  ctaIcon: <FaWhatsapp />,
                }}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Virtual & registered offices */}
      <section className="gz-section gz-section--tint" id="offices">
        <div className="gz-container gz-offices">
          <div className="gz-section-head gz-offices__head">
            <span className="gz-eyebrow">Office solutions</span>
            <h2 className="gz-h2">Virtual &amp; registered offices</h2>
            <p className="gz-lead">
              Give your business a professional address without renting a full office. Chat with
              us on WhatsApp to find the right plan and get pricing.
            </p>
            <a
              href={whatsappLink("Virtual Office / Registered Office")}
              target="_blank"
              rel="noreferrer"
              className="gz-link"
            >
              <FaWhatsapp /> Ask us a question
            </a>
          </div>
          <div className="gz-plans gz-plans--two">
            {officePlans.map((plan, index) => (
              <PlanCard key={plan.key} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-section-head gz-section-head--center">
            <span className="gz-eyebrow">Included amenities</span>
            <h2 className="gz-h2">Everything you need to do your best work</h2>
          </div>
          <ul className="gz-amenities">
            {amenities.map((amenity, index) => (
              <li
                key={amenity.label}
                data-aos="fade-up"
                data-aos-delay={(index % 5) * 60}
                data-aos-once="true"
              >
                <span className="gz-amenities__icon">{amenity.icon}</span>
                {amenity.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Tour CTA */}
      <section className="gz-section">
        <div className="gz-container">
          <div className="gz-banner" data-aos="fade-up" data-aos-once="true">
            <div>
              <h2 className="gz-h2">Not sure which plan is right for you?</h2>
              <p>Come see the space for yourself. Book a tour and our team will show you around.</p>
            </div>
            <div className="gz-actions">
              <button type="button" className="gz-btn gz-btn--light" onClick={() => setTour(true)}>
                Book a tour <FiArrowRight />
              </button>
              <Link to="/contact" className="gz-btn gz-btn--outline-light">
                Talk to us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoworkingSpaces;
