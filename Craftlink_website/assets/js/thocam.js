const API_URL = 'https://81fed15e-8a3d-4d91-8e70-b5aa111e1a25.mock.pstmn.io/products';
let allProducts = [];
let filteredProducts = []; // danh sách sau khi lọc
let currentPage = 1;
const ITEMS_PER_PAGE = 10;

// Filter state
const filterState = {
  minPrice: 0,
  maxPrice: Infinity,
  keyword: '',
  sortBy: 'default',
  ethnic: [],
  region: [],
  material: [],
  purpose: []
};

// Map checkbox labels to product properties
const FILTER_MAP = {
  "H'Mông Hoa & Đen": { key: 'ethnic', val: "H'Mông" },
  "Thái Đen & Thái Trắng": { key: 'ethnic', val: "Thái" },
  "Dao Đỏ Tuyên Quang": { key: 'ethnic', val: "Dao Đỏ" },
  "Chăm Ninh Thuận": { key: 'ethnic', val: "Chăm" },
  "Tà Ôi (A Lưới)": { key: 'ethnic', val: "Tà Ôi" },
  "Mường Hòa Bình": { key: 'ethnic', val: "Mường" },

  "Tây Bắc (Hà Giang, Sa Pa, Mai Châu)": { key: 'region', val: "Tây Bắc" },
  "Bắc Trung Bộ (A Lưới, Quảng Trị)": { key: 'region', val: "Bắc Trung Bộ" },
  "Duyên Hải Nam Trung Bộ (Ninh Thuận)": { key: 'region', val: "Duyên Hải Nam Trung Bộ" },
  "Tây Nguyên (Đắk Lắk, Kon Tum)": { key: 'region', val: "Tây Nguyên" },

  "Sợi gai dầu & Vải lanh mộc": { key: 'material', val: "Lanh" },
  "Nhuộm chàm thảo mộc tự nhiên": { key: 'material', val: "Chàm" },
  "Lụa tơ tằm dệt tay truyền thống": { key: 'material', val: "Lụa" },
  "Bông đồi tự nhiên (Organic Cotton)": { key: 'material', val: "Bông" },
  "Chỉ cườm chì Zèng cổ": { key: 'material', val: "Cườm" },

  "100% Thủ công (Pure Handmade)": { key: 'purpose', val: "Thủ công" },
  "Màu nhuộm vỏ cây hữu cơ": { key: 'purpose', val: "Hữu cơ" },
  "Quà tặng doanh nghiệp có tác động": { key: 'purpose', val: "Quà tặng" }
};

// Normalize raw product object from either API or local data.js
function normalizeProduct(p) {
  let priceNum = 0;
  if (typeof p.priceNum === 'number') {
    priceNum = p.priceNum;
  } else if (typeof p.price === 'number') {
    priceNum = p.price;
  } else if (p.price) {
    priceNum = parseInt(String(p.price).replace(/[^\d]/g, '')) || 0;
  }

  const priceStr = (typeof p.price === 'string' && p.price.includes('₫'))
    ? p.price
    : (priceNum > 0 ? priceNum.toLocaleString('vi-VN') + '₫' : 'Liên hệ');

  return {
    id: p.id !== undefined ? String(p.id) : ('SP-' + Math.floor(100 + Math.random() * 900)),
    title: p.title || p.name || 'Sản phẩm thủ công truyền thống',
    description: p.description || ('Sản phẩm thổ cẩm dệt tay thủ công bởi nghệ nhân ' + (p.ethnic || p.tribe || 'bản địa') + ', gìn giữ giá trị di sản văn hóa.'),
    price: priceStr,
    priceNum: priceNum,
    location: p.location || (p.region ? p.region + ', Việt Nam' : 'Sa Pa, Lào Cai'),
    artisan_group: p.artisan_group || ('Nhóm nghệ nhân ' + (p.ethnic || p.tribe || 'Bản địa')),
    image_url: p.image_url || p.image || 'https://images.unsplash.com/photo-1606744888344-498238f0173d?auto=format&fit=crop&w=600&q=80',
    ethnic: p.ethnic || p.tribe || "H'Mông",
    region: p.region || 'Tây Bắc',
    material: p.material || 'Lanh',
    purpose: p.purpose || 'Thủ công',
    badges: Array.isArray(p.badges) && p.badges.length > 0 ? p.badges : ['Thủ công'],
    impact_text: p.impact_text || '70% doanh thu trực tiếp cho nghệ nhân'
  };
}

