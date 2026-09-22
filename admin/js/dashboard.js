/* SkillSwap Admin - DASHBOARD */
(function(){
'use strict';

function animateNumber(el, target) {
  if (!el) return;
  const end = Number(target) || 0, start = Number(el.dataset.value || 0), t0 = performance.now();
  function f(now) {
    const p = Math.min((now - t0) / 350, 1);
    el.textContent = Math.round(start + (end - start) * p).toLocaleString('vi-VN');
    if (p < 1) requestAnimationFrame(f);
    else el.dataset.value = String(end);
  }
  requestAnimationFrame(f);
}

function renderDashboard() {
  const d = AdminStore.data, u = d.users || [], n = d.notifications || [], f = d.feedback || [];
  const values = {
    total: u.length,
    active: u.filter(x => !x.isBanned && x.status === 'active').length,
    blocked: u.filter(x => x.isBanned || x.status === 'blocked').length,
    pending: u.filter(x => x.status === 'pending').length,
    notifications: n.length,
    feedback: f.filter(x => x.status === 'pending').length
  };

  document.querySelectorAll('[data-kpi]').forEach(e => {
    const v = values[e.dataset.kpi];
    if (v !== undefined) animateNumber(e, v);
  });
  document.querySelectorAll('[data-user-count]').forEach(e => e.textContent = u.length.toLocaleString('vi-VN'));
}

function exportReport(format) {
  const data = AdminStore.data;
  if (format.toLowerCase() === 'csv') {
    const rows = ['Loại,ID,Tên/Tiêu đề,Trạng thái'];
    data.users.forEach(x => rows.push(['Người dùng', x.id, x.name, x.status].map(v => '"' + String(v).replaceAll('"', '""') + '"').join(',')));
    data.notifications.forEach(x => rows.push(['Thông báo', x.id, x.title, x.status].map(v => '"' + String(v).replaceAll('"', '""') + '"').join(',')));
    data.feedback.forEach(x => rows.push(['Báo cáo', x.ticket || x.id, x.title, x.status].map(v => '"' + String(v).replaceAll('"', '""') + '"').join(',')));
    
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob(['\ufeff' + rows.join('\n')], { type: 'text/csv;charset=utf-8' }));
    a.download = 'skillswap-admin-report.csv';
    a.click();
    URL.revokeObjectURL(a.href);
  } else {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }));
    a.download = 'skillswap-admin-report.json';
    a.click();
    URL.revokeObjectURL(a.href);
  }
  showToast('Đã xuất báo cáo hệ thống thành công');
}

document.addEventListener('DOMContentLoaded', () => {
  renderDashboard();

  document.querySelectorAll('.range-tab').forEach(tab => tab.addEventListener('click', () => {
    document.querySelectorAll('.range-tab').forEach(t => t.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm'));
    tab.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
    showToast('Đã chuyển mốc thời gian: ' + tab.textContent.trim(), 'info');
  }));

  const exp = document.getElementById('export-report-btn'), menu = document.getElementById('export-report-menu');
  exp?.addEventListener('click', () => menu?.classList.toggle('hidden'));
  document.addEventListener('click', e => {
    if (menu && !menu.classList.contains('hidden') && !menu.contains(e.target) && e.target !== exp && !exp?.contains(e.target)) menu.classList.add('hidden');
  });

  document.querySelectorAll('.export-option').forEach(o => o.addEventListener('click', () => {
    exportReport(o.dataset.format || 'CSV');
    menu?.classList.add('hidden');
  }));

  document.getElementById('header-create-notif-btn')?.addEventListener('click', () => location.href = 'content.html#compose');
  document.getElementById('grant-badge-btn')?.addEventListener('click', () => {
    const u = AdminStore.data.users[0];
    if (u) {
      AdminStore.updateItem('users', u.id, { badge: true });
      showToast('Đã trao Huy Hiệu Cống Hiến cho ' + u.name);
    }
  });

  document.getElementById('feed-view-detail-btn')?.addEventListener('click', () => location.href = 'feedback.html');
  document.getElementById('event-filter-btn')?.addEventListener('click', () => showToast('Đã áp dụng bộ lọc sự kiện thời gian thực', 'info'));
  document.getElementById('view-all-skills-link')?.addEventListener('click', e => {
    e.preventDefault();
    showToast('Đã tải danh sách 124 kỹ năng', 'info');
  });

  // Nút hành động nhanh trong khung Cảnh báo khẩn cấp
  document.querySelectorAll('section.mb-margin .grid button[type="button"]').forEach(btn => {
    const text = btn.textContent.trim();
    btn.addEventListener('click', () => {
      if (text.includes('Xử lý ngay')) {
        showToast('Đang chuyển tới danh sách báo cáo vi phạm...', 'info');
        setTimeout(() => location.href = 'feedback.html', 300);
      } else if (text.includes('Duyệt hồ sơ')) {
        showToast('Đang chuyển đến danh sách xác minh KYC...', 'info');
        setTimeout(() => location.href = 'usermanagement.html?status=pending', 300);
      } else if (text.includes('Hòa giải')) {
        showToast('Đang mở các phiên tranh chấp...', 'info');
        setTimeout(() => location.href = 'feedback.html', 300);
      }
    });
  });
});

window.addEventListener(AdminStore.EVENT_NAME, renderDashboard);
window.exportReport = exportReport;
})();