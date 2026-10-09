import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

// Web3Forms emails each submission to the address on the Grazac Web3Forms account.
// Set REACT_APP_WEB3FORMS_ACCESS_KEY in .env (see .env.example); the key is
// designed to be used in front-end code.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,16}$/;

/*
 * Each form variant describes its topic dropdown, extra fields and wording.
 * `workspace` is used on the co-working page, `build` on the Grazac Build page.
 */
export const ENQUIRY_FORMS = {
  workspace: {
    title: "Tell us what you need",
    intro: "Fill in your details and our team will reach out with pricing and availability.",
    subject: (topic) => `New workspace enquiry: ${topic}`,
    successAbout: (topic) => `the ${topic}`,
    topic: {
      label: "Space of interest",
      placeholder: "Choose a space",
      error: "Please choose a space.",
      emailLabel: "Space of interest",
    },
    extraFields: [
      {
        name: "teamSize",
        label: "Team size",
        type: "select",
        options: ["Just me", "2-5 people", "6-10 people", "11+ people"],
        emailLabel: "Team size",
      },
      {
        name: "startDate",
        label: "Preferred start date",
        type: "date",
        optional: true,
        emailLabel: "Preferred start date",
      },
    ],
    message: {
      label: "Anything else?",
      placeholder: "Tell us about your needs, schedule or questions",
      required: false,
    },
    submitLabel: "Send enquiry",
  },
  build: {
    title: "Start your project",
    intro: "Tell us about your idea and our team will get back to you to discuss the next steps.",
    subject: (topic) => `New Grazac Build project: ${topic}`,
    successAbout: (topic) => topic,
    topic: {
      label: "What do you need?",
      placeholder: "Choose a service",
      error: "Please choose a service.",
      emailLabel: "Service",
    },
    extraFields: [
      {
        name: "timeline",
        label: "Timeline",
        type: "select",
        options: ["As soon as possible", "Within 1-3 months", "Within 3-6 months", "Just exploring"],
        emailLabel: "Timeline",
      },
      {
        name: "source",
        label: "How did you hear about us?",
        type: "select",
        options: ["Social media", "Email", "Referral", "Grazac staff", "Online advert", "Other"],
        emailLabel: "Heard about us via",
      },
    ],
    message: {
      label: "Tell us about your project",
      placeholder: "What are you building, who is it for, and what would success look like?",
      required: true,
      error: "Please tell us a little about your project.",
    },
    submitLabel: "Send project details",
  },
};

const emptyForm = (config, topic) => {
  const values = { name: "", email: "", phone: "", company: "", topic: topic || "", message: "" };
  config.extraFields.forEach((field) => {
    values[field.name] = "";
  });
  return values;
};

const validate = (values, config) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_REGEX.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!PHONE_REGEX.test(values.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!values.topic) errors.topic = config.topic.error;
  if (config.message.required && !values.message.trim()) errors.message = config.message.error;
  return errors;
};

/**
 * Modal enquiry form, emailed through Web3Forms.
 * Mount it only while open (the parent renders it conditionally) so state starts clean.
 */
