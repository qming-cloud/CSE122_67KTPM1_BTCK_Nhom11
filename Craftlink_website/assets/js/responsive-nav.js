/**
 * CraftLink - Responsive Navigation & Mobile Drawer Controller
 * Tự động đồng bộ Hamburger menu, Drawer điều hướng, và responsive filter trên mobile
 */

(function () {
  'use strict';

  // Xác định đường dẫn tương đối tùy theo vị trí file đang chạy
  const isPagesDir = window.location.pathname.includes('/pages/') || 
                     (!window.location.pathname.endsWith('index.html') && window.location.pathname.includes('buyer-'));
  const prefix = isPagesDir ? '' : 'pages/';
  const homeLink = isPagesDir ? '../index.html' : 'index.html';

  // Tự động nạp role-switcher.js cho toàn bộ giao diện Buyer
  if (!document.querySelector('script[src*="role-switcher.js"]')) {
    const roleScript = document.createElement('script');
    roleScript.src = isPagesDir ? '../assets/js/role-switcher.js' : 'assets/js/role-switcher.js';
    document.head.appendChild(roleScript);
  }

  const navItems = [
    { label: 'Trang chủ', href: homeLink, icon: 'home' },
    { label: 'Sàn Khám Phá (Bộ sưu tập)', href: prefix + 'buyer-marketplace.html', icon: 'storefront' },
    { label: 'Đặt Làm Riêng (AI Brief)', href: prefix + 'buyer-custom-brief.html', icon: 'design_services' },
    { label: 'Đơn Hàng Của Tôi', href: prefix + 'buyer-orders.html', icon: 'inventory_2' },
    { label: 'Giỏ Hàng', href: prefix + 'buyer-cart.html', icon: 'shopping_bag', id: 'drawer-cart-link' },
    { label: 'Về chúng tôi & Tác động', href: prefix + 'impact.html', icon: 'volunteer_activism' }
  ];

  function ensureDrawerInDOM() {
    let backdrop = document.querySelector('.mobile-drawer-backdrop');
    let drawer = document.querySelector('.mobile-drawer');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'mobile-drawer-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.id = 'mobile-drawer';
      drawer.className = 'mobile-drawer';
      drawer.setAttribute('aria-label', 'Menu điều hướng di động');

      const linksHtml = navItems.map(item => `
        <a href="${item.href}" class="flex items-center gap-3.5 px-4 py-3 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 font-medium text-[15px] transition-colors">
          <span class="material-symbols-outlined text-[22px] text-secondary">${item.icon}</span>
          <span class="flex-1">${item.label}</span>
          ${item.id === 'drawer-cart-link' ? '<span id="drawer-cart-badge" class="px-2 py-0.5 rounded-full bg-secondary text-white text-[11px] font-bold hidden">0</span>' : ''}
        </a>
      `).join('');

      drawer.innerHTML = `
        <!-- Drawer Header -->
        <div class="p-5 border-b border-gray-200 flex items-center justify-between bg-white">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm">CL</div>
            <div class="flex flex-col">
              <span class="font-bold text-primary text-sm tracking-wide">CRAFT LINK</span>
              <span class="text-[9px] text-gray-500 uppercase tracking-widest">Di sản Việt</span>
            </div>
          </div>
          <button id="close-drawer-btn" type="button" aria-label="Đóng menu"
            class="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        <!-- User Quick Profile -->
        <div class="p-4 bg-primary/5 border-b border-gray-100 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
            KH
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-semibold text-gray-900 text-sm truncate">Khách hàng Buyer</p>
            <p class="text-xs text-gray-500 truncate">buyer@craftlink.com</p>
          </div>
          <a href="${prefix}login.html" class="p-1.5 text-gray-500 hover:text-primary rounded-lg" title="Đăng nhập">
            <span class="material-symbols-outlined text-[20px]">manage_accounts</span>
          </a>
        </div>

        <!-- Navigation Links -->
        <nav class="p-4 space-y-1 flex-1 overflow-y-auto">
          ${linksHtml}
        </nav>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-gray-200 bg-white space-y-2">
          <div class="flex items-center justify-between text-xs text-gray-500 px-2 py-1">
            <span>Phiên bản v2.4</span>
            <span class="text-secondary font-semibold">WFTO Fair Trade</span>
          </div>
          <a href="${prefix}login.html" class="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            Đổi vai trò / Đăng nhập
          </a>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    return { backdrop, drawer };
  }

  function initNavigation() {
    const { backdrop, drawer } = ensureDrawerInDOM();
    const openBtns = document.querySelectorAll('#mobile-menu-btn, .mobile-menu-trigger');
    const closeBtn = document.getElementById('close-drawer-btn');

    function openDrawer() {
      drawer.classList.add('active');
      backdrop.classList.add('active');
      document.body.classList.add('drawer-open');
    }

    function closeDrawer() {
      drawer.classList.remove('active');
      backdrop.classList.remove('active');
      document.body.classList.remove('drawer-open');
    }

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openDrawer();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    backdrop.addEventListener('click', closeDrawer);

    // Bấm phím ESC để đóng drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // Tự động đóng drawer khi click vào các link bên trong
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Đồng bộ giỏ hàng với LocalStorage
    updateCartBadges();
    window.addEventListener('storage', updateCartBadges);
  }

  function updateCartBadges() {
    try {
      const cart = JSON.parse(localStorage.getItem('craftlink_cart')) || [];
      const total = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

      const navBadge = document.getElementById('nav-cart-count');
      if (navBadge) {
        navBadge.textContent = total;
        if (total > 0) navBadge.classList.remove('hidden');
        else navBadge.classList.add('hidden');
      }

      const drawerBadge = document.getElementById('drawer-cart-badge');
      if (drawerBadge) {
        drawerBadge.textContent = total;
        if (total > 0) drawerBadge.classList.remove('hidden');
        else drawerBadge.classList.add('hidden');
      }
    } catch (e) {
      // Ignored
    }
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }

  // Export helper functions ra global
  window.CraftlinkNav = {
    updateCartBadges
  };
})();
