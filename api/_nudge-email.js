// The Campus Canvas nudge email ("Your camera roll probably has more Queen's
// memories than you think"). Built from the approved graphic as a real email:
// live text, table layout, inline styles, and two buttons that are links.
// Sent by notify-nudge.js.
const { APP_URL } = require('./_email');

// ---- The two button destinations. Change them here. ----
const ADD_PHOTO_URL = 'https://app.artup.life';
const FEEDBACK_URL = 'https://www.artup.life/contact/';

const SUBJECT = 'Got another Queen’s memory?';
// The grey preview line inboxes show after the subject.
const PREHEADER = 'Add another photo to Campus Canvas, or tell us what would make it better.';

// Images are served by the app itself, from assets/email/.
const IMAGES = `${APP_URL}/assets/email`;
const MONOGRAM = `${IMAGES}/monogram.png`;
const SIGNATURE = `${IMAGES}/signature-gold.png`;
// The Queen's building photo behind the text, already faded to 18% over
// ivory so the text stays readable. Set to '' for a plain ivory background.
const BUILDING = `${IMAGES}/queens-building.jpg`;

const SERIF = "'Newsreader', Georgia, 'Times New Roman', Times, serif";
const INK = '#141311';
const IVORY = '#F7F3EA';
const GOLD = '#B8922E';

// A thin centred rule. Tables, not <hr>, so every client draws it the same.
function rule(width, color, height = 1) {
  return `
            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
              <tr><td width="${width}" height="${height}" bgcolor="${color}" style="width:${width}px; height:${height}px; line-height:${height}px; font-size:0; background:${color}; border-radius:${height}px;">&nbsp;</td></tr>
            </table>`;
}

// A button whose whole rectangle is the link. Outlook on Windows ignores
// padding on links, so it gets the same button drawn as a VML shape.
function button({ href, label, width, height, bg, border, color, size, spacing }) {
  const text = `${label} &nbsp;&rarr;`;
  return `
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:${height}px; v-text-anchor:middle; width:${width}px;" arcsize="12%" strokecolor="${border}" strokeweight="2px" fillcolor="${bg}">
              <w:anchorlock/>
              <center style="color:${color}; font-family:Georgia,serif; font-size:${size}px; font-weight:bold; letter-spacing:3px;">${text}</center>
            </v:roundrect>
            <![endif]-->
            <!--[if !mso]><!-- -->
            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;">
              <tr>
                <td align="center" bgcolor="${bg}" style="background:${bg}; border-radius:8px;">
                  <a href="${href}" target="_blank" class="btn" style="display:block; width:${width - 4}px; max-width:100%; box-sizing:border-box; padding:${Math.round((height - 4 - size * 1.3) / 2)}px 12px; border:2px solid ${border}; border-radius:8px; font-family:${SERIF}; font-size:${size}px; line-height:1.3; font-weight:600; letter-spacing:${spacing}; text-transform:uppercase; text-decoration:none; text-align:center; white-space:nowrap; color:${color};">${text}</a>
                </td>
              </tr>
            </table>
            <!--<![endif]-->`;
}

