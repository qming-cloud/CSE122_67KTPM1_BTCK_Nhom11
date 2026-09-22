/* SkillSwap Admin - COMMON DATA STORE
   Frontend-only: DOM + Event + Array/Object + CRUD + localStorage.
*/
(function () {
  'use strict';

  const STORAGE_KEY = 'skillswap_admin_store_v3';
  const EVENT_NAME = 'skillswap:data-changed';

  const DEFAULT_DATA = {
    users: [
      { id: 'USR-001', name: 'Nguyễn Văn An', email: 'alex.nguyen@email.com', rating: 4.9, completedSessions: 24, credit: 98, kyc: 'Hợp lệ & Đã xác minh CCCD chip', teach: ['UI/UX Design', 'Figma Auto-layout', 'Design System'], learn: ['Next.js 14 App Router', 'Tailwind CSS Advanced'], category: 'design', status: 'active', isBanned: false, badge: true, createdAt: '2026-08-01T08:00:00.000Z' },
      { id: 'USR-002', name: 'Trần Thị Bích', email: 'bich.tran@edu.vn', rating: 5.0, completedSessions: 3, credit: 100, kyc: 'Chờ xác minh', teach: ['IELTS 8.0', 'English Speaking'], learn: ['Guitar', 'Music Theory'], category: 'lang', status: 'pending', isBanned: false, badge: false, createdAt: '2026-08-03T08:00:00.000Z' },
      { id: 'USR-003', name: 'Đỗ Quang Khải', email: 'khai.dq@tech.io', rating: 3.2, completedSessions: 18, credit: 52, kyc: 'Hồ sơ CCCD hợp lệ', teach: ['Python Backend', 'FastAPI', 'PostgreSQL'], learn: ['Digital Marketing', 'SEO Organic Growth'], category: 'it', status: 'active', isBanned: false, badge: false, createdAt: '2026-08-05T08:00:00.000Z' },
      { id: 'USR-004', name: 'Lê Hồng Sơn', email: 'son.lh@mail.com', rating: 1.0, completedSessions: 1, credit: 35, kyc: 'Đã khóa do vi phạm', teach: ['SEO Master'], learn: ['Photoshop'], category: 'biz', status: 'blocked', isBanned: true, badge: false, createdAt: '2026-07-12T08:00:00.000Z' }
    ],
    notifications: [
      { id: 'BC-8942', title: 'Bảo trì nâng cấp máy chủ phiên bản 2.4', content: 'Hệ thống sẽ bảo trì định kỳ và dự kiến hoàn tất trong 45 phút.', category: 'Bảo trì hệ thống', channels: ['In-app Pop-up', 'Email'], audience: 'Toàn bộ người dùng', schedule: '02:00 sáng Chủ Nhật', status: 'scheduled', read: false, createdAt: '2026-09-10T08:00:00.000Z' },
      { id: 'BC-8910', title: 'Ra mắt tính năng Trao đổi kỹ năng theo Nhóm (SkillSwap Circles)', content: 'Tính năng mới dành cho người dùng tích cực.', category: 'Tính năng mới', channels: ['In-app Banner'], audience: 'Người dùng tích cực (>3 phiên swap)', schedule: 'Đã phát 18:30 hôm qua', status: 'published', read: false, createdAt: '2026-09-09T08:00:00.000Z' },
      { id: 'BC-8720', title: 'Cảnh báo an toàn thông tin & phòng tránh lừa đảo', content: 'Nhắc nhở cộng đồng về các dấu hiệu lừa đảo và bảo vệ tài khoản.', category: 'Cảnh báo quan trọng', channels: ['Modal Ghim', 'Web banner'], audience: 'Tất cả thành viên & Khách vãng lai', schedule: 'Liên tục 24/7', status: 'active', read: false, createdAt: '2026-09-08T08:00:00.000Z' }
    ],
    stories: [
      { id: 'ST-001', name: 'Mai Anh', role: 'Học viên chuyển ngành UI/UX', teach: 'Kế toán thực hành', learn: 'Figma Design', quote: 'Từ nhân viên kế toán đến UI/UX Designer: Nhờ 3 tháng trao đổi kỹ năng cùng Mentor tại SkillSwap.', views: 2418, pinned: true },
      { id: 'ST-002', name: 'Đức Hoàng', role: 'Kỹ sư Phần mềm tại Hà Nội', teach: 'React & Node.js', learn: 'Tiếng Pháp B1', quote: 'Kỹ sư phần mềm học giao tiếp tiếng Pháp để chuyển công tác sang Lyon thành công sau 60 buổi ghép cặp.', views: 1890, pinned: false }
    ],
    feedback: [
      { id: 'FB-001', ticket: '#RP-1092', title: 'Không đến buổi hẹn và không phản hồi sau 30 phút chờ', author: 'Hoàng Long', respondent: 'Quốc Bảo', category: 'Nghiêm trọng', detail: 'Cặp đổi kỹ năng: Frontend React Nâng cao lấy Thiết kế UI/UX Figma. Buổi hẹn lúc 19:30 ngày hôm nay.', complainantText: 'Tôi đã chuẩn bị slide và bài tập thực hành React Native mất 2 tiếng. Đến 19:30 tôi vào phòng Google Meet chờ bạn ấy nhưng không hề thấy online.', respondentText: 'Khu vực nhà tôi tại Quận 7 gặp sự cố nổ trạm biến áp mất điện đột xuất cả khu. Tôi đã dùng 4G nhắn tin giải thích nhưng ứng dụng báo lỗi Socket Timeout.', reviewComment: 'Đối tác thiếu tôn trọng thời gian, biến mất không lý do sau khi người khác đã tốn công soạn giáo trình.', status: 'pending', priority: 'high', createdAt: '2026-09-13T07:30:00.000Z' },
      { id: 'FB-002', ticket: '#RP-1090', title: 'Nội dung nhận xét chứa từ ngữ xúc phạm thô lỗ', author: 'Quốc Bảo', respondent: 'Trần Đăng', category: 'AI Flag', detail: 'Hệ thống lọc tự động gắn cờ đánh giá của user @trandang_dev có 3 từ ngữ kích động thù hận, công kích cá nhân.', status: 'pending', priority: 'medium', createdAt: '2026-09-13T07:10:00.000Z' },
      { id: 'FB-003', ticket: '#RP-1088', title: 'Nghi vấn yêu cầu chuyển tiền ngoài nền tảng để dạy kèm', author: 'Minh Anh', respondent: 'Tuấn Kiệt', category: 'Gian lận tài chính', detail: 'Người dùng báo cáo thành viên yêu cầu gửi 500.000 VNĐ tiền cọc học phí vào tài khoản cá nhân thay vì tích điểm SwapHour.', status: 'pending', priority: 'high', createdAt: '2026-09-13T06:50:00.000Z' }
    ]
  };

  const clone = value => JSON.parse(JSON.stringify(value));

  function loadData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        const initial = clone(DEFAULT_DATA);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        return initial;
      }
      const parsed = JSON.parse(raw);
      return {
        users: Array.isArray(parsed.users) ? parsed.users : clone(DEFAULT_DATA.users),
        notifications: Array.isArray(parsed.notifications) ? parsed.notifications : clone(DEFAULT_DATA.notifications),
        stories: Array.isArray(parsed.stories) ? parsed.stories : clone(DEFAULT_DATA.stories),
        feedback: Array.isArray(parsed.feedback) ? parsed.feedback : clone(DEFAULT_DATA.feedback)
      };
    } catch (error) {
      console.error('Không thể đọc Admin Store:', error);
      return clone(DEFAULT_DATA);
    }
  }

  let appData = loadData();

  function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: clone(appData) }));
  }

  function generateId(prefix) {
    return prefix + '-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function getData(type) { return appData[type] || []; }
  function getById(type, id) { return getData(type).find(item => item.id === id) || null; }
  
  function createItem(type, item) {
    if (!Array.isArray(appData[type])) appData[type] = [];
    const newItem = { id: item.id || generateId(type.slice(0, 4).toUpperCase()), createdAt: item.createdAt || new Date().toISOString(), ...item };
    appData[type].push(newItem);
    saveData();
    return newItem;
  }

  function updateItem(type, id, changes) {
    const list = appData[type];
    if (!Array.isArray(list)) return null;
    const index = list.findIndex(item => item.id === id);
    if (index < 0) return null;
    list[index] = { ...list[index], ...changes, updatedAt: new Date().toISOString() };
    saveData();
    return list[index];
  }

  function deleteItem(type, id) {
    const list = appData[type];
    if (!Array.isArray(list)) return false;
    const next = list.filter(item => item.id !== id);
    if (next.length === list.length) return false;
    appData[type] = next;
    saveData();
    return true;
  }

  function resetData() { appData = clone(DEFAULT_DATA); saveData(); }
  function formatUserRating(user) { return '★ ' + Number(user.rating || 0).toFixed(1) + ' (' + Number(user.completedSessions || 0) + ' buổi hoàn thành)'; }
  function formatUserCredit(user) { return Number(user.credit || 0) + ' / 100' + (Number(user.credit) < 70 ? ' (Cảnh báo)' : ''); }
  function getUserStatusLabel(user) { return user.isBanned || user.status === 'blocked' ? 'Bị khóa' : user.status === 'pending' ? 'Chờ xác minh' : 'Hoạt động'; }

  function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.style.cssText = 'position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;flex-direction:column;gap:8px;align-items:flex-end;pointer-events:none;';
      document.body.appendChild(container);
    }
    const colors = { success: '#1e00a9', error: '#ba1a1a', info: '#855300' };
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = 'background:' + (colors[type] || colors.success) + ';color:#fff;padding:12px 18px;border-radius:12px;font-family:"Plus Jakarta Sans",sans-serif;font-size:14px;font-weight:600;box-shadow:0 4px 16px rgba(0,0,0,.18);opacity:0;transform:translateY(12px);transition:opacity .25s ease,transform .25s ease;max-width:360px;pointer-events:auto;';
    container.appendChild(toast);
    requestAnimationFrame(() => { toast.style.opacity = '1'; toast.style.transform = 'translateY(0)'; });
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  function updateSidebarBadge() {
    const pendingCount = getData('feedback').filter(f => f.status === 'pending').length;
    document.querySelectorAll('#header-feedback-badge, a[data-path="danh-gia-va-bao-cao"] span.badge, a[data-path="danh-gia-va-bao-cao"] span.bg-error-container').forEach(badge => {
      badge.textContent = pendingCount;
      badge.classList.toggle('hidden', pendingCount === 0);
    });
  }

  function initGlobalSearch() {
    const headerSearchInputs = document.querySelectorAll('header input[type="text"]');
    headerSearchInputs.forEach(input => {
      const wrapper = input.closest('.relative') || input.parentElement;
      let dropdown = wrapper.querySelector('.global-search-dropdown');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'global-search-dropdown hidden absolute left-0 right-0 top-full mt-1 bg-surface-container-lowest rounded-xl shadow-xl border border-surface-container-highest z-[60] overflow-hidden max-h-80 overflow-y-auto';
        wrapper.appendChild(dropdown);
      }

      let debounceTimer = null;
      input.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const q = this.value.trim().toLowerCase();
        if (q.length < 2) { dropdown.classList.add('hidden'); return; }
        debounceTimer = setTimeout(() => {
          const results = [];
          getData('users').forEach(u => {
            const text = [u.id, u.name, u.email, ...(u.teach || []), ...(u.learn || [])].join(' ').toLowerCase();
            if (text.includes(q)) results.push({ type: 'user', icon: 'person', label: u.name, sub: u.email + ' • ' + u.id, href: 'usermanagement.html', color: 'text-primary' });
          });
          getData('notifications').forEach(n => {
            const text = [n.id, n.title, n.content, n.category].join(' ').toLowerCase();
            if (text.includes(q)) results.push({ type: 'notification', icon: 'campaign', label: n.title, sub: n.category + ' • ' + n.id, href: 'content.html', color: 'text-secondary' });
          });
          getData('feedback').forEach(f => {
            const text = [f.ticket, f.title, f.author].join(' ').toLowerCase();
            if (text.includes(q)) results.push({ type: 'feedback', icon: 'gavel', label: f.title, sub: f.author + ' • ' + f.ticket, href: 'feedback.html', color: 'text-tertiary' });
          });

          if (results.length === 0) {
            dropdown.innerHTML = '<div class="px-space-md py-space-sm text-on-surface-variant font-body-sm text-center">Không tìm thấy kết quả phù hợp</div>';
          } else {
            dropdown.innerHTML = results.slice(0, 8).map(r =>
              '<a href="' + r.href + '" class="flex items-center gap-space-sm px-space-md py-space-sm hover:bg-surface-container-low transition-colors cursor-pointer">' +
                '<span class="material-symbols-outlined text-[20px] ' + r.color + '">' + r.icon + '</span>' +
                '<div class="flex flex-col min-w-0">' +
                  '<span class="font-label-md text-label-md text-on-surface font-semibold truncate">' + r.label + '</span>' +
                  '<span class="font-label-sm text-label-sm text-on-surface-variant truncate">' + r.sub + '</span>' +
                '</div>' +
              '</a>'
            ).join('');
          }
          dropdown.classList.remove('hidden');
        }, 250);
      });

      document.addEventListener('click', e => {
        if (!wrapper.contains(e.target)) dropdown.classList.add('hidden');
      });

      input.addEventListener('keydown', e => {
        if (e.key === 'Escape') { dropdown.classList.add('hidden'); input.blur(); }
      });
    });
  }

  /* --- AUTH & PHIÊN ĐĂNG NHẬP --- */
  const AUTH_KEY = 'skillswap_current_user';

  function getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (!raw) {
        // Khởi tạo sẵn tài khoản Admin demo để người dùng mở trang không bị chặn bất ngờ
        const defaultAdmin = {
          id: 'USR-ADMIN',
          name: 'Nguyễn Minh Quân',
          email: 'admin@skillswap.vn',
          role: 'Quản trị viên cấp cao',
          isLoggedIn: true,
          loginAt: new Date().toISOString()
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(defaultAdmin));
        return defaultAdmin;
      }
      const user = JSON.parse(raw);
      return user && user.isLoggedIn ? user : null;
    } catch (e) {
      return null;
    }
  }

  function loginUser(userData) {
    const session = {
      id: userData.id || 'USR-ADMIN',
      name: userData.name || 'Nguyễn Minh Quân',
      email: userData.email || 'admin@skillswap.vn',
      role: userData.role || 'Quản trị viên cấp cao',
      isLoggedIn: true,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return session;
  }

  function logoutUser() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('activePersona');
    localStorage.removeItem('realUserRole');
    showToast('Đã đăng xuất khỏi hệ thống', 'info');
    setTimeout(() => {
      window.location.href = '../../login.html';
    }, 400);
  }

  function checkPageAuth() {
    const path = (window.location.pathname || '').toLowerCase();
    const isLoginPage = path.endsWith('login.html') || path.endsWith('/login');
    
    // PERSONA SWITCHER LOGIC OVERRIDE
    const activePersona = localStorage.getItem('activePersona');
    const isAdminPage = path.includes('dashboard') || path.includes('usermanagement') || path.includes('feedback') || path.includes('content');
    
    if (isAdminPage && activePersona !== 'admin') {
      window.location.href = '../../login.html';
      return;
    }

    const user = getCurrentUser();
    if (!isLoginPage) {
      if (isAdminPage && (!user || !user.isLoggedIn)) {
        window.location.href = '../../login.html';
      }
    }
  }

  // Khởi chạy kiểm tra đăng nhập ngay khi script nạp
  checkPageAuth();

  /* --- Cập nhật giao diện Profile & Logout trên Header & Sidebar --- */
  function setupHeaderProfile() {
    const user = getCurrentUser();
    if (!user) return;

    // Tìm nút avatar squircle mới hoặc profile cũ
    const avatarBtn = document.getElementById('header-avatar-btn') || document.querySelector('header .flex.items-center.gap-space-sm');
    if (avatarBtn) {
      let menu = document.getElementById('header-profile-dropdown');
      if (!menu) {
        menu = document.createElement('div');
        menu.id = 'header-profile-dropdown';
        menu.className = 'hidden absolute right-0 top-14 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-highest z-[60] overflow-hidden flex flex-col p-2 animate-in fade-in zoom-in duration-150';
        menu.innerHTML = `
          <div class="px-3 py-2 border-b border-surface-container mb-1">
            <p class="font-label-md font-bold text-on-surface truncate">${user.name}</p>
            <p class="font-label-sm text-on-surface-variant truncate">${user.email}</p>
            <span class="inline-block mt-1 px-2 py-0.5 rounded-md bg-primary-fixed text-primary font-label-sm text-xs font-semibold">${user.role || 'Quản trị viên'}</span>
          </div>
          <a href="usermanagement.html" class="flex items-center gap-2 px-3 py-2 rounded-xl text-on-surface hover:bg-surface-container font-label-md transition-colors">
            <span class="material-symbols-outlined text-[18px] text-primary">manage_accounts</span>
            <span>Quản lý thành viên</span>
          </a>
          <button type="button" id="header-logout-btn" class="flex items-center gap-2 px-3 py-2 rounded-xl text-error hover:bg-error-container/20 font-label-md transition-colors text-left w-full mt-1">
            <span class="material-symbols-outlined text-[18px]">logout</span>
            <span>Đăng xuất</span>
          </button>
        `;
        avatarBtn.parentElement.appendChild(menu);

        avatarBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          menu.classList.toggle('hidden');
        });

        document.addEventListener('click', (e) => {
          if (!avatarBtn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
          }
        });

        menu.querySelector('#header-logout-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          logoutUser();
        });
      }
    }

    // Thêm nút Đăng xuất vào Sidebar nếu có
    const nav = document.querySelector('aside nav');
    if (nav && !document.getElementById('sidebar-logout-btn')) {
      const logoutBtn = document.createElement('button');
      logoutBtn.id = 'sidebar-logout-btn';
      logoutBtn.type = 'button';
      logoutBtn.className = 'flex items-center gap-space-md px-space-md py-space-sm rounded-xl text-error hover:bg-error-container/20 transition-colors mt-2 text-left w-full font-label-lg text-label-lg';
      logoutBtn.innerHTML = `
        <span class="material-symbols-outlined text-[20px]">logout</span>
        <span>Đăng xuất</span>
      `;
      logoutBtn.addEventListener('click', () => {
        logoutUser();
      });
      nav.appendChild(logoutBtn);
    }
  }

  window.AdminStore = { get data(){ return appData; }, loadData, saveData, getData, getById, createItem, updateItem, deleteItem, generateId, resetData, formatUserRating, formatUserCredit, getUserStatusLabel, updateSidebarBadge, EVENT_NAME };
  window.Auth = { getCurrentUser, loginUser, logoutUser, checkPageAuth };
  window.showToast = showToast;

  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY || !event.newValue) return;
    try { appData = JSON.parse(event.newValue); window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: clone(appData) })); } catch (error) { console.error(error); }
  });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[data-path="cai-dat-he-thong"]').forEach(link => link.addEventListener('click', e => { e.preventDefault(); showToast('Trang "Cài đặt hệ thống" đang được phát triển', 'info'); }));
    const bellBtn = document.getElementById('header-bell-btn'), bellPanel = document.getElementById('header-bell-panel'), bellDot = document.getElementById('header-bell-dot');
    if (bellBtn && bellPanel) {
      bellBtn.addEventListener('click', e => { e.stopPropagation(); bellPanel.classList.toggle('hidden'); if (bellDot) bellDot.classList.add('hidden'); });
      document.addEventListener('click', e => { if (!bellPanel.classList.contains('hidden') && !bellPanel.contains(e.target) && e.target !== bellBtn) bellPanel.classList.add('hidden'); });
    }
    initGlobalSearch();
    updateSidebarBadge();
    setupHeaderProfile();
  });

  window.addEventListener(EVENT_NAME, updateSidebarBadge);
})();