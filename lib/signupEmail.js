import { createSmtpTransport } from "@/lib/signalEmail";

const DEFAULT_ADMIN_EMAIL = "mmhacademy0@gmail.com";

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character]);
}

function siteUrl(path) {
  return new URL(path, process.env.NEXTAUTH_URL || "http://localhost:3000").toString();
}

export function welcomeEmailContent(user) {
  const loginUrl = siteUrl("/login");
  const signalsUrl = siteUrl("/elite-signals");
  const username = escapeHtml(user.username);

  return {
    subject: "Welcome to MMH Trading Academy – Your account is ready",
    text: [
      `Hi ${user.username},`,
      "",
      "Welcome to MMH Trading Academy!",
      "Your account has been registered successfully and you can now log in.",
      "",
      `Username: ${user.username}`,
      `Email: ${user.email}`,
      "",
      "Your account includes access to our trading signals, tools and resources.",
      "Course access is granted separately by the academy admin.",
      "",
      `Log in here: ${loginUrl}`,
      "",
      "Trade with discipline, manage your risk, and stay consistent.",
      "",
      "— Team MMH Trading Academy",
    ].join("\n"),
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;background:#0D1117;color:#e2e8f0;border-radius:16px;padding:32px">
  <h1 style="margin:0 0 8px;color:#ffffff;font-size:22px">Welcome to <span style="color:#22d3ee">MMH Trading Academy</span></h1>
  <p style="margin:0 0 20px;color:#94a3b8;font-size:13px">Your account is registered and ready to use.</p>
  <p style="font-size:14px;line-height:1.6">Hi <strong>${username}</strong>,</p>
  <p style="font-size:14px;line-height:1.6">Thank you for joining MMH Trading Academy! Your account has been created successfully and you can now log in.</p>
  <table style="width:100%;background:#010409;border-radius:12px;padding:16px;margin:16px 0;font-size:13px">
    <tr><td style="color:#64748b;padding:4px 0">Username</td><td style="color:#ffffff;font-weight:bold">${username}</td></tr>
    <tr><td style="color:#64748b;padding:4px 0">Email</td><td style="color:#ffffff;font-weight:bold">${escapeHtml(user.email)}</td></tr>
  </table>
  <p style="font-size:14px;line-height:1.6">Your account includes access to our <strong>trading signals</strong>, tools and resources. Course access is granted separately by the academy admin.</p>
  <p style="text-align:center;margin:28px 0">
    <a href="${escapeHtml(loginUrl)}" style="background:#22d3ee;color:#000000;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:12px;display:inline-block;font-size:13px;letter-spacing:1px">LOG IN NOW</a>
  </p>
  <p style="font-size:13px;line-height:1.6;color:#94a3b8">Explore live signals: <a href="${escapeHtml(signalsUrl)}" style="color:#22d3ee">${escapeHtml(signalsUrl)}</a></p>
  <p style="font-size:13px;line-height:1.6;color:#94a3b8">Trade with discipline, manage your risk, and stay consistent.</p>
  <p style="font-size:13px;margin-top:24px">— Team MMH Trading Academy</p>
</div>`,
  };
}

export function adminSignupEmailContent(user) {
  const adminUrl = siteUrl("/admin");
  const registeredAt = new Date(user.createdAt || Date.now()).toUTCString();

  return {
    subject: `New signup: ${user.username}`,
    text: [
      "A new user has registered on MMH Trading Academy.",
      "",
      `Username: ${user.username}`,
      `Email: ${user.email}`,
      `Registered: ${registeredAt}`,
      "Signals access: Enabled",
      "Courses: None (assign from the admin panel)",
      "",
      `Admin panel: ${adminUrl}`,
    ].join("\n"),
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto">
  <h2 style="margin:0 0 12px">New user signup</h2>
  <p>A new user has registered on MMH Trading Academy.</p>
  <table style="font-size:14px;border-collapse:collapse">
    <tr><td style="padding:4px 16px 4px 0;color:#64748b">Username</td><td><strong>${escapeHtml(user.username)}</strong></td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#64748b">Email</td><td>${escapeHtml(user.email)}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#64748b">Registered</td><td>${escapeHtml(registeredAt)}</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#64748b">Signals access</td><td>Enabled</td></tr>
    <tr><td style="padding:4px 16px 4px 0;color:#64748b">Courses</td><td>None (assign from the admin panel)</td></tr>
  </table>
  <p style="margin-top:20px"><a href="${escapeHtml(adminUrl)}">Open admin panel</a></p>
</div>`,
  };
}

// Sends the welcome email to the new user and a notification to the academy inbox.
// Never throws: a mail failure must not fail the signup itself.
export async function sendSignupEmails(user) {
  const transporter = createSmtpTransport();
  if (!transporter) {
    console.warn("Signup emails skipped: SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS must be configured.");
    return { configured: false, welcome: false, admin: false };
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const adminEmail = process.env.ADMIN_NOTIFY_EMAIL || DEFAULT_ADMIN_EMAIL;
  const welcome = welcomeEmailContent(user);
  const admin = adminSignupEmailContent(user);

  const [welcomeResult, adminResult] = await Promise.allSettled([
    transporter.sendMail({ from, to: user.email, ...welcome }),
    transporter.sendMail({ from, to: adminEmail, replyTo: user.email, ...admin }),
  ]);

  [welcomeResult, adminResult].forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `Signup ${index === 0 ? "welcome" : "admin"} email failed:`,
        result.reason?.message || "Unknown SMTP error"
      );
    }
  });

  return {
    configured: true,
    welcome: welcomeResult.status === "fulfilled",
    admin: adminResult.status === "fulfilled",
  };
}
