"use client";

import { FormEvent, useState } from "react";
import { weddingData } from "@/data/wedding";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";
import styles from "./RSVPForm.module.css";

type FormState = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  attending: "yes" | "no" | "";
  events: string[];
  meal: string;
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
  meal: "",
  dietary: "",
  message: "",
};

export default function RSVPForm() {
  const { rsvp } = weddingData;
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

    const payload = {
      ...form,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (rsvp.endpoint) {
        const res = await fetch(rsvp.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // Local / demo mode — ready to wire to Firebase, Supabase, Sheets, Formspree, or API
        await new Promise((r) => setTimeout(r, 500));
        if (typeof window !== "undefined") {
          const key = "abhigna-hemanth-rsvps";
          const existing = JSON.parse(window.localStorage.getItem(key) || "[]");
          existing.push(payload);
          window.localStorage.setItem(key, JSON.stringify(existing));
        }
      }
      setStatus("success");
      setForm(initial);
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again shortly.");
    }
  };

  return (
    <section id="rsvp" className={`section section--cream ${styles.section}`} aria-labelledby="rsvp-title">
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

              <fieldset className={styles.fieldset}>
                <legend>Will you be attending?</legend>
                <label className={styles.inline}>
                  <input
                    type="radio"
                    name="attending"
                    checked={form.attending === "yes"}
                    onChange={() => setForm({ ...form, attending: "yes" })}
                  />
                  Joyfully attending
                </label>
                <label className={styles.inline}>
                  <input
                    type="radio"
                    name="attending"
                    checked={form.attending === "no"}
                    onChange={() => setForm({ ...form, attending: "no" })}
                  />
                  Regretfully unable to attend
                </label>
              </fieldset>

              <fieldset className={styles.fieldset}>
                <legend>Events attending</legend>
                <div className={styles.checks}>
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

              <div className={styles.row}>
                <label>
                  <span>Meal preference</span>
                  <select
                    name="meal"
                    value={form.meal}
                    onChange={(e) => setForm({ ...form, meal: e.target.value })}
                  >
                    <option value="">Select an option</option>
                    {rsvp.mealOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Dietary restrictions</span>
                  <input
                    name="dietary"
                    value={form.dietary}
                    onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                    placeholder="Allergies or preferences"
                  />
                </label>
              </div>

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
