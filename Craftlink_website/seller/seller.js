/**
 * ==========================================================================
 * CRAFT LINK - SELLER PORTAL CORE LOGIC (seller.js)
 * Quản lý Layout chung (Sidebar, Header, Bottom Nav), Toast, Modal xác nhận,
 * Định dạng tiền tệ VND, Trợ năng và Tương tác người dùng.
 * ==========================================================================
 */

window.SellerApp = (function () {
  // Menu điều hướng kênh người bán (Maker Portal)
  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', href: 'dashboard.html' },
    { id: 'briefs', label: 'Yêu cầu tùy biến', icon: 'palette', href: 'brief-inbox.html', badgeKey: 'pendingBriefs' },
    { id: 'proposals', label: 'Đề xuất & Báo giá', icon: 'description', href: 'proposal-editor.html' },
    { id: 'products', label: 'Tác phẩm (Listing)', icon: 'inventory_2', href: 'products.html' },
    { id: 'orders', label: 'Đơn hàng', icon: 'receipt_long', href: 'orders.html', badgeKey: 'pendingOrders' },
    { id: 'inventory', label: 'Kho hàng', icon: 'shelves', href: 'inventory.html' },
    { id: 'reviews-messages', label: 'Đánh giá & Chat', icon: 'chat', href: 'reviews-messages.html', badgeKey: 'unreadMessages' },
    { id: 'revenue', label: 'Doanh thu & Ví', icon: 'account_balance_wallet', href: 'revenue.html' },
    { id: 'promotions', label: 'Khuyến mãi', icon: 'local_offer', href: 'promotions.html' },
    { id: 'shop-profile', label: 'Hồ sơ xưởng', icon: 'storefront', href: 'shop-profile.html' },
    { id: 'settings', label: 'Cài đặt', icon: 'settings', href: 'settings.html' }
  ];

  // Khởi tạo layout chung cho các trang
  function initLayout(options = {}) {
    const { activeNav = 'dashboard', pageTitle = 'Kênh Người Sáng Tạo (Maker Portal)' } = options;
    const shop = window.SellerData ? window.SellerData.getShopInfo() : { artisanName: 'Nghệ nhân', name: 'Xưởng thủ công' };
    const orders = window.SellerData ? window.SellerData.getOrders() : [];
    const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
    const messages = window.SellerData ? window.SellerData.getMessages() : [];
    const unreadMessagesCount = messages.reduce((acc, m) => acc + (m.unread || 0), 0);
    const briefs = window.SellerData && window.SellerData.getBriefs ? window.SellerData.getBriefs() : [];
    const pendingBriefsCount = briefs.filter(b => b.status === 'pending' || b.status === 'revision_requested').length;

    // Tự động nạp role-switcher.js cho toàn bộ giao diện Seller/Maker
    if (!document.querySelector('script[src*="role-switcher.js"]')) {
      const roleScript = document.createElement('script');
      roleScript.src = '../assets/js/role-switcher.js';
      document.head.appendChild(roleScript);
    }

    // 1. Tạo Toast Container nếu chưa có
    if (!document.getElementById('seller-toast-container')) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'seller-toast-container';
      document.body.appendChild(toastContainer);
    }

    // 2. Render Sidebar Desktop
    const sidebarPlaceholder = document.getElementById('seller-sidebar');
    if (sidebarPlaceholder) {
      let navHtml = NAV_ITEMS.map(item => {
        const isActive = item.id === activeNav;
        let badgeHtml = '';
        if (item.badgeKey === 'pendingBriefs' && pendingBriefsCount > 0) {
          badgeHtml = `<span class="ml-auto px-2 py-0.5 text-[11px] font-bold rounded-full bg-secondary text-on-secondary animate-pulse">${pendingBriefsCount}</span>`;
        } else if (item.badgeKey === 'pendingOrders' && pendingOrdersCount > 0) {
          badgeHtml = `<span class="ml-auto px-2 py-0.5 text-[11px] font-bold rounded-full bg-secondary text-on-secondary">${pendingOrdersCount}</span>`;
        } else if (item.badgeKey === 'unreadMessages' && unreadMessagesCount > 0) {
          badgeHtml = `<span class="ml-auto px-2 py-0.5 text-[11px] font-bold rounded-full bg-secondary text-on-secondary">${unreadMessagesCount}</span>`;
        }

        return `
          <a href="${item.href}" class="flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-body-md transition-all ${isActive
            ? 'bg-primary text-on-primary font-semibold shadow-sm'
            : 'text-on-surface hover:bg-surface-container-high hover:text-primary'
          }">
            <span class="material-symbols-outlined text-[22px] ${isActive ? 'text-tertiary-fixed' : 'text-outline'}">${item.icon}</span>
            <span>${item.label}</span>
            ${badgeHtml}
          </a>
        `;
      }).join('');

      sidebarPlaceholder.innerHTML = `
        <aside class="fixed top-0 left-0 bottom-0 w-64 bg-surface border-r border-surface-container-high flex flex-col z-40">
          <!-- Logo & Tiêu đề kênh nghệ nhân -->
          <div class="h-20 px-6 flex items-center gap-3 border-b border-surface-container-high shrink-0">
            <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
              <span class="material-symbols-outlined text-[24px] text-tertiary-fixed">palette</span>
            </div>
            <div class="flex flex-col">
              <span class="font-serif-craft font-bold text-headline-sm text-primary tracking-wide">CRAFT LINK</span>
              <span class="text-[11px] font-semibold text-secondary uppercase tracking-wider">Kênh Người Bán</span>
            </div>
          </div>

          <!-- Thông tin nhanh Xưởng / Nghệ nhân -->
          <div class="p-4 mx-3 my-3 bg-surface-container-low rounded-xl border border-surface-container flex items-center gap-3">
            <img src="${shop.avatar}" alt="${shop.artisanName}" class="w-11 h-11 rounded-full object-cover border-2 border-secondary" />
            <div class="overflow-hidden">
              <h4 class="font-semibold text-sm text-primary truncate" title="${shop.name}">${shop.name}</h4>
              <p class="text-xs text-on-surface-variant truncate">${shop.artisanName}</p>
            </div>
          </div>

          <!-- Menu điều hướng chính -->
          <nav class="flex-1 px-3 space-y-1 overflow-y-auto" aria-label="Menu chính">
            ${navHtml}
          </nav>

          <!-- Nút trở về Website Khách Hàng -->
          <div class="p-4 border-t border-surface-container-high shrink-0 bg-surface">
            <a href="../index.html" class="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all text-sm font-semibold group shadow-2xs">
              <span class="material-symbols-outlined text-[18px] group-hover:-translate-x-0.5 transition-transform">store</span>
              <span>Xem trang khách hàng</span>
            </a>
            <div class="mt-2 text-center">
              <span class="text-[11px] text-on-surface-variant">Hỗ trợ nghệ nhân: 1900 6828</span>
            </div>
          </div>
        </aside>
      `;
    }

    // 3. Render Top Header
    const headerPlaceholder = document.getElementById('seller-header');
    if (headerPlaceholder) {
      headerPlaceholder.innerHTML = `
        <header class="h-20 bg-surface/90 backdrop-blur-md border-b border-surface-container-high px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div class="flex items-center gap-3">
            <!-- Nút mở drawer menu trên mobile -->
            <button id="btn-mobile-menu" class="lg:hidden p-2 rounded-lg text-primary hover:bg-surface-container-high focus:outline-none" aria-label="Mở menu điều hướng">
              <span class="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <div>
              <h1 class="font-serif-craft text-xl sm:text-2xl font-bold text-primary">${pageTitle}</h1>
              <p class="text-xs text-on-surface-variant hidden sm:block">Chào mừng bạn trở lại, gìn giữ tinh hoa thủ công truyền thống</p>
            </div>
          </div>

          <div class="flex items-center gap-3 sm:gap-4">
            <!-- Nút thêm sản phẩm nhanh -->
            <a href="product-form.html" class="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-secondary text-on-secondary text-sm font-semibold hover:opacity-95 shadow-sm transition-all">
              <span class="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Thêm sản phẩm</span>
            </a>

            <!-- Chuông thông báo -->
            <div class="relative">
              <button id="btn-notifications" class="w-10 h-10 rounded-xl bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-primary transition-colors relative" aria-label="Thông báo mới">
                <span class="material-symbols-outlined text-[22px]">notifications</span>
                ${pendingOrdersCount > 0 ? `<span class="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-secondary ring-2 ring-surface"></span>` : ''}
              </button>
            </div>

            <!-- Nút Switch Personal (Đổi vai trò) chuẩn Craft Link -->
            <button type="button" onclick="document.getElementById('role-switcher-toggle')?.click()"
              class="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-300/80 transition-all text-xs font-semibold cursor-pointer group shadow-2xs"
              title="Chuyển đổi vai trò">
              <span class="material-symbols-outlined text-[17px] text-amber-600 group-hover:rotate-180 transition-transform duration-500">sync_alt</span>
              <span>Switch Persona</span>
            </button>

            <!-- Avatar & Tài khoản xưởng -->
            <div class="flex items-center gap-2 pl-2 sm:border-l border-surface-container-high">
              <a href="shop-profile.html" class="flex items-center gap-2.5 group">
                <img src="${shop.avatar}" alt="${shop.artisanName}" class="w-9 h-9 rounded-full object-cover ring-1 ring-secondary/30 group-hover:ring-secondary transition-all" />
                <div class="hidden md:flex flex-col text-left">
                  <span class="text-sm font-bold text-primary group-hover:text-secondary transition-colors">${shop.artisanName}</span>
                  <span class="text-[11px] text-on-surface-variant">Chủ xưởng thủ công</span>
                </div>
              </a>
              <a href="../pages/login.html" title="Đăng xuất" class="p-1.5 rounded-lg text-outline hover:text-error hover:bg-error-container/30 transition-colors" aria-label="Đăng xuất">
                <span class="material-symbols-outlined text-[20px]">logout</span>
              </a>
            </div>
          </div>
        </header>

        <!-- Mobile Drawer Overlay Menu -->
        <div id="seller-mobile-drawer" class="fixed inset-0 bg-primary/50 backdrop-blur-xs z-50 hidden opacity-0 transition-opacity duration-300 lg:hidden">
          <div class="w-72 bg-surface h-full flex flex-col shadow-xl transform -translate-x-full transition-transform duration-300">
            <div class="p-5 flex items-center justify-between border-b border-surface-container-high">
              <div class="flex items-center gap-2">
                <span class="font-serif-craft font-bold text-lg text-primary">CRAFT LINK</span>
                <span class="text-[10px] bg-secondary text-on-secondary px-1.5 py-0.5 rounded font-bold uppercase">Seller</span>
              </div>
              <button id="btn-close-mobile-drawer" class="p-1.5 rounded-lg text-outline hover:bg-surface-container" aria-label="Đóng menu">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav class="flex-1 p-3 space-y-1 overflow-y-auto">
              ${NAV_ITEMS.map(item => `
                <a href="${item.href}" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm ${item.id === activeNav ? 'bg-primary text-on-primary font-bold' : 'text-on-surface hover:bg-surface-container'}">
                  <span class="material-symbols-outlined text-[20px]">${item.icon}</span>
                  <span>${item.label}</span>
                </a>
              `).join('')}
            </nav>
            <div class="p-4 border-t border-surface-container-high">
              <a href="../index.html" class="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-surface-container text-primary font-semibold text-sm">
                <span class="material-symbols-outlined text-[18px]">store</span>
                <span>Xem trang khách hàng</span>
              </a>
            </div>
          </div>
        </div>
      `;

      // Xử lý sự kiện mở/đóng Mobile Drawer
      setupMobileDrawer();
    }

    // 4. Render Bottom Nav trên Mobile (< 1024px)
    const bottomNavPlaceholder = document.getElementById('seller-bottom-nav');
    if (bottomNavPlaceholder) {
      const mobileNavs = [
        { id: 'dashboard', label: 'Tổng quan', icon: 'dashboard', href: 'dashboard.html' },
        { id: 'products', label: 'Sản phẩm', icon: 'inventory_2', href: 'products.html' },
        { id: 'orders', label: 'Đơn hàng', icon: 'receipt_long', href: 'orders.html', badge: pendingOrdersCount },
        { id: 'reviews-messages', label: 'Tin nhắn', icon: 'chat', href: 'reviews-messages.html', badge: unreadMessagesCount },
        { id: 'shop-profile', label: 'Xưởng', icon: 'storefront', href: 'shop-profile.html' }
      ];

      bottomNavPlaceholder.innerHTML = `
        <nav class="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface/95 backdrop-blur-md border-t border-surface-container-high flex items-center justify-around z-40 px-2 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]" aria-label="Thanh điều hướng nhanh">
          ${mobileNavs.map(tab => {
        const isActive = tab.id === activeNav;
        return `
              <a href="${tab.href}" class="flex flex-col items-center justify-center flex-1 py-1 text-center relative ${isActive ? 'text-secondary font-bold' : 'text-outline hover:text-primary'}">
                <div class="relative">
                  <span class="material-symbols-outlined text-[22px]">${tab.icon}</span>
                  ${tab.badge > 0 ? `<span class="absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-secondary text-on-secondary text-[10px] font-bold leading-tight">${tab.badge}</span>` : ''}
                </div>
                <span class="text-[10px] mt-0.5">${tab.label}</span>
              </a>
            `;
      }).join('')}
        </nav>
      `;
    }
  }

  // Thiết lập sự kiện Drawer Mobile
  function setupMobileDrawer() {
    const btnOpen = document.getElementById('btn-mobile-menu');
    const drawer = document.getElementById('seller-mobile-drawer');
    const btnClose = document.getElementById('btn-close-mobile-drawer');

    if (!btnOpen || !drawer) return;

    const openDrawer = () => {
      drawer.classList.remove('hidden');
      setTimeout(() => {
        drawer.classList.remove('opacity-0');
        drawer.querySelector('div').classList.remove('-translate-x-full');
      }, 10);
    };

    const closeDrawer = () => {
      drawer.classList.add('opacity-0');
      drawer.querySelector('div').classList.add('-translate-x-full');
      setTimeout(() => {
        drawer.classList.add('hidden');
      }, 300);
    };

    btnOpen.addEventListener('click', openDrawer);
    if (btnClose) btnClose.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });
  }

  // Định dạng số tiền VND: 680000 -> 680.000đ
  function formatVND(amount) {
    if (isNaN(amount)) return '0đ';
    return Number(amount).toLocaleString('vi-VN') + 'đ';
  }

  // Hiển thị Toast thông báo đẹp mắt
  function showToast(message, type = 'success') {
    const container = document.getElementById('seller-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `seller-toast toast-${type}`;

    let icon = 'check_circle';
    if (type === 'error') icon = 'error';
    if (type === 'warning') icon = 'warning';
    if (type === 'info') icon = 'info';

    toast.innerHTML = `
      <span class="material-symbols-outlined text-[20px] text-${type === 'success' ? 'emerald-600' : type === 'error' ? 'rose-600' : 'amber-600'}">${icon}</span>
      <div class="flex-1">${message}</div>
      <button type="button" class="text-outline hover:text-primary" onclick="this.parentElement.remove()" aria-label="Đóng thông báo">
        <span class="material-symbols-outlined text-[16px]">close</span>
      </button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastSlideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  // Hộp thoại xác nhận hành động (Xóa sản phẩm, hủy đơn, v.v.)
  function confirmAction(options = {}) {
    const {
      title = 'Xác nhận hành động',
      message = 'Bạn có chắc chắn muốn thực hiện hành động này không?',
      confirmText = 'Đồng ý',
      cancelText = 'Hủy bỏ',
      isDanger = false,
      onConfirm = () => { }
    } = options;

    let modal = document.getElementById('seller-confirm-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'seller-confirm-modal';
      modal.className = 'seller-modal-backdrop';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="seller-modal-box p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 rounded-full ${isDanger ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'} flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">${isDanger ? 'warning' : 'help'}</span>
          </div>
          <h3 class="font-serif-craft font-bold text-lg text-primary">${title}</h3>
        </div>
        <p class="text-body-md text-on-surface-variant mb-6 leading-relaxed">${message}</p>
        <div class="flex items-center justify-end gap-3">
          <button id="modal-btn-cancel" class="px-4 py-2.5 rounded-xl border border-surface-container-highest text-on-surface font-semibold text-sm hover:bg-surface-container transition-colors">
            ${cancelText}
          </button>
          <button id="modal-btn-confirm" class="px-5 py-2.5 rounded-xl ${isDanger ? 'bg-error hover:bg-error/90 text-on-error' : 'bg-primary hover:bg-primary/90 text-on-primary'} font-semibold text-sm shadow-sm transition-all">
            ${confirmText}
          </button>
        </div>
      </div>
    `;

    modal.classList.add('active');

    const btnConfirm = modal.querySelector('#modal-btn-confirm');
    const btnCancel = modal.querySelector('#modal-btn-cancel');

    const closeModal = () => {
      modal.classList.remove('active');
    };

    btnCancel.onclick = closeModal;
    btnConfirm.onclick = () => {
      closeModal();
      onConfirm();
    };
  }

  // Chuyển đổi trạng thái đơn hàng sang badge HTML
  function getOrderStatusBadge(status) {
    switch (status) {
      case 'pending':
        return '<span class="px-2.5 py-1 rounded-full text-xs font-semibold badge-status-pending">Chờ xác nhận</span>';
      case 'preparing':
        return '<span class="px-2.5 py-1 rounded-full text-xs font-semibold badge-status-preparing">Đang chuẩn bị</span>';
      case 'shipping':
        return '<span class="px-2.5 py-1 rounded-full text-xs font-semibold badge-status-shipping">Đang giao hàng</span>';
      case 'completed':
        return '<span class="px-2.5 py-1 rounded-full text-xs font-semibold badge-status-completed">Hoàn thành</span>';
      case 'cancelled':
        return '<span class="px-2.5 py-1 rounded-full text-xs font-semibold badge-status-cancelled">Đã hủy</span>';
      default:
        return `<span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">${status}</span>`;
    }
  }

  return {
    initLayout,
    formatVND,
    showToast,
    confirmAction,
    getOrderStatusBadge
  };
})();