// Fallback products in case offline or API error
function getFallbackProducts() {
  if (typeof mockProducts !== 'undefined' && Array.isArray(mockProducts) && mockProducts.length > 0) {
    return mockProducts.map(normalizeProduct);
  }
  return [
    {
      id: 'SP-001',
      title: "Khăn Choàng Thổ Cẩm Lanh Chàm H'Mông",
      description: "Dệt thủ công từ sợi gai dầu tự nhiên, nhuộm chàm thảo mộc 100%.",
      price: '850.000₫',
      priceNum: 850000,
      location: 'Sa Pa, Lào Cai',
      artisan_group: "Nhóm H'Mông Sa Pa",
      image_url: 'https://images.unsplash.com/photo-1606744888344-498238f0173d?auto=format&fit=crop&w=600&q=80',
      ethnic: "H'Mông",
      region: 'Tây Bắc',
      material: 'Lanh',
      purpose: 'Thủ công',
      badges: ['Bán chạy'],
      impact_text: '70% doanh thu cho nghệ nhân'
    },
    {
      id: 'SP-002',
      title: 'Khăn Lụa Tơ Tằm Nhuộm Củ Nâu Thái',
      description: 'Lụa tơ tằm dệt tay truyền thống vùng Mường Lò, sắc nâu trầm ấm bản địa.',
      price: '450.000₫',
      priceNum: 450000,
      location: 'Mường Lò, Yên Bái',
      artisan_group: 'Hợp tác xã dệt Thái',
      image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      ethnic: 'Thái',
      region: 'Tây Bắc',
      material: 'Lụa',
      purpose: 'Hữu cơ',
      badges: ['Di sản'],
      impact_text: 'Tạo việc làm cho 12 phụ nữ'
    },
    {
      id: 'SP-003',
      title: 'Túi Tote Thêu Tay Họa Tiết Trống Đồng Dao Đỏ',
      description: 'Chỉ thêu tơ tằm trên nền vải lanh mộc tự nhiên, hoa văn cổ truyền.',
      price: '650.000₫',
      priceNum: 650000,
      location: 'Tuyên Quang',
      artisan_group: 'Tổ hợp Dao Đỏ',
      image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
      ethnic: 'Dao Đỏ',
      region: 'Tây Bắc',
      material: 'Bông',
      purpose: 'Thủ công',
      badges: ['Thủ công'],
      impact_text: 'Hỗ trợ giáo dục trẻ em vùng cao'
    },
    {
      id: 'SP-004',
      title: 'Váy Quấn Truyền Thống Dệt Zèng Tà Ôi',
      description: 'Dệt cườm chì vào từng sợi chỉ độc bản, bảo tồn di sản văn hóa phi vật thể.',
      price: '2.500.000₫',
      priceNum: 2500000,
      location: 'A Lưới, Thừa Thiên Huế',
      artisan_group: 'Nghệ nhân Zèng A Lưới',
      image_url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80',
      ethnic: 'Tà Ôi',
      region: 'Bắc Trung Bộ',
      material: 'Cườm',
      purpose: 'Thủ công',
      badges: ['Độc bản'],
      impact_text: 'Bảo tồn kỹ thuật dệt cườm'
    },
    {
      id: 'SP-005',
      title: 'Khăn Trùm Đầu Thổ Cẩm Chăm Mỹ Nghiệp',
      description: 'Bông đồi tự nhiên dệt hoa văn hình thoi đặc trưng Chăm Ninh Thuận.',
      price: '1.200.000₫',
      priceNum: 1200000,
      location: 'Mỹ Nghiệp, Ninh Thuận',
      artisan_group: 'Làng dệt Chăm Mỹ Nghiệp',
      image_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
      ethnic: 'Chăm',
      region: 'Duyên Hải Nam Trung Bộ',
      material: 'Bông',
      purpose: 'Quà tặng',
      badges: ['Làng nghề cổ'],
      impact_text: 'Thu nhập công bằng theo WFTO'
    },
    {
      id: 'SP-006',
      title: 'Vỏ Gối Sofa Họa Tiết Kỷ Hà Mường',
      description: 'Vải bông dệt tay nhuộm vỏ cây tự nhiên, phù hợp không gian hiện đại.',
      price: '350.000₫',
      priceNum: 350000,
      location: 'Mai Châu, Hòa Bình',
      artisan_group: 'Nhóm thợ Mường Hòa Bình',
      image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
      ethnic: 'Mường',
      region: 'Tây Bắc',
      material: 'Bông',
      purpose: 'Hữu cơ',
      badges: ['Thân thiện môi trường'],
      impact_text: '100% thảo mộc tự nhiên'
    }
  ];
}

