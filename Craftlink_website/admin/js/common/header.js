/**
 * Craft Link Admin & Moderator - Header & Navigation Controller
 * Đồng bộ giao diện Header, Mobile Drawer và Switch Persona chuẩn Buyer
 */

// 1. Đóng dropdown thông báo khi bấm ra ngoài
document.addEventListener('click', function(e) {
  var p = document.getElementById('notifPanel');
  if (p && !p.classList.contains('hidden') && !e.target.closest('#notifPanel') && !e.target.closest('[onclick^="toggleNotif"]')) {
    p.classList.add('hidden');
  }
});

// 2. Mobile Drawer Navigation Controller (Chuẩn Buyer)
(function initAdminMobileNav() {
  const isSubPage = window.location.pathname.includes('/pages/');
  const prefix = isSubPage ? '' : 'pages/';
  const rootPrefix = isSubPage ? '../../' : '../';
  const isMod = window.location.pathname.includes('moderation.html');

  function ensureDrawer() {
    let backdrop = document.querySelector('.admin-mobile-backdrop');
    let drawer = document.querySelector('.admin-mobile-drawer');

    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'admin-mobile-backdrop fixed inset-0 bg-primary/50 backdrop-blur-xs z-50 opacity-0 pointer-events-none transition-opacity duration-300';
      document.body.appendChild(backdrop);
    }

    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.className = 'admin-mobile-drawer fixed top-0 left-0 bottom-0 w-72 bg-white z-[51] shadow-2xl flex flex-col transform -translate-x-full transition-transform duration-300 ease-out font-sans';
      drawer.setAttribute('aria-label', 'Menu điều hướng quản trị');

      drawer.innerHTML = `
        <!-- Drawer Header -->
        <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-white">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs">
              ${isMod ? 'KD' : 'AD'}
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-primary text-sm tracking-wide">CRAFT LINK</span>
              <span class="text-[9px] text-gray-500 uppercase tracking-widest">${isMod ? 'Kiểm Duyệt Viên' : 'Bảng Quản Trị'}</span>
            </div>
          </div>
          <button id="close-admin-drawer" type="button" class="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors cursor-pointer" aria-label="Đóng menu">
            <span class="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <!-- User Quick Profile -->
        <div class="p-4 bg-primary/5 border-b border-gray-100 flex items-center gap-3">
          <div class="w-10 h-10 rounded-full ${isMod ? 'bg-[#D4A359] text-gray-900' : 'bg-primary text-white'} flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
            ${isMod ? 'KD' : 'AD'}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-bold text-gray-900 text-sm truncate">${isMod ? 'Mod Hoàng' : 'Admin Nam'}</p>
            <p class="text-xs text-gray-500 truncate">${isMod ? 'moderator@craftlink.com' : 'admin@craftlink.com'}</p>
          </div>
        </div>

        <!-- Nav Links -->
        <nav class="p-4 space-y-1 flex-1 overflow-y-auto">
          <a href="${prefix}admin-platform-dashboard.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 font-medium text-sm transition-colors">
            <span class="material-symbols-outlined text-[20px] text-secondary">dashboard</span>
            <span>Tổng quan</span>
          </a>
          <a href="${prefix}admin-category-management.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 font-medium text-sm transition-colors">
            <span class="material-symbols-outlined text-[20px] text-secondary">category</span>
            <span>Danh mục</span>
          </a>
          <a href="${prefix}admin-user-management.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 font-medium text-sm transition-colors">
            <span class="material-symbols-outlined text-[20px] text-secondary">group</span>
            <span>Tài khoản</span>
          </a>
          <a href="${prefix}moderation.html" class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-700 hover:text-primary hover:bg-primary/5 font-medium text-sm transition-colors">
            <span class="material-symbols-outlined text-[20px] text-secondary">gavel</span>
            <span>Kiểm duyệt</span>
          </a>
          <div class="pt-2 pb-1 border-t border-gray-100 my-2">
            <span class="text-[11px] font-bold text-gray-400 uppercase tracking-wider px-3">Khám phá</span>
          </div>
          <a href="${rootPrefix}index.html" class="flex items-center gap-3 px-3.5 py-2 rounded-xl text-gray-600 hover:text-primary hover:bg-primary/5 text-sm transition-colors">
            <span class="material-symbols-outlined text-[18px]">storefront</span>
            <span>Về trang chủ</span>
          </a>
          <a href="${rootPrefix}pages/buyer-marketplace.html" class="flex items-center gap-3 px-3.5 py-2 rounded-xl text-gray-600 hover:text-primary hover:bg-primary/5 text-sm transition-colors">
            <span class="material-symbols-outlined text-[18px]">shopping_bag</span>
            <span>Sàn khám phá</span>
          </a>
        </nav>

        <!-- Persona Switcher Grid in Drawer -->
        <div class="p-3 bg-amber-50/50 border-t border-gray-100">
          <div class="text-[11px] font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[15px] text-amber-600">swap_horiz</span>
            Chuyển vai (Switch Persona)
          </div>
          <div class="grid grid-cols-2 gap-1.5">
            <a href="${rootPrefix}pages/buyer-marketplace.html" onclick="localStorage.setItem('craftlink_current_role','buyer')"
              class="p-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:text-primary flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">person</span>Buyer
            </a>
            <a href="${rootPrefix}seller/dashboard.html" onclick="localStorage.setItem('craftlink_current_role','maker')"
              class="p-2 rounded-lg bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:text-[#9A4526] flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">palette</span>Nghệ nhân
            </a>
            <a href="${prefix}moderation.html" onclick="localStorage.setItem('craftlink_current_role','moderator')"
              class="p-2 rounded-lg ${isMod ? 'bg-amber-100 border-amber-300 font-bold text-amber-900' : 'bg-white border-gray-200 text-gray-700'} text-xs font-semibold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">gavel</span>Kiểm duyệt
            </a>
            <a href="${prefix}admin-platform-dashboard.html" onclick="localStorage.setItem('craftlink_current_role','admin')"
              class="p-2 rounded-lg ${!isMod ? 'bg-gray-100 border-gray-300 font-bold text-gray-900' : 'bg-white border-gray-200 text-gray-700'} text-xs font-semibold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">shield_person</span>Admin
            </a>
          </div>
        </div>

        <!-- Drawer Footer -->
        <div class="p-4 border-t border-gray-100 bg-white">
          <button type="button" onclick="logoutDemo()" class="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            Đăng xuất (về trang đăng nhập)
          </button>
        </div>
      `;
      document.body.appendChild(drawer);
    }

    return { backdrop, drawer };
  }

  function setupEvents() {
    const { backdrop, drawer } = ensureDrawer();
    const openBtns = document.querySelectorAll('#mobile-menu-btn, .mobile-menu-trigger');
    const closeBtn = document.getElementById('close-admin-drawer');

    function open() {
      drawer.classList.remove('-translate-x-full');
      backdrop.classList.remove('opacity-0', 'pointer-events-none');
    }

    function close() {
      drawer.classList.add('-translate-x-full');
      backdrop.classList.add('opacity-0', 'pointer-events-none');
    }

    openBtns.forEach(b => b.addEventListener('click', function(e) {
      e.preventDefault();
      open();
    }));

    if (closeBtn) closeBtn.addEventListener('click', close);
    backdrop.addEventListener('click', close);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupEvents);
  } else {
    setupEvents();
  }
})();

// 3. Tự động nạp role-switcher.js cho toàn bộ giao diện Admin / Moderator
(function(){
  if (!document.querySelector('script[src*="role-switcher.js"]')) {
    var s = document.createElement('script');
    var isSubPage = window.location.pathname.includes('/pages/');
    s.src = isSubPage ? '../../assets/js/role-switcher.js' : '../assets/js/role-switcher.js';
    document.head.appendChild(s);
  }
})();
