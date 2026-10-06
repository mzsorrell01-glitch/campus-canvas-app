// Sends the Campus Canvas nudge email (see _nudge-email.js). For now this
// only sends a test to one address typed into the admin console; it never
// emails the student list.
const { requireAdmin, resend } = require('./_email');
const { nudgeEmail } = require('./_nudge-email');

module.exports = async (req, res) => {
  try {
    const token = await requireAdmin(req, res);
    if (!token) return;
    const testTo = String((req.body && req.body.testTo) || '').trim();
    if (!/^[^\s@,;]+@[^\s@,;]+\.[^\s@,;]+$/.test(testTo)) return res.status(400).json({ error: 'Add one email address to send the test to' });
    const { subject, html, text } = nudgeEmail();
    await resend('/emails', { from: process.env.EMAIL_FROM, to: testTo, subject: `[Test] ${subject}`, html, text });
    return res.status(200).json({ sent: 1 });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
