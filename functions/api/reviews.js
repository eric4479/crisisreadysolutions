export async function onRequest(context) {
  const { env, request, waitUntil } = context;
  const GOOGLE_API_KEY = env.GOOGLE_API_KEY;
  const PLACE_ID = env.PLACE_ID;

  if (!GOOGLE_API_KEY || !PLACE_ID) {
    const sample = [
      { author: 'Jane D.', rating: 5, text: 'Excellent, professional training. Highly recommend.', time: '2026-01-15', source: 'sample' },
      { author: 'Mark S.', rating: 5, text: 'Instructor was fantastic and engaging.', time: '2025-09-12', source: 'sample' },
      { author: 'Olivia R.', rating: 4, text: 'Great class, learned a lot.', time: '2025-06-03', source: 'sample' }
    ];
    return new Response(JSON.stringify({ source: 'sample', reviews: sample }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const cacheKey = new Request(new URL(request.url).origin + '/api/reviews');
    const cache = caches.default;
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(PLACE_ID)}&fields=name,rating,reviews,url&key=${encodeURIComponent(GOOGLE_API_KEY)}`;
    const r = await fetch(url, { cf: { cacheEverything: 'force' } });
    if (!r.ok) {
      return new Response(JSON.stringify({ error: 'Places API error', status: r.status }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await r.json();
    const reviews = (body.result && body.result.reviews) ? body.result.reviews.slice(0,5).map(r => ({ author: r.author_name, rating: r.rating, text: r.text, time: new Date((r.time||0)*1000).toISOString(), profile_url: r.author_url })) : [];

    const resp = new Response(JSON.stringify({ source: 'places', name: (body.result && body.result.name) || null, reviews }), { headers: { 'Content-Type': 'application/json' } });
    // Cache for 6 hours
    resp.headers.set('Cache-Control', 'public, max-age=21600');
    waitUntil(cache.put(cacheKey, resp.clone()));
    return resp;
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Internal error', message: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