const EnquiryForm = ({ open, variant = "workspace", topic, options, onClose }) => {
  const config = ENQUIRY_FORMS[variant];
  const [values, setValues] = useState(() => emptyForm(config, topic));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverMessage, setServerMessage] = useState("");
  const firstFieldRef = useRef(null);
  const dialogRef = useRef(null);

  // Lock page scroll, focus the first field and listen for Esc while open.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => firstFieldRef.current && firstFieldRef.current.focus(), 50);

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const found = validate(values, config);
    setErrors(found);
    if (Object.keys(found).length) {
      const firstInvalid = dialogRef.current.querySelector(`[name="${Object.keys(found)[0]}"]`);
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (!ACCESS_KEY) {
      setStatus("error");
      setServerMessage(
        "This form isn't connected yet. Please contact us on +234 806 836 5951 in the meantime."
      );
      return;
    }

    const extras = {};
    config.extraFields.forEach((field) => {
      extras[field.emailLabel] = values[field.name] || "-";
    });

    setStatus("sending");
    setServerMessage("");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: config.subject(values.topic),
          from_name: "Grazac Website",
          replyto: values.email.trim(),
          botcheck: event.target.botcheck.checked,
          "Full name": values.name.trim(),
          Email: values.email.trim(),
          Phone: values.phone.trim(),
          Company: values.company.trim() || "-",
          [config.topic.emailLabel]: values.topic,
          ...extras,
          Message: values.message.trim() || "-",
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setServerMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setServerMessage("We couldn't send your enquiry. Check your connection and try again.");
    }
  };

  const fieldError = (name) =>
    errors[name] ? (
      <span className="gz-field__error" id={`enquiry-${name}-error`}>
        {errors[name]}
      </span>
    ) : null;

  const describedBy = (name) => (errors[name] ? `enquiry-${name}-error` : undefined);

  const renderExtraField = (field) => (
    <div className="gz-field" key={field.name}>
      <label htmlFor={`enquiry-${field.name}`}>
        {field.label} {field.optional && <span>(optional)</span>}
      </label>
      {field.type === "select" ? (
        <select
          id={`enquiry-${field.name}`}
          name={field.name}
          value={values[field.name]}
          onChange={handleChange}
        >
          <option value="">Select</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={`enquiry-${field.name}`}
          name={field.name}
          type={field.type}
          value={values[field.name]}
          onChange={handleChange}
          min={field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
        />
      )}
    </div>
  );

  return (
    <div className="gz-modal" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div
        className="gz-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        ref={dialogRef}
      >
        <button type="button" className="gz-modal__close" onClick={onClose} aria-label="Close">
          <FiX />
        </button>

        {status === "success" ? (
          <div className="gz-modal__success" role="status">
            <FiCheckCircle />
            <h2 id="enquiry-title">Thank you, {values.name.trim().split(" ")[0]}!</h2>
            <p>
              We've received your enquiry about <strong>{config.successAbout(values.topic)}</strong>. Our team will reach
              out to you shortly at {values.email.trim()}.
            </p>
            <button type="button" className="gz-btn gz-btn--primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="gz-modal__head">
              <h2 id="enquiry-title">{config.title}</h2>
              <p>{config.intro}</p>
            </div>

            <form className="gz-form" onSubmit={handleSubmit} noValidate>
              {/* honeypot for Web3Forms spam protection */}
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="gz-field gz-field--full">
                <label htmlFor="enquiry-topic">{config.topic.label}</label>
                <select
                  id="enquiry-topic"
                  name="topic"
                  value={values.topic}
                  onChange={handleChange}
                  aria-invalid={!!errors.topic}
                  aria-describedby={describedBy("topic")}
                >
                  <option value="">{config.topic.placeholder}</option>
                  {options.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {fieldError("topic")}
              </div>

              <div className="gz-field">
                <label htmlFor="enquiry-name">Full name</label>
                <input
                  id="enquiry-name"
                  name="name"
                  ref={firstFieldRef}
                  value={values.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.name}
                  aria-describedby={describedBy("name")}
                />
                {fieldError("name")}
              </div>

              <div className="gz-field">
                <label htmlFor="enquiry-email">Email address</label>
                <input
                  id="enquiry-email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="jane@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={describedBy("email")}
                />
                {fieldError("email")}
              </div>

              <div className="gz-field">
                <label htmlFor="enquiry-phone">Phone number</label>
                <input
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  value={values.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  placeholder="0801 234 5678"
                  aria-invalid={!!errors.phone}
                  aria-describedby={describedBy("phone")}
                />
                {fieldError("phone")}
              </div>

              <div className="gz-field">
                <label htmlFor="enquiry-company">Company </label>
                <input
                  id="enquiry-company"
                  name="company"
                  value={values.company}
                  onChange={handleChange}
                  autoComplete="organization"
                  placeholder="Your company"
                />
              </div>

              {config.extraFields.map(renderExtraField)}

              <div className="gz-field gz-field--full">
                <label htmlFor="enquiry-message">
                  {config.message.label} {!config.message.required && <span>(optional)</span>}
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={config.message.required ? 4 : 3}
                  value={values.message}
                  onChange={handleChange}
                  placeholder={config.message.placeholder}
                  aria-invalid={!!errors.message}
                  aria-describedby={describedBy("message")}
                />
                {fieldError("message")}
              </div>

              {status === "error" && (
                <p className="gz-form__alert" role="alert">
                  {serverMessage}
                </p>
              )}

              <div className="gz-field--full gz-form__actions">
                <button type="submit" className="gz-btn gz-btn--primary" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : config.submitLabel}
                </button>
                <p>We'll only use your details to respond to this enquiry.</p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryForm;
