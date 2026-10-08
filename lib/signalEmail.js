import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function resolveSignalEmailRecipients(users) {
  return [...new Set(users
    .map((user) => (user.email || user.username || "").trim().toLowerCase())
    .filter((email) => emailPattern.test(email)))];
}

export function createSmtpTransport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true" || Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  });
}

export function thcEmailContent(alert) {
  const headings = {
    NEW_THC: "🔥 NEW THC",
    FAILED_THC_REVERSED: "🔄 FAILED THC → REVERSED",
  };
  return {
    subject: headings[alert.alertType],
    text: [
      `Symbol: ${alert.symbol}`,
      `Timeframe: ${alert.timeframe}`,
      `Direction: ${alert.direction}`,
      `Entry: ${Number(alert.entry).toFixed(2)}`,
      `SL: ${Number(alert.sl).toFixed(2)}`,
      `TP: ${Number(alert.tp).toFixed(2)}`,
    ].join("\n"),
  };
}

export async function sendThcEmail(transporter, recipient, alert) {
  if (!transporter) throw new Error("SMTP is not configured");
  const { SMTP_USER, SMTP_FROM } = process.env;
  const content = thcEmailContent(alert);
  const result = await transporter.sendMail({
    from: SMTP_FROM || SMTP_USER,
    to: recipient,
    subject: content.subject,
    text: content.text,
  });
  return (result.accepted || []).some(
    (address) => String(address).trim().toLowerCase() === recipient
  );
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

export async function emailSignalToUsers(signal, users) {
  const transporter = createSmtpTransport();
  if (!transporter) {
    console.warn("Signal email skipped: SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS must be configured.");
    return { configured: false, sent: 0, failed: 0, skipped: users.length };
  }

  const { SMTP_USER, SMTP_FROM } = process.env;
  const recipients = resolveSignalEmailRecipients(users);

  if (!recipients.length) {
    return { configured: true, sent: 0, failed: 0, skipped: users.length };
  }

  const category = String(signal.category).toLowerCase();
  const signalUrl = new URL(
    `/signals/${encodeURIComponent(category)}?strategy=${encodeURIComponent(signal.strategy)}&signal=${signal._id}`,
    process.env.NEXTAUTH_URL || "http://localhost:3000"
  ).toString();
  const heading = signal.heading || signal.pair;
  const safeHeading = escapeHtml(heading);
  const safePair = escapeHtml(signal.pair);
  const safeCategory = escapeHtml(signal.category);
  const safeStrategy = escapeHtml(signal.strategy);

  let sent = 0;
  let failed = 0;
  for (let index = 0; index < recipients.length; index += 10) {
    const results = await Promise.allSettled(recipients.slice(index, index + 10).map((to) =>
      transporter.sendMail({
        from: SMTP_FROM || SMTP_USER,
        to,
        subject: `New trading signal: ${signal.pair}`,
        text: `Admin added a new signal: ${heading} (${signal.pair}).\nOpen it: ${signalUrl}`,
        html: `<p>Admin added a new signal: <strong>${safeHeading}</strong>.</p><p>${safePair} · ${safeCategory} · ${safeStrategy}</p><p><a href="${escapeHtml(signalUrl)}">View signal</a></p>`,
      })
    ));
    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value.accepted?.length) {
        sent += 1;
      } else {
        failed += 1;
        console.error(
          "Signal email delivery failed:",
          result.status === "rejected" ? result.reason?.message || "Unknown SMTP error" : "Recipient rejected by SMTP server"
        );
      }
    });
  }

  return { configured: true, sent, failed, skipped: users.length - recipients.length };
}
