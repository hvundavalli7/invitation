"use client";

import { FormEvent, useState } from "react";
import { weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import SectionCorners from "@/components/Decorative/SectionCorners";
import styles from "./RSVPForm.module.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  attending: "yes" | "no" | "";
  events: string[];
  dietary: string;
  message: string;
};

const initial: FormState = {
  name: "",
  email: "",
  phone: "",
  guests: "1",
  attending: "",
  events: [],
  dietary: "",
  message: "",
};

function buildFormSubmitPayload(form: FormState) {
  const { rsvp } = weddingData;
  const attendingLabel =
    form.attending === "yes" ? "Joyfully attending" : "Unable to attend";
  const eventLabels = form.events
    .map((id) => rsvp.events.find((event) => event.id === id)?.label ?? id)
    .join(", ");

  return {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim() || "—",
    guests: form.guests.trim() || "1",
    attending: attendingLabel,
    events: eventLabels || "—",
    dietary: form.dietary.trim() || "—",
    message: form.message.trim() || "—",
    _replyto: form.email.trim(),
    _subject: `Wedding RSVP: ${form.name.trim()} (${
      form.attending === "yes" ? "Attending" : "Declined"
    })`,
    _template: "table",
    _captcha: "false",
    _autoresponse: rsvp.confirmation,
  };
}

export default function RSVPForm() {
  const { rsvp, details } = weddingData;
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");

  const toggleEvent = (id: string) => {
    setForm((prev) => ({
      ...prev,
      events: prev.events.includes(id)
        ? prev.events.filter((e) => e !== id)
        : [...prev.events, id],
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.attending) {
      setError("Please share your name, email, and attendance.");
      return;
    }

    setStatus("submitting");

    try {
      let endpoint = rsvp.endpoint.trim();

      if (!endpoint) {
        try {
          const probe = await fetch("/api/rsvp", { method: "GET" });
          const info = (await probe.json().catch(() => ({}))) as { provider?: string };
          if (probe.ok && info.provider === "resend") {
            endpoint = "/api/rsvp";
          }
        } catch {
          // Fall through to FormSubmit
        }
      }

      if (!endpoint) {
        const notifyEmail = details.contact.email;
        if (!notifyEmail) {
          throw new Error("RSVP email is not configured.");
        }
        endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`;
      }

      const isFormSubmit = endpoint.includes("formsubmit.co");
      const payload = isFormSubmit
        ? buildFormSubmitPayload(form)
        : {
            ...form,
            submittedAt: new Date().toISOString(),
          };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        success?: string | boolean;
        message?: string;
        ok?: boolean;
      };

      const formSubmitNeedsActivation =
        isFormSubmit &&
        typeof data.message === "string" &&
        data.message.toLowerCase().includes("activation");

      const formSubmitOk =
        isFormSubmit && (data.success === true || data.success === "true" || formSubmitNeedsActivation);

      if (!res.ok && !formSubmitNeedsActivation) {
        throw new Error(data.error || data.message || "Request failed");
      }

      if (isFormSubmit && !formSubmitOk) {
        throw new Error(data.message || data.error || "Request failed");
      }

      if (!isFormSubmit && data.error) {
        throw new Error(data.error);
      }

      setStatus("success");
      setForm(initial);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again shortly.",
      );
    }
  };

  const showEvents = form.attending !== "no";

  return (
    <section id="rsvp" className={`section section--cream ${styles.section}`} aria-labelledby="rsvp-title">
      <SectionCorners />
      <div className="section__inner">
        <ScrollReveal>
          <p className="section__eyebrow">Kindly respond</p>
          <h2 id="rsvp-title" className="section__title">
            {rsvp.title}
          </h2>
          <p className="section__subtitle">{rsvp.subtitle}</p>
          <div className="ornament-rule" aria-hidden="true">
            <span className="ornament-rule__jewel" />
          </div>
        </ScrollReveal>

        <ScrollReveal className={`${styles.panel} wood-panel`}>
          {status === "success" ? (
            <p className={styles.success} role="status">
              {rsvp.confirmation}
            </p>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <div className={styles.row}>
                <label>
                  <span>Guest name</span>
                  <input
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </label>
              </div>

              <div className={styles.row}>
                <label>
                  <span>Phone number</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </label>
                <label>
                  <span>Number of guests</span>
                  <input
                    type="number"
                    name="guests"
                    min={1}
                    max={20}
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  />
                </label>
              </div>

              <fieldset className={styles.fieldGroup}>
                <legend className={styles.groupLegend}>Will you be attending?</legend>
                <div className={styles.controlBox} role="presentation">
                  <label className={styles.inline}>
                    <input
                      type="radio"
                      name="attending"
                      checked={form.attending === "yes"}
                      onChange={() => setForm({ ...form, attending: "yes" })}
                    />
                    Yes, can&apos;t wait
                  </label>
                  <label className={styles.inline}>
                    <input
                      type="radio"
                      name="attending"
                      checked={form.attending === "no"}
                      onChange={() =>
                        setForm({ ...form, attending: "no", events: [] })
                      }
                    />
                    Sorry, can&apos;t make it
                  </label>
                </div>
              </fieldset>

              {showEvents ? (
                <fieldset className={styles.fieldGroup}>
                  <legend className={styles.groupLegend}>Events attending</legend>
                  <div className={`${styles.controlBox} ${styles.checks}`} role="presentation">
                    {rsvp.events.map((event) => (
                      <label key={event.id} className={styles.inline}>
                        <input
                          type="checkbox"
                          checked={form.events.includes(event.id)}
                          onChange={() => toggleEvent(event.id)}
                        />
                        {event.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ) : null}

              <label className={styles.full}>
                <span>Dietary restrictions</span>
                <input
                  name="dietary"
                  value={form.dietary}
                  onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                  placeholder="Allergies or preferences"
                />
              </label>

              <label className={styles.full}>
                <span>Message for the couple</span>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Share your blessings..."
                />
              </label>

              {error ? (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className={`btn-temple ${styles.submit}`}
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Sending..." : "Send RSVP"}
              </button>
            </form>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