function nudgeEmail() {
  const background = BUILDING ? ` background="${BUILDING}"` : '';
  const backgroundCss = BUILDING ? ` background-image:url('${BUILDING}'); background-size:cover; background-position:center top; background-repeat:no-repeat;` : '';

  const html = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>${SUBJECT}</title>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<style>
  @import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap');
  :root { color-scheme: light only; }
  body { margin:0; padding:0; }
  img { border:0; outline:none; text-decoration:none; }
  @media only screen and (max-width:520px) {
    .pad { padding-left:22px !important; padding-right:22px !important; }
    .frame-gap { padding:8px !important; }
    .h1 { font-size:33px !important; }
    .h2 { font-size:27px !important; }
    .lead { font-size:17px !important; }
    .body { font-size:16px !important; }
    .eyebrow { font-size:11px !important; letter-spacing:2px !important; }
    .eyebrow-line { width:24px !important; }
    .btn { width:auto !important; padding-left:22px !important; padding-right:22px !important; font-size:15px !important; letter-spacing:3px !important; }
  }
</style>
</head>
<body style="margin:0; padding:0; background:${IVORY};">
<div style="display:none; max-height:0; overflow:hidden; mso-hide:all; font-size:1px; line-height:1px; color:${IVORY};">${PREHEADER}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${IVORY}" style="background:${IVORY};">
  <tr>
    <td align="center" style="padding:0;">
      <!--[if mso]><table role="presentation" width="640" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px; margin:0 auto;">
        <tr>
          <td class="frame-gap"${background} bgcolor="${IVORY}" style="padding:14px; background-color:${IVORY};${backgroundCss}">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:2px solid ${INK};">
              <tr>
                <td class="pad" align="center" style="padding:30px 34px 34px; text-align:center; font-family:${SERIF}; color:${INK};">

            <img src="${MONOGRAM}" width="74" height="80" alt="ArtUp" style="display:block; margin:0 auto; width:74px; height:80px; font-family:${SERIF}; font-size:22px; color:${GOLD};">

            <table role="presentation" align="center" cellpadding="0" cellspacing="0" border="0" style="margin:18px auto 0;">
              <tr>
                <td class="eyebrow-line" width="60" style="width:60px;"><div style="height:1px; line-height:1px; font-size:0; background:${INK};">&nbsp;</div></td>
                <td class="eyebrow" style="padding:0 12px; font-family:${SERIF}; font-size:12.5px; line-height:1.4; letter-spacing:3px; text-transform:uppercase; white-space:nowrap; color:${INK};">Campus Canvas &middot; Queen&rsquo;s 2026</td>
                <td class="eyebrow-line" width="60" style="width:60px;"><div style="height:1px; line-height:1px; font-size:0; background:${INK};">&nbsp;</div></td>
              </tr>
            </table>

            <h1 class="h1" style="margin:34px 0 0; font-family:${SERIF}; font-size:45px; line-height:1.08; font-weight:500; letter-spacing:-1.4px; color:${INK};">Your camera roll probably has more Queen&rsquo;s memories than you think.</h1>

            <p class="lead" style="margin:16px 0 0; font-family:${SERIF}; font-size:19px; line-height:1.4; font-weight:400; color:${INK};">Campus Canvas is collecting the places, people, moments, and experiences that students feel define their time at Queen&rsquo;s &mdash; and we&rsquo;d love to see another one of yours.</p>

            <div style="height:24px; line-height:24px; font-size:0;">&nbsp;</div>
            ${rule(130, GOLD, 3)}

            <h2 class="h2" style="margin:30px 0 0; font-family:${SERIF}; font-size:31px; line-height:1.15; font-weight:500; letter-spacing:-0.5px; color:${INK};">Got another memory?</h2>

            <p class="body" style="margin:6px auto 0; max-width:420px; font-family:${SERIF}; font-size:18px; line-height:1.35; font-weight:400; color:${INK};">Add another photo to Campus Canvas and help shape what represents the Queen&rsquo;s experience.</p>

            <div style="height:22px; line-height:22px; font-size:0;">&nbsp;</div>
            ${button({ href: ADD_PHOTO_URL, label: 'Add a photo', width: 310, height: 56, bg: INK, border: '#C9A53A', color: '#D9B44A', size: 20, spacing: '5px' })}

            <div style="height:36px; line-height:36px; font-size:0;">&nbsp;</div>
            ${rule(116, INK)}

            <p class="body" style="margin:28px auto 0; max-width:440px; font-family:${SERIF}; font-size:18px; line-height:1.3; font-weight:400; color:${INK};">We&rsquo;re also still building Campus Canvas, and your feedback genuinely helps us make it better.</p>

            <p class="body" style="margin:10px auto 0; max-width:400px; font-family:${SERIF}; font-size:16px; line-height:1.35; font-weight:400; color:${INK};">Was anything confusing, difficult to use, or stopping you from participating? Tell us &mdash; even one sentence helps.</p>

            <div style="height:22px; line-height:22px; font-size:0;">&nbsp;</div>
            ${button({ href: FEEDBACK_URL, label: 'Share feedback', width: 280, height: 46, bg: '#FBF8F1', border: INK, color: INK, size: 15, spacing: '3.5px' })}

            <div style="height:34px; line-height:34px; font-size:0;">&nbsp;</div>
            ${rule(116, INK)}

            <p class="body" style="margin:28px auto 0; max-width:460px; font-family:${SERIF}; font-size:17px; line-height:1.35; font-weight:400; color:${INK};">The memories students contribute will help inspire original artwork created for ArtUp&rsquo;s Queen&rsquo;s graduation collection.</p>

            <img src="${SIGNATURE}" width="150" height="87" alt="ArtUp" style="display:block; margin:18px auto 0; width:150px; height:87px; font-family:${SERIF}; font-size:26px; font-style:italic; color:${GOLD};">

            <p style="margin:10px 0 0; font-family:${SERIF}; font-size:11.5px; line-height:1.8; letter-spacing:3px; text-transform:uppercase; color:${INK};">See you at the canvas,<br>ArtUp</p>

                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:6px 24px 28px; font-family:Helvetica,Arial,sans-serif; font-size:12px; line-height:1.6; color:#6F675A;">You&rsquo;re getting this because you signed up for Campus Canvas with this email address. Reply to this email if you&rsquo;d rather not hear from us.</td>
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