async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Mã phản hồi: ' + response.status);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) throw new Error('Dữ liệu rỗng');

    allProducts = data.map(normalizeProduct);
  } catch (error) {
    console.warn("Không thể tải từ API mock Postman, chuyển sang dữ liệu nội bộ:", error);
    allProducts = getFallbackProducts();
  }

  updateCategoryBadgeCounts();
  applyFilters();
}

// Cập nhật số lượng sản phẩm hiển thị trên từng nhãn dân tộc
function updateCategoryBadgeCounts() {
  const checkboxes = document.querySelectorAll('aside input[type="checkbox"]');
  checkboxes.forEach(cb => {
    const labelSpan = cb.closest('label')?.querySelector('span:first-child');
    const badgeSpan = cb.closest('label')?.querySelector('span:last-child');
    if (!labelSpan || !badgeSpan || labelSpan === badgeSpan) return;

    const text = labelSpan.innerText.trim();
    if (FILTER_MAP[text]) {
      const { key, val } = FILTER_MAP[text];
      const count = allProducts.filter(p => {
        if (key === 'material') return p.material.includes(val);
        return p[key] === val;
      }).length;
      if (count > 0) {
        badgeSpan.innerText = count;
      }
    }
  });
}

// Định dạng tiền tệ VND
function formatVND(num) {
  return num.toLocaleString('vi-VN') + '₫';
}

// Cập nhật chữ hiển thị khoảng giá trên giao diện
function updatePriceDisplay() {
  const priceDisplay = document.getElementById('price-display');
  const sliderValText = document.getElementById('slider-val-text');

  const min = filterState.minPrice;
  const max = filterState.maxPrice;

  // Cập nhật slider label
  if (sliderValText) {
    sliderValText.innerText = (max >= 3500000 || max === Infinity)
      ? '3.500.000₫+'
      : formatVND(max);
  }

  // Cập nhật tổng thể price display
  if (priceDisplay) {
    if (min === 0 && (max >= 3500000 || max === Infinity)) {
      priceDisplay.innerText = 'Tất cả mức giá';
    } else if (min === 0 && max < 3500000) {
      priceDisplay.innerText = `Dưới ${formatVND(max)}`;
    } else if (min > 0 && (max >= 3500000 || max === Infinity)) {
      priceDisplay.innerText = `Trên ${formatVND(min)}`;
    } else {
      priceDisplay.innerText = `${formatVND(min)} - ${formatVND(max)}`;
    }
  }
}

// Highlight chip giá được chọn
function setPriceChipActive(activeChip) {
  const chips = document.querySelectorAll('.price-chip');
  chips.forEach(chip => {
    if (chip === activeChip) {
      chip.className = 'price-chip px-2 py-1.5 rounded-lg text-xs font-semibold border border-secondary bg-secondary/10 text-secondary transition-colors text-center cursor-pointer shadow-xs';
    } else {
      chip.className = 'price-chip px-2 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:border-secondary hover:text-secondary text-gray-600 transition-colors text-center cursor-pointer';
    }
  });
}

// Bỏ highlight toàn bộ chip khi người dùng nhập số thủ công
function clearPriceChipsActive() {
  const chips = document.querySelectorAll('.price-chip');
  chips.forEach(chip => {
    chip.className = 'price-chip px-2 py-1.5 rounded-lg text-xs font-medium border border-gray-200 hover:border-secondary hover:text-secondary text-gray-600 transition-colors text-center cursor-pointer';
  });
}

