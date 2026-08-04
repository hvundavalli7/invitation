import { weddingData } from "@/data/wedding";

type RsvpBody = {
  name?: string;
  email?: string;
  phone?: string;
  guests?: string;
  attending?: string;
  events?: string[];
  dietary?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  let body: RsvpBody;

  try {
    body = (await request.json()) as RsvpBody;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const attending = body.attending?.trim() ?? "";
  const phone = body.phone?.trim() ?? "";
  const guests = body.guests?.trim() || "1";
  const dietary = body.dietary?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const events = Array.isArray(body.events) ? body.events.filter(Boolean) : [];

  if (!name || !email || !attending) {
    return Response.json(
      { error: "Please share your name, email, and attendance." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (attending !== "yes" && attending !== "no") {
    return Response.json({ error: "Please choose whether you will attend." }, { status: 400 });
  }

  const notifyEmail =
    process.env.RSVP_NOTIFY_EMAIL?.trim() || weddingData.details.contact.email;

  if (!notifyEmail || !isValidEmail(notifyEmail)) {
    return Response.json(
      { error: "RSVP email is not configured. Please contact the couple directly." },
      { status: 500 },
    );
  }

  const attendingLabel = attending === "yes" ? "Joyfully attending" : "Unable to attend";
  const eventLabels = events
    .map((id) => weddingData.rsvp.events.find((event) => event.id === id)?.label ?? id)
    .join(", ");

  const subject = `Wedding RSVP: ${name} (${attending === "yes" ? "Attending" : "Declined"})`;
  const confirmation = weddingData.rsvp.confirmation;

  try {
    if (process.env.RESEND_API_KEY) {
      await sendWithResend({
        notifyEmail,
        guestEmail: email,
        subject,
        confirmation,
        fields: {
          name,
          email,
          phone: phone || "—",
          guests,
          attending: attendingLabel,
          events: eventLabels || "—",
          dietary: dietary || "—",
          message: message || "—",
        },
      });
    } else {
      await sendWithFormSubmit({
        notifyEmail,
        guestEmail: email,
        subject,
        confirmation,
        fields: {
          name,
          email,
          phone: phone || "—",
          guests,
          attending: attendingLabel,
          events: eventLabels || "—",
          dietary: dietary || "—",
          message: message || "—",
        },
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("RSVP email failed:", error);
    return Response.json(
      { error: "Unable to send RSVP email right now. Please try again shortly." },
      { status: 502 },
    );
  }
}

async function sendWithFormSubmit({
  notifyEmail,
  guestEmail,
  subject,
  confirmation,
  fields,
}: {
  notifyEmail: string;
  guestEmail: string;
  subject: string;
  confirmation: string;
  fields: Record<string, string>;
}) {
  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(notifyEmail)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...fields,
      _replyto: guestEmail,
      _subject: subject,
      _template: "table",
      _captcha: "false",
      _autoresponse: confirmation,
    }),
  });

  const data = (await res.json().catch(() => ({}))) as { success?: string | boolean; message?: string };

  if (!res.ok || data.success === "false" || data.success === false) {
    throw new Error(data.message || `FormSubmit request failed (${res.status})`);
  }
}

async function sendWithResend({
  notifyEmail,
  guestEmail,
  subject,
  confirmation,
  fields,
}: {
  notifyEmail: string;
  guestEmail: string;
  subject: string;
  confirmation: string;
  fields: Record<string, string>;
}) {
  const from =
    process.env.RSVP_FROM_EMAIL?.trim() || "Abhigna & Hemanth <onboarding@resend.dev>";
  const coupleName = weddingData.couple.displayName;

  const detailsHtml = Object.entries(fields)
    .map(([key, value]) => {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      return `<tr><td style="padding:6px 12px 6px 0;font-weight:600;">${label}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`;
    })
    .join("");

  const notifyHtml = `
    <h2>New wedding RSVP</h2>
    <p>A guest submitted an RSVP for ${escapeHtml(coupleName)}.</p>
    <table>${detailsHtml}</table>
  `;

  const guestHtml = `
    <h2>Thank you, ${escapeHtml(fields.name)}!</h2>
    <p>${escapeHtml(confirmation)}</p>
    <p><strong>Your response:</strong> ${escapeHtml(fields.attending)}</p>
    <p>With love,<br/>${escapeHtml(coupleName)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [notifyEmail],
      reply_to: guestEmail,
      subject,
      html: notifyHtml,
      text: Object.entries(fields)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n"),
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Resend notify failed: ${errText}`);
  }

  const guestRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [guestEmail],
      subject: `RSVP received — ${coupleName}`,
      html: guestHtml,
      text: `${confirmation}\n\nYour response: ${fields.attending}\n\nWith love,\n${coupleName}`,
    }),
  });

  if (!guestRes.ok) {
    const errText = await guestRes.text();
    throw new Error(`Resend guest confirmation failed: ${errText}`);
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
