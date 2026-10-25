// Tab Switching Micro-interaction
  document.querySelectorAll('#tab-nav .tab-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle Tab Buttons styling
      document.querySelectorAll('#tab-nav .tab-pill').forEach(b => {
        b.classList.remove('active', 'bg-primary', 'text-on-primary', 'shadow-sm');
        b.classList.add('bg-surface-container-highest', 'text-on-surface');
      });
      btn.classList.add('active', 'bg-primary', 'text-on-primary', 'shadow-sm');
      btn.classList.remove('bg-surface-container-highest', 'text-on-surface');

      // Toggle Panels
      const targetId = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.add('hidden');
      });
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.remove('hidden');
      }
    });
  });

  // Thumbnail Gallery Switcher
  const mainImg = document.getElementById('main-product-img');
  document.querySelectorAll('#thumb-gallery .thumb-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('#thumb-gallery .thumb-item').forEach(t => t.classList.remove('opacity-100', 'ring-2', 'ring-secondary'));
      const newAlt = item.getAttribute('data-target-alt');
      if (mainImg && newAlt) {
        mainImg.setAttribute('data-alt', newAlt);
        // Visual indicator
        item.classList.add('opacity-100');
      }
    });
  });

  // Quantity Counter
  const qtyVal = document.getElementById('qty-val');
  const btnMinus = document.getElementById('btn-qty-minus');
  const btnPlus = document.getElementById('btn-qty-plus');
  let currentQty = 1;

  if (btnMinus && btnPlus && qtyVal) {
    btnMinus.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        qtyVal.textContent = currentQty;
      }
    });
    btnPlus.addEventListener('click', () => {
      if (currentQty < 14) { // inventory cap
        currentQty++;
        qtyVal.textContent = currentQty;
      }
    });
  }

  // Size Options Selection
  document.querySelectorAll('#size-options .size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#size-options .size-btn').forEach(b => {
        b.classList.remove('active', 'bg-surface-container-high', 'text-primary');
        b.classList.add('bg-surface-container-low', 'text-on-surface-variant');
      });
      btn.classList.add('active', 'bg-surface-container-high', 'text-primary');
      btn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
    });
  });

  // Color Options Selection
  document.querySelectorAll('#color-options .color-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#color-options .color-btn').forEach(b => {
        b.classList.remove('active', 'bg-surface-container-high', 'text-primary');
        b.classList.add('bg-surface-container-low', 'text-on-surface-variant');
      });
      btn.classList.add('active', 'bg-surface-container-high', 'text-primary');
      btn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
    });
  });

  // Wishlist Toggle
  const wishlistBtn = document.getElementById('btn-wishlist');
  const wishlistIcon = document.getElementById('wishlist-icon');
  let isWishlisted = false;

  if (wishlistBtn && wishlistIcon) {
    wishlistBtn.addEventListener('click', () => {
      isWishlisted = !isWishlisted;
      if (isWishlisted) {
        wishlistIcon.textContent = 'favorite';
        wishlistIcon.style.fontVariationSettings = "'FILL' 1";
      } else {
        wishlistIcon.textContent = 'favorite_border';
        wishlistIcon.style.fontVariationSettings = "'FILL' 0";
      }
    });
  }