// Thu thập danh sách checkbox được check
function getActiveCheckboxes() {
  const activeFilters = { ethnic: [], region: [], material: [], purpose: [] };
  const checkboxes = document.querySelectorAll('aside input[type="checkbox"]:checked');
  checkboxes.forEach(cb => {
    const parentLabel = cb.closest('label');
    const textNode = parentLabel ? (parentLabel.querySelector('span:first-child') || parentLabel) : cb.nextElementSibling;
    const text = textNode ? textNode.innerText.trim() : '';

    if (FILTER_MAP[text]) {
      const { key, val } = FILTER_MAP[text];
      activeFilters[key].push(val);
    }
  });
  return activeFilters;
}

// Hàm lọc và hiển thị chính
function applyFilters() {
  const activeFilters = getActiveCheckboxes();
  filterState.ethnic = activeFilters.ethnic;
  filterState.region = activeFilters.region;
  filterState.material = activeFilters.material;
  filterState.purpose = activeFilters.purpose;

  const min = filterState.minPrice;
  const max = filterState.maxPrice;
  const kw = filterState.keyword;

  // Lọc theo tất cả tiêu chí
  let filtered = allProducts.filter(p => {
    // 1. Kiểm tra khoảng giá
    const price = p.priceNum;
    if (typeof price === 'number' && !isNaN(price)) {
      if (price < min) return false;
      if (max < Infinity && price > max) return false;
    }

    // 2. Dân tộc & Cộng đồng
    if (filterState.ethnic.length > 0 && !filterState.ethnic.includes(p.ethnic)) {
      return false;
    }

    // 3. Vùng làng nghề
    if (filterState.region.length > 0 && !filterState.region.includes(p.region)) {
      return false;
    }

    // 4. Chất liệu tự nhiên
    if (filterState.material.length > 0) {
      const hasMaterial = filterState.material.some(m => p.material && p.material.includes(m));
      if (!hasMaterial) return false;
    }

    // 5. Tiêu chuẩn & Nhu cầu
    if (filterState.purpose.length > 0 && !filterState.purpose.includes(p.purpose)) {
      return false;
    }

    // 6. Tìm kiếm từ khóa (tên, mô tả, dân tộc, chất liệu, nghệ nhân, địa phương)
    if (kw) {
      const searchTarget = `${p.title} ${p.description} ${p.ethnic} ${p.material} ${p.location} ${p.artisan_group}`.toLowerCase();
      if (!searchTarget.includes(kw)) {
        return false;
      }
    }

    return true;
  });

  // Sắp xếp
  if (filterState.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (filterState.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  } else if (filterState.sortBy === 'name-asc') {
    filtered.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
  }

  // Cập nhật số lượng hiển thị trên nút Áp dụng và thanh công cụ
  const btnApplyText = document.getElementById('btn-apply-text');
  if (btnApplyText) {
    btnApplyText.innerText = `Áp dụng bộ lọc (${filtered.length})`;
  }

  const countDisplay = document.getElementById('productCountDisplay');
  if (countDisplay) {
    countDisplay.innerText = filtered.length;
  }

  filteredProducts = filtered;
  currentPage = 1; // reset về trang 1 mỗi khi filter thay đổi
  renderPage();
}

// Render trang hiện tại + pagination controls
// scrollTarget: null = giữ nguyên scroll (khi filter), number = scroll tới vị trí đó (khi chuyển trang)
function renderPage(scrollTarget = null) {
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageProducts = filteredProducts.slice(start, end);

  // Cập nhật text "Đang xem"
  const viewingCount = document.querySelector('.pt-space-lg span.font-body-sm');
  if (viewingCount) {
    const from = filteredProducts.length === 0 ? 0 : start + 1;
    const to = Math.min(end, filteredProducts.length);
    viewingCount.innerHTML = `Đang xem <strong class="text-primary font-semibold">${from} - ${to}</strong> trong số <strong>${filteredProducts.length}</strong> sản phẩm`;
  }

  renderProducts(pageProducts, scrollTarget);
  renderPagination(totalPages);
}

// Render thanh pagination
function renderPagination(totalPages) {
  const container = document.getElementById('pagination-controls');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  const prevDisabled = currentPage === 1 ? 'disabled opacity-40 cursor-not-allowed' : 'cursor-pointer hover:text-primary';
  const nextDisabled = currentPage === totalPages ? 'disabled opacity-40 cursor-not-allowed' : 'cursor-pointer hover:text-primary';

  // Tạo danh sách số trang hiển thị (window 5 trang)
  let pages = [];
  if (totalPages <= 7) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    pages = [1];
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  const pageButtons = pages.map(p => {
    if (p === '...') return `<span class="px-2 text-outline">...</span>`;
    const active = p === currentPage
      ? 'bg-primary text-on-primary font-semibold shadow-sm'
      : 'bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors font-semibold shadow-sm cursor-pointer';
    return `<button type="button" class="w-10 h-10 rounded-lg font-label-md text-label-md ${active}" onclick="goToPage(${p})">${p}</button>`;
  }).join('');

  container.innerHTML = `
    <button type="button" class="w-10 h-10 rounded-lg bg-surface-container-lowest text-outline flex items-center justify-center shadow-sm ${prevDisabled}" onclick="goToPage(${currentPage - 1})">
      <span class="material-symbols-outlined text-[20px]">chevron_left</span>
    </button>
    ${pageButtons}
    <button type="button" class="w-10 h-10 rounded-lg bg-surface-container-lowest text-outline flex items-center justify-center shadow-sm ${nextDisabled}" onclick="goToPage(${currentPage + 1})">
      <span class="material-symbols-outlined text-[20px]">chevron_right</span>
    </button>
  `;
}

window.goToPage = function (page) {
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  // Tính vị trí đầu grid trước khi re-render (vì sau render chiều cao có thể thay đổi)
  const grid = document.getElementById('productGrid');
  const gridTop = grid ? window.scrollY + grid.getBoundingClientRect().top - 100 : null;
  renderPage(gridTop);
};

// Xóa toàn bộ bộ lọc và đặt lại trạng thái ban đầu
function resetFilters() {
  // 1. Bỏ chọn checkbox
  const checkboxes = document.querySelectorAll('aside input[type="checkbox"]');
  checkboxes.forEach(cb => { cb.checked = false; });

  // 2. Đặt lại khoảng giá
  filterState.minPrice = 0;
  filterState.maxPrice = Infinity;

  // 3. Đặt lại slider
  const slider = document.getElementById('price-range-slider');
  if (slider) slider.value = 3500000;

  // 4. Đặt lại manual inputs
  const minInput = document.getElementById('min-price-input');
  const maxInput = document.getElementById('max-price-input');
  if (minInput) minInput.value = '';
  if (maxInput) maxInput.value = '';

  // 5. Đặt lại quick chips về "Tất cả"
  const chips = document.querySelectorAll('.price-chip');
  if (chips.length > 0) {
    setPriceChipActive(chips[0]);
  }

  // 6. Đặt lại thanh tìm kiếm
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.value = '';
    filterState.keyword = '';
  }

  // 7. Đặt lại sắp xếp
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.value = 'default';
    filterState.sortBy = 'default';
  }

  // 8. Cập nhật nhãn và áp dụng lại
  updatePriceDisplay();
  applyFilters();
}

