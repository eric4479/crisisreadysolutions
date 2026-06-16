document.addEventListener('DOMContentLoaded', () => {
  const carouselInner = document.querySelector('#reviewsCarousel .carousel-inner');
  const carouselEl = document.getElementById('reviewsCarousel');
  if (!carouselInner || !carouselEl) return;

  fetch('/api/reviews').then(r => r.json()).then(data => {
    const reviews = (data.reviews || []).slice(0,5);
    if (reviews.length === 0) {
      carouselInner.innerHTML = `<div class="carousel-item active"><div class="p-4 bg-light rounded"><p class="mb-0">No reviews available.</p></div></div>`;
      return;
    }

    carouselInner.innerHTML = '';
    reviews.forEach((rev, idx) => {
      const item = document.createElement('div');
      item.className = 'carousel-item' + (idx === 0 ? ' active' : '');
      const card = document.createElement('div');
      card.className = 'card border-0 shadow-sm p-4';
      card.innerHTML = `<div class="card-body">
        <div class="d-flex align-items-center mb-2">
          <div class="me-3">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="#e9ecef"/></svg>
          </div>
          <div>
            <h5 class="mb-0">${escapeHtml(rev.author || 'Anonymous')}</h5>
            <small class="text-muted">${formatDate(rev.time)}</small>
          </div>
        </div>
        <p class="card-text">${escapeHtml(truncate(rev.text || '', 320))}</p>
        <div class="text-warning">${renderStars(rev.rating)}</div>
      </div>`;
      item.appendChild(card);
      carouselInner.appendChild(item);
    });

    // initialize bootstrap carousel (if not auto)
    // bootstrap 5 auto init via data-bs-ride
  }).catch(err => {
    console.error('Failed to load reviews', err);
    carouselInner.innerHTML = `<div class="carousel-item active"><div class="p-4 bg-light rounded"><p class="mb-0">Failed to load reviews.</p></div></div>`;
  });

  function renderStars(n){ if(!n) return ''; let out=''; for(let i=0;i<5;i++){ out += `<i class="fa${i<n?'s':'r'} fa-star"></i>`; } return out; }
  function truncate(s,n){ return s.length>n? s.slice(0,n-1)+'…': s; }
  function formatDate(iso){ if(!iso) return ''; try{ const d = new Date(iso); return d.toLocaleDateString(); }catch(e){return iso||'';} }
  function escapeHtml(str){ return String(str).replace(/[&<>"']/g, function(ch){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]); }); }
});
