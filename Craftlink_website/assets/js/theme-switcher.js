/**
 * CraftLink - Theme Switcher & Real-time State Controller (theme-switcher.js)
 * Tính năng Mở rộng 3 (+0.25 điểm): Chế độ Sáng / Tối (Dark / Light Mode) toàn hệ thống
 * - Lưu trạng thái vào localStorage ('craftlink_theme')
 * - Đồng bộ tức thì giữa các Tab thông qua sự kiện 'storage'
 * - Cấu hình thẻ <html data-theme="dark" class="dark">
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'craftlink_theme';
  let lastToggleTime = 0;

  // 1. Lấy theme hiện tại (mặc định 'light' hoặc theo thiết lập trước đó)
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return 'light';
  }

  // 2. Áp dụng theme lên DOM
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    
    // Gán đồng thời lên cả html và body
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', isDark);
    if (document.body) {
      document.body.setAttribute('data-theme', theme);
      document.body.classList.toggle('dark', isDark);
    }

    // Cập nhật tất cả các icon toggle trên trang
    document.querySelectorAll('.theme-toggle-icon').forEach(icon => {
      icon.textContent = isDark ? 'light_mode' : 'dark_mode';
      if (isDark) {
        icon.classList.add('text-amber-400');
        icon.classList.remove('text-gray-600');
      } else {
        icon.classList.remove('text-amber-400');
        icon.classList.add('text-gray-600');
      }
    });

    // Cập nhật nhãn nếu có
    document.querySelectorAll('.theme-toggle-label').forEach(label => {
      label.textContent = isDark ? 'Chế độ Sáng' : 'Chế độ Tối';
    });

    // Cập nhật tooltip
    document.querySelectorAll('#theme-toggle-btn, .theme-toggle-btn').forEach(btn => {
      btn.setAttribute('title', isDark ? 'Chuyển sang Chế độ Sáng (Light Mode)' : 'Chuyển sang Chế độ Tối (Dark Mode)');
      btn.setAttribute('aria-label', isDark ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối');
    });
  }

  // 3. Đổi qua lại giữa dark / light (có guard chống click đúp liên tục)
  function toggleTheme() {
    const now = Date.now();
    if (now - lastToggleTime < 350) return; // Chống double-event
    lastToggleTime = now;

    const current = (document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark')) ? 'dark' : 'light';
    const nextTheme = current === 'dark' ? 'light' : 'dark';

    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);

    // Hiện toast nhỏ thông báo
    showThemeToast(nextTheme === 'dark' ? '🌙 Đã bật Giao diện Tối (Dark Mode)' : '☀️ Đã bật Giao diện Sáng (Light Mode)');
  }

  function showThemeToast(msg) {
    let toast = document.getElementById('theme-toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'theme-toast-notice';
      toast.style.cssText = 'position: fixed; bottom: 84px; right: 24px; z-index: 999999; background: #2A3B32; color: #FFFFFF; padding: 10px 18px; border-radius: 9999px; font-size: 13px; font-weight: 600; box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 8px; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); opacity: 0; transform: translateY(12px); pointer-events: none; border: 1px solid rgba(255,255,255,0.1);';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span class="material-symbols-outlined" style="font-size: 18px; color: #E5B56B;">palette</span><span>${msg}</span>`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 2200);
  }

  // 4. Tự động chèn nút đổi theme vào thanh Header nếu trang chưa có sẵn
  function injectThemeToggleToHeader() {
    const existingBtn = document.getElementById('theme-toggle-btn');
    if (existingBtn) {
      // Nếu nút ĐÃ CÓ onclick trong HTML, KHÔNG addEventListener nữa để tránh bị trigger 2 lần
      if (!existingBtn.getAttribute('onclick') && !existingBtn.dataset.bound) {
        existingBtn.dataset.bound = 'true';
        existingBtn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleTheme();
        });
      }
      return;
    }

    // Tạo nút toggle theme mới nếu trang chưa có sẵn
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.className = 'theme-toggle-btn relative p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-full transition-all cursor-pointer flex items-center justify-center';
    btn.innerHTML = `<span class="material-symbols-outlined theme-toggle-icon text-[22px]">dark_mode</span>`;
    btn.dataset.bound = 'true';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleTheme();
    });

    // Tìm vị trí thích hợp nhất trong Header
    const avatarGroup = document.querySelector('header .relative.group') || 
                        document.querySelector('header a[href*="login"]') ||
                        document.querySelector('header .group');

    if (avatarGroup && avatarGroup.parentNode) {
      avatarGroup.parentNode.insertBefore(btn, avatarGroup);
      return;
    }

    const actionContainer = document.querySelector('header .flex.items-center.gap-1\\.5') ||
                            document.querySelector('header .flex.items-center.gap-4') || 
                            document.querySelector('header .shrink-0') ||
                            document.querySelector('header nav');

    if (actionContainer) {
      actionContainer.appendChild(btn);
    }
  }

  // 5. Khởi tạo ngay lập tức để chống chớp trắng (FOUC)
  const initialTheme = getPreferredTheme();
  document.documentElement.setAttribute('data-theme', initialTheme);
  if (initialTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  // Khi DOM đã tải xong
  function onReady() {
    injectThemeToggleToHeader();
    applyTheme(getPreferredTheme());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

  // 6. ĐỒNG BỘ LIÊN TAB (MỞ RỘNG 1 + 3):
  // Khi đổi theme ở Tab 1 -> Tab 2 lập tức chuyển theme theo mà không cần F5!
  window.addEventListener('storage', (e) => {
    if (e.key === STORAGE_KEY && (e.newValue === 'dark' || e.newValue === 'light')) {
      applyTheme(e.newValue);
    }
  });

  // Xuất API toàn cục
  window.CraftlinkTheme = {
    get: () => document.documentElement.getAttribute('data-theme') || 'light',
    set: (t) => { localStorage.setItem(STORAGE_KEY, t); applyTheme(t); },
    toggle: toggleTheme
  };
})();