function setupEvents() {
  // 1. Sự kiện thay đổi Checkbox — lưu scroll position trước khi filter để tránh nhảy trang
  const checkboxes = document.querySelectorAll('aside input[type="checkbox"]');
  checkboxes.forEach(cb => cb.addEventListener('change', () => {
    applyFilters();
  }));

  // 2. Sự kiện Kéo thanh Slider Giá
  const slider = document.getElementById('price-range-slider');
  const maxInput = document.getElementById('max-price-input');
  const minInput = document.getElementById('min-price-input');

  if (slider) {
    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (val >= 3500000) {
        filterState.maxPrice = Infinity;
        if (maxInput) maxInput.value = '';
      } else {
        filterState.maxPrice = val;
        if (maxInput) maxInput.value = val;
      }
      clearPriceChipsActive();
      updatePriceDisplay();
      applyFilters();
    });
  }

  // 3. Sự kiện Click Quick Price Chips
  const chips = document.querySelectorAll('.price-chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const minAttr = parseInt(chip.getAttribute('data-min')) || 0;
      const maxAttr = parseInt(chip.getAttribute('data-max')) || Infinity;

      filterState.minPrice = minAttr;
      filterState.maxPrice = (maxAttr >= 3500000 || maxAttr >= 99999999) ? Infinity : maxAttr;

      // Đồng bộ inputs
      if (minInput) minInput.value = minAttr > 0 ? minAttr : '';
      if (maxInput) maxInput.value = (maxAttr < 3500000) ? maxAttr : '';

      // Đồng bộ slider
      if (slider) {
        slider.value = (maxAttr < 3500000) ? maxAttr : 3500000;
      }

      setPriceChipActive(chip);
      updatePriceDisplay();
      applyFilters();
    });
  });

  // 4. Sự kiện Nhập tay ô Giá tối thiểu & Giá tối đa
  const handleManualPriceChange = () => {
    const minVal = minInput ? parseInt(minInput.value) : NaN;
    const maxVal = maxInput ? parseInt(maxInput.value) : NaN;

    filterState.minPrice = (!isNaN(minVal) && minVal >= 0) ? minVal : 0;
    filterState.maxPrice = (!isNaN(maxVal) && maxVal > 0) ? maxVal : Infinity;

    // Đồng bộ slider nếu maxVal hợp lệ
    if (slider) {
      if (!isNaN(maxVal) && maxVal <= 3500000) {
        slider.value = maxVal;
      } else if (isNaN(maxVal) || maxVal > 3500000) {
        slider.value = 3500000;
      }
    }

    clearPriceChipsActive();
    updatePriceDisplay();
    applyFilters();
  };

  if (minInput) {
    minInput.addEventListener('input', handleManualPriceChange);
  }
  if (maxInput) {
    maxInput.addEventListener('input', handleManualPriceChange);
  }

  // 5. Sự kiện Ô tìm kiếm (Search Bar)
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.keyword = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // 6. Sự kiện Dropdown Sắp xếp (Sort Selector)
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sortBy = e.target.value;
      applyFilters();
    });
  }

  // 7. Sự kiện Nút Reset & Áp dụng bộ lọc
  const btnResetFilter = document.getElementById('btn-reset-filter');
  if (btnResetFilter) {
    btnResetFilter.addEventListener('click', resetFilters);
  }

  const btnResetTop = document.getElementById('btn-reset-top');
  if (btnResetTop) {
    btnResetTop.addEventListener('click', resetFilters);
  }

  const btnApplyFilter = document.getElementById('btn-apply-filter');
  if (btnApplyFilter) {
    btnApplyFilter.addEventListener('click', () => {
      applyFilters();
      const productGrid = document.getElementById('productGrid');
      if (productGrid) {
        const rect = productGrid.getBoundingClientRect();
        const scrollTop = window.scrollY + rect.top - 120; // 120px offset cho header sticky
        window.scrollTo({ top: scrollTop, behavior: 'smooth' });
      }
    });
  }

  // Khởi tạo hiển thị giá ban đầu
  updatePriceDisplay();
}

