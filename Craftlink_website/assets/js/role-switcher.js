/**
 * CraftLink - Role Switcher & Persona Controller (role-switcher.js)
 * Tự động tạo widget chuyển đổi vai trò (Persona Switcher) ở góc màn hình
 * Hỗ trợ 4 vai trò: Buyer (Khách hàng), Maker (Nghệ nhân), Moderator (Kiểm duyệt viên), Admin (Quản trị viên)
 */

(function () {
  'use strict';

  // Hàm khử độc dữ liệu chống XSS (VP-02) dùng chung toàn sàn
  window.escapeHtml = function (str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };


  // Xác định độ sâu thư mục hiện tại để tính đường dẫn tương đối chính xác
  function getPathPrefix() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/admin/pages/')) return '../../';
    if (path.includes('/admin/')) return '../';
    if (path.includes('/seller/')) return '../';
    if (path.includes('/pages/')) return '../';
    return './';
  }

  const prefix = getPathPrefix();

  // Định nghĩa 4 Vai trò & Trang đích tương ứng
  const ROLES = {
    buyer: {
      key: 'buyer',
      title: 'Khách hàng (Buyer)',
      shortTitle: 'Buyer',
      icon: 'person',
      badgeColor: 'bg-[#2A3B32] text-white',
      accentColor: '#2A3B32',
      tagline: 'Khám phá thổ cẩm, đặt hàng tùy biến & theo dõi đơn',
      targetUrl: prefix + 'pages/buyer-marketplace.html',
      demoUser: 'buyer@craftlink.com',
      avatarText: 'KH'
    },
    maker: {
      key: 'maker',
      title: 'Nghệ nhân (Maker)',
      shortTitle: 'Nghệ nhân',
      icon: 'palette',
      badgeColor: 'bg-[#9A4526] text-white',
      accentColor: '#9A4526',
      tagline: 'Quản lý gian hàng, nhận Brief khách & gửi Proposal',
      targetUrl: prefix + 'seller/dashboard.html',
      demoUser: 'artisan@craftlink.com',
      avatarText: 'NN'
    },
    moderator: {
      key: 'moderator',
      title: 'Kiểm duyệt (Moderator)',
      shortTitle: 'Kiểm duyệt',
      icon: 'gavel',
      badgeColor: 'bg-[#D4A359] text-gray-900',
      accentColor: '#D4A359',
      tagline: 'Duyệt sản phẩm mới, kiểm duyệt nội dung & báo cáo',
      targetUrl: prefix + 'admin/pages/moderation.html',
      demoUser: 'moderator@craftlink.com',
      avatarText: 'KD'
    },
    admin: {
      key: 'admin',
      title: 'Quản trị viên (Admin)',
      shortTitle: 'Admin',
      icon: 'shield_person',
      badgeColor: 'bg-[#15251D] text-white',
      accentColor: '#15251D',
      tagline: 'Dashboard tổng quan, quản lý người dùng & danh mục',
      targetUrl: prefix + 'admin/pages/admin-platform-dashboard.html',
      demoUser: 'admin@craftlink.com',
      avatarText: 'AD'
    }
  };

  // Xác định vai trò hiện tại dựa trên URL
  function detectCurrentRole() {
    const path = window.location.pathname.replace(/\\/g, '/');
    if (path.includes('/seller/')) return 'maker';
    if (path.includes('/admin/pages/moderation.html')) return 'moderator';
    if (path.includes('/admin/')) return 'admin';
    const saved = localStorage.getItem('craftlink_current_role');
    if (saved && ROLES[saved]) return saved;
    return 'buyer';
  }

  const currentRoleKey = detectCurrentRole();
  const currentRole = ROLES[currentRoleKey];

  // Khởi tạo HTML cho Widget Nổi (Floating Role Switcher)
  function initRoleSwitcherUI() {
    // Không hiển thị nếu đã tồn tại
    if (document.getElementById('craftlink-role-switcher')) return;

    const switcherContainer = document.createElement('div');
    switcherContainer.id = 'craftlink-role-switcher';
    switcherContainer.className = 'fixed bottom-5 right-5 z-[99999] font-sans select-none';
    switcherContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 99999; font-family: "Plus Jakarta Sans", system-ui, sans-serif;';

    switcherContainer.innerHTML = `
      <!-- Trigger Button -->
      <div class="relative group" style="position: relative;">
        <button id="role-switcher-toggle" type="button"
          style="cursor: pointer; box-shadow: 0 8px 25px rgba(0,0,0,0.25); border-radius: 9999px; display: flex; align-items: center; gap: 8px; padding: 10px 16px;"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer text-sm font-semibold ${currentRole.badgeColor}">
          <span class="material-symbols-outlined text-[18px] animate-pulse">swap_horiz</span>
          <span class="hidden sm:inline text-xs uppercase tracking-wider opacity-90">Vai:</span>
          <span>${currentRole.shortTitle}</span>
          <span class="material-symbols-outlined text-[18px] opacity-75">expand_less</span>
        </button>

        <!-- Role Selector Panel (Popup) -->
        <div id="role-switcher-panel"
          style="position: absolute; bottom: 58px; right: 0; width: 340px; max-width: calc(100vw - 32px); background: #ffffff; border-radius: 16px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); border: 1px solid #e5e7eb; overflow: hidden; z-index: 999999;"
          class="hidden absolute bottom-14 right-0 w-[320px] sm:w-[360px] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden transform transition-all duration-300 origin-bottom-right">
          
          <!-- Header Panel -->
          <div class="p-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-amber-400 text-[22px]">switch_account</span>
              <div>
                <h4 class="font-bold text-sm leading-tight">Chuyển Vai Người Dùng</h4>
                <p class="text-[11px] text-gray-300">Chuyển đổi tức thì để kiểm thử toàn diện</p>
              </div>
            </div>
            <button id="role-switcher-close" class="text-gray-400 hover:text-white p-1 rounded-lg transition-colors">
              <span class="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          <!-- Roles List -->
          <div class="p-3 space-y-2 max-h-[380px] overflow-y-auto">
            ${Object.values(ROLES).map(r => {
              const isActive = r.key === currentRoleKey;
              return `
                <a href="${r.targetUrl}" data-role="${r.key}"
                  class="role-option-item flex items-start gap-3 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gray-50 border-gray-300 shadow-sm ring-1 ring-black/5'
                      : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                  }">
                  <div class="w-10 h-10 rounded-xl ${r.badgeColor} flex items-center justify-center shrink-0 shadow-sm">
                    <span class="material-symbols-outlined text-[20px]">${r.icon}</span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                      <span class="text-sm font-bold text-gray-900 truncate">${r.title}</span>
                      ${isActive ? '<span class="text-[10px] uppercase font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full shrink-0">Đang xem</span>' : ''}
                    </div>
                    <p class="text-[12px] text-gray-500 line-clamp-2 mt-0.5">${r.tagline}</p>
                  </div>
                </a>
              `;
            }).join('')}
          </div>

          <!-- Footer Switcher -->
          <div class="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-[14px] text-green-600">check_circle</span>
              Đồng bộ dữ liệu LocalStorage
            </span>
            <a href="${prefix}pages/login.html" class="text-primary font-semibold hover:underline">Trang Đăng nhập</a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(switcherContainer);

    // Event Listeners cho Switcher
    const toggleBtn = document.getElementById('role-switcher-toggle');
    const panel = document.getElementById('role-switcher-panel');
    const closeBtn = document.getElementById('role-switcher-close');

    function openPanel() {
      panel.classList.remove('hidden');
    }

    function closePanel() {
      panel.classList.add('hidden');
    }

    function togglePanel() {
      if (panel.classList.contains('hidden')) {
        openPanel();
      } else {
        closePanel();
      }
    }

    window.craftlinkRoleSwitcher = {
      open: openPanel,
      close: closePanel,
      toggle: togglePanel
    };

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanel();
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closePanel();
    });

    document.addEventListener('click', (e) => {
      if (!switcherContainer.contains(e.target)) {
        closePanel();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closePanel();
    });

    // Lưu role được chọn vào localStorage trước khi chuyển trang
    document.querySelectorAll('.role-option-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const role = item.getAttribute('data-role');
        if (role) {
          localStorage.setItem('craftlink_current_role', role);
        }
      });
    });
  }

  // Khởi động khi DOM sẵn sàng
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoleSwitcherUI);
  } else {
    initRoleSwitcherUI();
  }
})();
