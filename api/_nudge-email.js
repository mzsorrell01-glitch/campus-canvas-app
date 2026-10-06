// The Campus Canvas nudge email ("Your camera roll probably has more Queen's
// memories than you think"). The approved graphic is used as-is, cut into
// slices stacked edge to edge; the two button slices are links. Sent by
// notify-nudge.js.
const { APP_URL } = require('./_email');

// ---- The two button destinations. Change them here. ----
const ADD_PHOTO_URL = 'https://app.artup.life';
const FEEDBACK_URL = 'https://www.artup.life/contact/';

const SUBJECT = 'Got another Queen’s memory?';
// The grey preview line inboxes show after the subject.
const PREHEADER = 'Add another photo to Campus Canvas, or tell us what would make it better.';

// The slices of the graphic, top to bottom, in assets/email/. A row is one
// full-width slice, or three side by side with the button in the middle so
// only the button itself is the link. `w` is each slice's pixel width out of
// 1024. The alt text is what people read when their inbox blocks images.
const IMAGES = `${APP_URL}/assets/email`;
const ROWS = [
  [{ file: 'nudge-top.jpg', w: 1024, alt: 'Campus Canvas · Queen’s 2026. Your camera roll probably has more Queen’s memories than you think. Campus Canvas is collecting the places, people, moments, and experiences that students feel define their time at Queen’s — and we’d love to see another one of yours. Got another memory? Add another photo to Campus Canvas and help shape what represents the Queen’s experience.' }],
  [{ file: 'nudge-add-left.jpg', w: 266 }, { file: 'nudge-add-button.jpg', w: 494, alt: 'Add a photo →', href: ADD_PHOTO_URL }, { file: 'nudge-add-right.jpg', w: 264 }],
  [{ file: 'nudge-mid.jpg', w: 1024, alt: 'We’re also still building Campus Canvas, and your feedback genuinely helps us make it better. Was anything confusing, difficult to use, or stopping you from participating? Tell us — even one sentence helps.' }],
  [{ file: 'nudge-fb-left.jpg', w: 318 }, { file: 'nudge-fb-button.jpg', w: 393, alt: 'Share feedback →', href: FEEDBACK_URL }, { file: 'nudge-fb-right.jpg', w: 313 }],
  [{ file: 'nudge-bottom.jpg', w: 1024, alt: 'The memories students contribute will help inspire original artwork created for ArtUp’s Queen’s graduation collection. See you at the canvas, ArtUp.' }],
];

const WIDTH = 640;
const IVORY = '#F5F2EA';
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

function cell({ file, w, alt = '', href }, px) {
  const altStyle = href
    ? 'font-family:Georgia,serif; font-size:16px; font-weight:bold; letter-spacing:2px; text-transform:uppercase; color:#141311; text-align:center;'
    : 'font-family:Georgia,serif; font-size:17px; line-height:1.5; color:#141311; text-align:center;';
  const img = `<img src="${IMAGES}/${file}" width="${px}" alt="${attr(alt)}" style="display:block; width:100%; height:auto; border:0; outline:none; text-decoration:none; ${altStyle}">`;
  return `<td width="${px}" valign="top" style="width:${(w / 1024 * 100).toFixed(4)}%; padding:0; font-size:0; line-height:0;">${href ? `<a href="${href}" target="_blank" style="display:block; text-decoration:none;">${img}</a>` : img}</td>`;
}

// Each row is its own table, so the two button rows can split differently.
function row(cells) {
  // Whole pixels that add up to exactly WIDTH, for clients that need them.
  const px = cells.map((c) => Math.round(c.w * WIDTH / 1024));
  px[px.length - 1] += WIDTH - px.reduce((a, b) => a + b, 0);
  return `
        <tr>
          <td style="padding:0; font-size:0; line-height:0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; table-layout:fixed;"><tr>${cells.map((c, i) => cell(c, px[i])).join('')}</tr></table>
          </td>
        </tr>`;
}

function nudgeEmail() {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${SUBJECT}</title>
<style>
  :root { color-scheme: light only; }
  body { margin:0; padding:0; }
</style>
</head>
<body style="margin:0; padding:0; background:${IVORY};">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:${IVORY};">${PREHEADER}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${IVORY}" style="background:${IVORY};">
  <tr>
    <td align="center" style="padding:0;">
      <!--[if mso]><table role="presentation" width="${WIDTH}" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:${WIDTH}px; margin:0 auto; border-collapse:collapse;">${ROWS.map(row).join('')}
        <tr>
          <td align="center" style="padding:14px 24px 28px; font-family:Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6; color:#6F675A;">You&rsquo;re getting this because you signed up for Campus Canvas with this email address. Reply to this email if you&rsquo;d rather not hear from us.</td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>
</table>
</body>
</html>`;

  // Plain-text version for clients that don't show HTML.
  const text = [
    'CAMPUS CANVAS · QUEEN’S 2026',
    '',
    'Your camera roll probably has more Queen’s memories than you think.',
    '',
    'Campus Canvas is collecting the places, people, moments, and experiences that students feel define their time at Queen’s — and we’d love to see another one of yours.',
    '',
    'Got another memory?',
    'Add another photo to Campus Canvas and help shape what represents the Queen’s experience.',
    `Add a photo: ${ADD_PHOTO_URL}`,
    '',
    'We’re also still building Campus Canvas, and your feedback genuinely helps us make it better.',
    'Was anything confusing, difficult to use, or stopping you from participating? Tell us — even one sentence helps.',
    `Share feedback: ${FEEDBACK_URL}`,
    '',
    'The memories students contribute will help inspire original artwork created for ArtUp’s Queen’s graduation collection.',
    '',
    'See you at the canvas,',
    'ArtUp',
    '',
    'You’re getting this because you signed up for Campus Canvas with this email address. Reply to this email if you’d rather not hear from us.',
  ].join('\n');

  return { subject: SUBJECT, html, text };
}

module.exports = { nudgeEmail, ADD_PHOTO_URL, FEEDBACK_URL };