function renderProducts(products, scrollTarget = null) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

  // Nếu không có scrollTarget được chỉ định, giữ nguyên scroll hiện tại
  const savedScrollY = scrollTarget === null ? window.scrollY : null;

  if (!products || products.length === 0) {
    productGrid.innerHTML = `
      <div class="col-span-full py-16 px-4 bg-surface-container-lowest rounded-2xl text-center space-y-4 shadow-sm border border-dashed border-gray-200">
        <div class="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
          <span class="material-symbols-outlined text-[32px]">filter_list_off</span>
        </div>
        <div class="space-y-1">
          <h4 class="font-title-lg text-title-lg font-serif text-primary font-bold">Không tìm thấy tác phẩm phù hợp</h4>
          <p class="font-body-sm text-body-sm text-on-surface-variant max-w-md mx-auto">
            Không có tác phẩm nào khớp với khoảng giá hoặc tiêu chí bạn đã chọn. Vui lòng mở rộng khoảng giá hoặc xóa bộ lọc để khám phá thêm.
          </p>
        </div>
        <button onclick="resetFilters()" type="button" class="px-5 py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md font-semibold hover:bg-on-secondary-container transition-colors shadow-sm inline-flex items-center gap-2 cursor-pointer">
          <span class="material-symbols-outlined text-[18px]">refresh</span>
          Xóa toàn bộ bộ lọc
        </button>
      </div>
    `;
    requestAnimationFrame(() => {
      if (savedScrollY !== null) window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    });
    return;
  }

  const htmlString = products.map(product => {
    let badgesHtml = '';
    if (product.badges && product.badges.length > 0) {
      badgesHtml = product.badges.map(badge =>
        `<span class="px-2.5 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold tracking-wide uppercase shadow-sm">${badge}</span>`
      ).join('');
    }

    return `
      <div class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between border border-transparent hover:border-secondary/20">
        <div class="relative w-full aspect-[4/5] bg-surface-container-high overflow-hidden">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
            src="${product.image_url}" 
            alt="${product.title}" 
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1606744888344-498238f0173d?auto=format&fit=crop&w=600&q=80'" />
          <div class="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            ${badgesHtml}
            <span class="px-2.5 py-0.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-sm text-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm font-medium">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>${product.ethnic}
            </span>
          </div>
          <div class="absolute top-3 right-3 flex flex-col gap-1.5">
            <button class="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur text-primary hover:text-secondary hover:bg-surface-container-lowest transition-colors flex items-center justify-center shadow-sm cursor-pointer" title="Lưu yêu thích" type="button">
              <span class="material-symbols-outlined text-[19px]">favorite</span>
            </button>
          </div>
          <div class="absolute bottom-3 inset-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <button onclick="addToOrders('${product.id}')" class="w-full py-2.5 rounded-lg bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-primary-container transition-colors shadow-md flex items-center justify-center gap-1.5 cursor-pointer" type="button">
              <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span> Thêm nhanh
            </button>
          </div>
        </div>
        
        <div class="p-space-md flex flex-col flex-grow justify-between gap-space-sm">
          <div class="space-y-1">
            <div class="flex items-center justify-between text-outline font-label-sm text-label-sm">
              <span>${product.location}</span>
              <span class="font-medium text-surface-tint">${product.artisan_group}</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm text-primary font-serif leading-snug group-hover:text-secondary transition-colors line-clamp-1" title="${product.title}">
              ${product.title}
            </h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">${product.description}</p>
          </div>
          <div class="pt-space-xs space-y-space-xs">
            <div class="flex items-baseline justify-between">
              <span class="font-title-lg text-title-lg text-secondary font-bold">${product.price}</span>
              <span class="font-label-sm text-label-sm text-outline">Mã: ${product.id}</span>
            </div>
            <div class="px-2.5 py-1.5 rounded-lg bg-surface-container-low text-primary font-label-sm text-label-sm flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[15px] text-tertiary-fixed-dim">handshake</span>
              <span class="truncate"><strong>${product.impact_text}</strong></span>
            </div>
            <a href="buyer-custom-brief.html?product=${product.id}" class="w-full py-2.5 mt-2 bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold rounded-lg hover:bg-on-secondary-container transition-colors shadow-md flex items-center justify-center gap-1.5 text-center cursor-pointer">
              <span class="material-symbols-outlined text-[18px]">design_services</span>
              Tùy biến ngay
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  productGrid.innerHTML = htmlString;

  // Xử lý scroll sau khi DOM cập nhật
  requestAnimationFrame(() => {
    if (scrollTarget !== null) {
      // Chuyển trang: scroll smooth lên đầu grid
      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
    } else if (savedScrollY !== null) {
      // Filter thay đổi: giữ nguyên vị trí
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    }
  });
}

window.addToOrders = function (productId) {
  const product = allProducts.find(p => String(p.id) === String(productId));
  if (!product) return;

  const briefs = JSON.parse(localStorage.getItem('craftlink_briefs')) || [];

  const today = new Date();
  today.setDate(today.getDate() + 14);
  const deadline = today.toLocaleDateString('vi-VN');

  const newOrder = {
    id: 'CL' + Math.floor(1000 + Math.random() * 9000),
    title: 'Mua sẵn: ' + product.title,
    status: 'pending',
    category: product.ethnic,
    budget: product.price,
    quantity: '1',
    deadline: deadline
  };

  briefs.unshift(newOrder);
  localStorage.setItem('craftlink_briefs', JSON.stringify(briefs));

  window.location.href = 'buyer-orders.html';
};

window.resetFilters = resetFilters;

document.addEventListener('DOMContentLoaded', () => {
  setupEvents();
  fetchProducts();
});
