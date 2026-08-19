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

type RsvpRecord = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  attending: string;
  attendingValue: "yes" | "no";
  events: string;
  dietary: string;
  message: string;
  submittedAt: string;
  updatedAt: string;
};

type RsvpCapabilities = {
  database: boolean;
  email: boolean;
};

type RsvpDbRow = {
  name: string;
  email: string;
  phone: string;
  guests: number;
  attending: "yes" | "no";
  events: string;
  dietary: string;
  message: string;
  submitted_at: string;
  updated_at: string;
};

const ADDITIONAL_RSVP_NOTIFY_EMAILS = ["sai.abhigna7@yahoo.com"] as const;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getRsvpCapabilities(): RsvpCapabilities {
  return {
    database: Boolean(process.env.SUPABASE_URL?.trim() && process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()),
    email: Boolean(process.env.RESEND_API_KEY?.trim()),
  };
}

/** Reports whether the RSVP storage and email providers are configured. */
export async function GET() {
  return Response.json({
    ...getRsvpCapabilities(),
  });
}

export async function POST(request: Request) {
  const capabilities = getRsvpCapabilities();

  if (!capabilities.database && !capabilities.email) {
    return Response.json(
      {
        error:
          "RSVP delivery is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY for database storage, RESEND_API_KEY for email, or leave rsvp.endpoint empty to use FormSubmit from the browser.",
      },
      { status: 503 },
    );
  }

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

  const record = buildRsvpRecord({
    name,
    email,
    phone,
    guests,
    attending,
    events,
    dietary,
    message,
  });

  let databaseSaved = !capabilities.database;
  let emailSent = !capabilities.email;
  let emailError: unknown;

  if (capabilities.database) {
    try {
      await saveToSupabase(record);
      databaseSaved = true;
    } catch (error) {
      console.error("RSVP database save failed:", error);
      return Response.json(
        { error: "Unable to save your RSVP right now. Please try again shortly." },
        { status: 502 },
      );
    }
  }

  if (capabilities.email) {
    try {
      await sendRsvpEmails({
        email,
        name,
        attending,
        phone,
        guests,
        dietary,
        message,
        record,
      });
      emailSent = true;
    } catch (error) {
      emailError = error;
      console.error("RSVP email failed:", error);
    }
  }

  if (databaseSaved && emailSent) {
    return Response.json({ ok: true, database: capabilities.database, email: capabilities.email });
  }

  if (databaseSaved && !emailSent) {
    return Response.json({
      ok: true,
      database: true,
      email: false,
      warning: "RSVP was saved, but the confirmation email could not be sent.",
    });
  }

  console.error("RSVP delivery failed:", emailError);
  return Response.json(
    { error: "Unable to send your RSVP right now. Please try again shortly." },
    { status: 502 },
  );
}

async function sendRsvpEmails({
  email,
  name,
  attending,
  phone,
  guests,
  dietary,
  message,
  record,
}: {
  email: string;
  name: string;
  attending: string;
  phone: string;
  guests: string;
  dietary: string;
  message: string;
  record: RsvpRecord;
}) {
  const notifyEmails = Array.from(
    new Set(
      [
        process.env.RSVP_NOTIFY_EMAIL?.trim(),
        weddingData.details.contact.email,
        ...ADDITIONAL_RSVP_NOTIFY_EMAILS,
      ].filter((value): value is string => Boolean(value && isValidEmail(value))),
    ),
  );

  if (!notifyEmails.length) {
    throw new Error("RSVP email is not configured. Please contact the couple directly.");
  }

  await sendWithResend({
    notifyEmails,
    guestEmail: email,
    subject: `Wedding RSVP: ${name} (${attending === "yes" ? "Attending" : "Declined"})`,
    confirmation: weddingData.rsvp.confirmation,
    fields: {
      name,
      email,
      phone: phone || "—",
      guests,
      attending: record.attending,
      events: record.events || "—",
      dietary: dietary || "—",
      message: message || "—",
    },
  });
}

function buildRsvpRecord(body: {
  name: string;
  email: string;
  phone: string;
  guests: string;
  attending: string;
  events: string[];
  dietary: string;
  message: string;
}): RsvpRecord {
  const attendingLabel = body.attending === "yes" ? "Joyfully attending" : "Unable to attend";
  const eventLabels = body.events
    .map((id) => weddingData.rsvp.events.find((event) => event.id === id)?.label ?? id)
    .join(", ");

  const submittedAt = new Date().toISOString();

  return {
    name: body.name,
    email: body.email,
    phone: body.phone || "—",
    guests: body.guests,
    attending: attendingLabel,
    attendingValue: body.attending as "yes" | "no",
    events: eventLabels || "—",
    dietary: body.dietary || "—",
    message: body.message || "—",
    submittedAt,
    updatedAt: submittedAt,
  };
}

async function saveToSupabase(record: RsvpRecord) {
  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Supabase database credentials are not configured.");
  }

  const payload: RsvpDbRow = {
    name: record.name,
    email: record.email,
    phone: record.phone,
    guests: Number.parseInt(record.guests, 10) || 1,
    attending: record.attendingValue,
    events: record.events,
    dietary: record.dietary,
    message: record.message,
    submitted_at: record.submittedAt,
    updated_at: record.updatedAt,
  };

  const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/rsvps?on_conflict=email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${serviceRoleKey}`,
      apikey: serviceRoleKey,
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify([payload]),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Supabase RSVP upsert failed: ${errText}`);
  }
}

async function sendWithResend({
  notifyEmails,
  guestEmail,
  subject,
  confirmation,
  fields,
}: {
  notifyEmails: string[];
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
      to: notifyEmails,
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
