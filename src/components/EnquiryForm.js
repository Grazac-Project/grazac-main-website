import React, { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiX } from "react-icons/fi";

// Web3Forms emails each submission to the address on the Grazac Web3Forms account.
// Set REACT_APP_WEB3FORMS_ACCESS_KEY in .env (see .env.example); the key is
// designed to be used in front-end code.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_REGEX = /^\+?[0-9\s-]{7,16}$/;

const emptyForm = (space) => ({
  name: "",
  email: "",
  phone: "",
  company: "",
  space,
  teamSize: "",
  startDate: "",
  message: "",
});

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!EMAIL_REGEX.test(values.email.trim())) errors.email = "Please enter a valid email address.";
  if (!PHONE_REGEX.test(values.phone.trim())) errors.phone = "Please enter a valid phone number.";
  if (!values.space) errors.space = "Please choose a space.";
  return errors;
};

/**
 * Modal enquiry form for spaces that are priced on request
 * (desks, rooms, virtual and registered offices).
 */
const EnquiryForm = ({ open, space, spaces, onClose }) => {
  const [values, setValues] = useState(emptyForm(space));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [serverMessage, setServerMessage] = useState("");
  const firstFieldRef = useRef(null);
  const dialogRef = useRef(null);

  // The parent mounts this fresh on every open, so state starts clean.
  // Here we only lock page scroll, focus the first field and listen for Esc.
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
    const found = validate(values);
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

    setStatus("sending");
    setServerMessage("");
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `New workspace enquiry: ${values.space}`,
          from_name: "Grazac Website",
          replyto: values.email.trim(),
          botcheck: event.target.botcheck.checked,
          "Full name": values.name.trim(),
          Email: values.email.trim(),
          Phone: values.phone.trim(),
          Company: values.company.trim() || "-",
          "Space of interest": values.space,
          "Team size": values.teamSize || "-",
          "Preferred start date": values.startDate || "-",
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
              We've received your enquiry about the <strong>{values.space}</strong>. Our team will
              reach out to you shortly at {values.email.trim()}.
            </p>
            <button type="button" className="gz-btn gz-btn--primary" onClick={onClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="gz-modal__head">
              {/* <span className="gz-eyebrow">Enquiry</span> */}
              <h2 id="enquiry-title">Tell us what you need</h2>
              <p>Fill in your details and our team will reach out with pricing and availability.</p>
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
                <label htmlFor="enquiry-space">Space of interest</label>
                <select
                  id="enquiry-space"
                  name="space"
                  value={values.space}
                  onChange={handleChange}
                  aria-invalid={!!errors.space}
                  aria-describedby={describedBy("space")}
                >
                  <option value="">Choose a space</option>
                  {spaces.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
                {fieldError("space")}
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

              <div className="gz-field">
                <label htmlFor="enquiry-team"> Team size </label>
                <select id="enquiry-team" name="teamSize" value={values.teamSize} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Just me">Just me</option>
                  <option value="2-5 people">2-5 people</option>
                  <option value="6-10 people">6-10 people</option>
                  <option value="11+ people">11+ people</option>
                </select>
              </div>

              <div className="gz-field">
                <label htmlFor="enquiry-start">
                  Preferred start date <span>(optional)</span>
                </label>
                <input
                  id="enquiry-start"
                  name="startDate"
                  type="date"
                  value={values.startDate}
                  onChange={handleChange}
                  min={new Date().toISOString().slice(0, 10)}
                />
              </div>

              <div className="gz-field gz-field--full">
                <label htmlFor="enquiry-message">
                  Anything else? <span>(optional)</span>
                </label>
                <textarea
                  id="enquiry-message"
                  name="message"
                  rows={3}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="Tell us about your needs, schedule or questions"
                />
              </div>

              {status === "error" && (
                <p className="gz-form__alert" role="alert">
                  {serverMessage}
                </p>
              )}

              <div className="gz-field--full gz-form__actions">
                <button type="submit" className="gz-btn gz-btn--primary" disabled={status === "sending"}>
                  {status === "sending" ? "Sending…" : "Send enquiry"}
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
