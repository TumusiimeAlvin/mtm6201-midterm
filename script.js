/* Adds small storefront interactions while keeping every message in English. */
document.addEventListener('DOMContentLoaded', () => {
  const safeGet = (key, fallback = '') => {
    try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
  };
  const safeSet = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* The store still works without saved preferences. */ }
  };

  const countEls = document.querySelectorAll('.bag-count');
  let count = Number(safeGet('sunday-bag-count', '0'));
  const updateBag = () => countEls.forEach((el) => { el.textContent = String(count); });
  updateBag();

  // The mobile menu exposes its open state for screen readers and keyboard users.
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  if (menuButton && nav) menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    nav.classList.toggle('is-open', !open);
  });

  // Category buttons filter the collection without reloading the page.
  const filters = document.querySelectorAll('.filter-button');
  const cards = [...document.querySelectorAll('.shop-grid .product-card')];
  const emptyState = document.querySelector('.empty-state');
  filters.forEach((button) => button.addEventListener('click', () => {
    filters.forEach((item) => { item.classList.remove('selected'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');
    let shown = 0;
    cards.forEach((card) => {
      const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
      card.hidden = !visible;
      if (visible) shown += 1;
    });
    if (emptyState) emptyState.hidden = shown !== 0;
  }));

  const sort = document.querySelector('#sort-products');
  if (sort) sort.addEventListener('change', () => {
    const grid = document.querySelector('.shop-grid');
    const sorted = [...cards].sort((a, b) => sort.value === 'low'
      ? Number(a.dataset.price) - Number(b.dataset.price)
      : sort.value === 'high'
        ? Number(b.dataset.price) - Number(a.dataset.price)
        : cards.indexOf(a) - cards.indexOf(b));
    sorted.forEach((card) => grid.append(card));
  });

  // Keep quantity within the useful one-to-ten range.
  const quantity = document.querySelector('#quantity');
  document.querySelectorAll('[data-qty]').forEach((button) => button.addEventListener('click', () => {
    if (!quantity) return;
    const current = Number(quantity.value) || 1;
    quantity.value = String(Math.min(10, Math.max(1, current + (button.dataset.qty === 'up' ? 1 : -1))));
  }));
  if (quantity) quantity.addEventListener('change', () => {
    quantity.value = String(Math.min(10, Math.max(1, Number(quantity.value) || 1)));
  });

  // Swatches update the selected state and the adjacent colour label.
  const chosenColour = document.querySelector('#chosen-colour');
  document.querySelectorAll('.swatch').forEach((swatch) => swatch.addEventListener('click', () => {
    document.querySelectorAll('.swatch').forEach((item) => {
      item.classList.remove('chosen');
      item.setAttribute('aria-pressed', 'false');
    });
    swatch.classList.add('chosen');
    swatch.setAttribute('aria-pressed', 'true');
    if (chosenColour) chosenColour.textContent = swatch.dataset.colour;
  }));

  const addButton = document.querySelector('.add-to-bag');
  if (addButton) addButton.addEventListener('click', () => {
    count += quantity ? Number(quantity.value) || 1 : 1;
    safeSet('sunday-bag-count', String(count));
    updateBag();
    const message = document.querySelector('.bag-message');
    if (message) message.textContent = `Added to your bag. You now have ${count} ${count === 1 ? 'piece' : 'pieces'} in your bag.`;
  });

  // This demo form gives a clear confirmation without sending personal data anywhere.
  const newsletter = document.querySelector('.newsletter-form');
  if (newsletter) newsletter.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = newsletter.querySelector('input[type="email"]');
    const message = newsletter.querySelector('.form-message');
    if (email && email.checkValidity() && message) {
      message.textContent = 'You’re on the list. Watch your inbox for the next drop.';
      newsletter.reset();
    }
  });
});
