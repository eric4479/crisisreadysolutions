export async function onRequest(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get('content-type') || '';
    let data = {};
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const form = await request.formData();
      data = Object.fromEntries(form.entries());
    }

    // Basic validation
    const required = ['name', 'email', 'phone', 'service', 'groupSize', 'preferredDate', 'terms'];
    for (const key of required) {
      if (!data[key] || String(data[key]).trim() === '') {
        return new Response(JSON.stringify({ error: 'Missing required field', field: key }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      }
    }

    // Prepare email body
    const html = `
      <h2>New contact request from website</h2>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
      <p><strong>Organization:</strong> ${escapeHtml(data.organization || '')}</p>
      <p><strong>Service:</strong> ${escapeHtml(data.service)}</p>
      <p><strong>Group Size:</strong> ${escapeHtml(data.groupSize)}</p>
      <p><strong>Preferred Date:</strong> ${escapeHtml(data.preferredDate)}</p>
      <p><strong>Alternate Date:</strong> ${escapeHtml(data.alternateDate || '')}</p>
      <p><strong>Message:</strong><br/>${escapeHtml(data.message || '')}</p>
    `;

    const MAILGUN_API_KEY = env.MAILGUN_API_KEY;
    const MAILGUN_DOMAIN = env.MAILGUN_DOMAIN;
    const CONTACT_RECIPIENT = env.CONTACT_RECIPIENT || 'info@crisisreadysolutions.com';

    if (MAILGUN_API_KEY && MAILGUN_DOMAIN) {
      // Send via Mailgun
      const form = new URLSearchParams();
      form.append('from', `Crisis Ready Website <no-reply@${MAILGUN_DOMAIN}>`);
      form.append('to', CONTACT_RECIPIENT);
      form.append('subject', `Website Contact: ${data.name} - ${data.service}`);
      form.append('html', html);

      const basic = typeof btoa === 'function' ? btoa('api:' + MAILGUN_API_KEY) : Buffer.from('api:' + MAILGUN_API_KEY).toString('base64');

      const resp = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + basic,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: form.toString()
      });

      if (!resp.ok) {
        const text = await resp.text();
        return new Response(JSON.stringify({ error: 'Mailgun send failed', detail: text }), { status: 502, headers: { 'Content-Type': 'application/json' } });
      }

      return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
    }

    // Fallback: no mail provider configured — return success but include warning
    return new Response(JSON.stringify({ success: true, warning: 'No mail provider configured. Set MAILGUN_API_KEY and MAILGUN_DOMAIN in Pages environment variables.' }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
