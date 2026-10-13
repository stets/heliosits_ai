// Carry first-touch attribution between service pages without storing form data.
const attributionKey = 'helios-inquiry-source';
let attribution = {};
try {
  attribution = JSON.parse(sessionStorage.getItem(attributionKey) || '{}') || {};
} catch { /* Storage can be unavailable in private or restricted browsers. */ }
const params = new URLSearchParams(location.search);
for (const key of ['utm_source', 'utm_medium', 'utm_campaign']) {
  const value = params.get(key);
  if (value) attribution[key] = value.slice(0, 200);
}
if (document.referrer && !attribution.referrer) {
  try {
    const referrer = new URL(document.referrer);
    if (referrer.origin !== location.origin) attribution.referrer = referrer.origin;
  } catch { /* Ignore malformed referrers. */ }
}
try {
  sessionStorage.setItem(attributionKey, JSON.stringify(attribution));
} catch { /* The form works without storage. */ }

const form = document.querySelector('#contact-form');
if (form) {
  form.elements.source_page.value = location.pathname;
  for (const key of ['referrer', 'utm_source', 'utm_medium', 'utm_campaign']) {
    form.elements[key].value = typeof attribution[key] === 'string' ? attribution[key].slice(0, 200) : '';
  }
  const button = form.querySelector('button[type="submit"]');
  form.addEventListener('submit', () => {
    button.disabled = true;
    button.textContent = 'Continue to verification…';
  });
  // Restore the form when returning from the provider, including via bfcache.
  window.addEventListener('pageshow', () => {
    button.disabled = false;
    button.textContent = 'Request a free discovery call';
  });
}
