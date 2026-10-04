// Simple interactive price slider display update
  const slider = document.querySelector('input[type="range"]');
  const priceDisplay = document.getElementById('price-display');
  if (slider && priceDisplay) {
    slider.addEventListener('input', (e) => {
      const formatted = new Intl.NumberFormat('vi-VN').format(e.target.value);
      priceDisplay.textContent = `Tối đa ${formatted}₫`;
    });
  }
