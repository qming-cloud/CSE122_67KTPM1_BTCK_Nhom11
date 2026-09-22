/* SkillSwap Admin - USER MANAGEMENT */
(function(){
'use strict';

let currentInspectedUser = null;
const esc = v => String(v ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));

function findUser(key) {
  if (!key) return null;
  return AdminStore.data.users.find(u => u.id === key || u.email === key || u.id.toLowerCase() === String(key).toLowerCase()) || null;
}

function inspectUser(key) {
  const u = findUser(key);
  if (!u) { showToast('Không tìm thấy dữ liệu người dùng', 'error'); return; }
  currentInspectedUser = u;

  const set = (id, v) => { const e = document.getElementById(id); if (e) e.innerText = v; };
  set('drawerName', u.name);
  set('drawerEmail', u.email);
  set('drawerRating', AdminStore.formatUserRating(u));
  set('drawerCredit', AdminStore.formatUserCredit(u));
  set('drawerKycStatus', u.kyc);

  const badge = document.getElementById('drawerBadge');
  if (badge) badge.style.display = u.badge ? 'inline-block' : 'none';

  const ban = document.getElementById('drawerBanBtn');
  if (ban) {
    ban.innerHTML = (u.isBanned || u.status === 'blocked')
      ? '<span class="material-symbols-outlined text-[18px]">lock_open</span><span>Mở khóa tài khoản</span>'
      : '<span class="material-symbols-outlined text-[18px]">lock</span><span>Khóa tài khoản</span>';
  }

  const teach = document.getElementById('drawerTeachTags'), learn = document.getElementById('drawerLearnTags');
  if (teach) teach.innerHTML = (u.teach || []).map(s => '<span class="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-emerald-800 font-label-sm text-label-sm shadow-sm">' + esc(s) + '</span>').join('');
  if (learn) learn.innerHTML = (u.learn || []).map(s => '<span class="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-orange-900 font-label-sm text-label-sm shadow-sm">' + esc(s) + '</span>').join('');

  const drawer = document.getElementById('sidePreviewDrawer'), table = document.getElementById('tableContainer');
  if (table) { table.classList.remove('xl:col-span-12'); table.classList.add('xl:col-span-8'); }
  if (drawer) { drawer.classList.remove('hidden'); drawer.classList.add('flex'); }
}

function closeDrawer() {
  const d = document.getElementById('sidePreviewDrawer'), t = document.getElementById('tableContainer');
  if (d) { d.classList.add('hidden'); d.classList.remove('flex'); }
  if (t) { t.classList.remove('xl:col-span-8'); t.classList.add('xl:col-span-12'); }
  currentInspectedUser = null;
}

function showModal(title, message, icon, cb) {
  const m = document.getElementById('customModal');
  if (!m) { if (cb && confirm(message)) cb(); return; }
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalBody').innerText = message;
  document.getElementById('modalIcon').innerText = icon || 'info';

  const b = document.getElementById('modalConfirmBtn');
  b.onclick = cb ? () => { cb(); closeModal(); } : null;
  b.classList.toggle('hidden', !cb);

  m.classList.remove('hidden');
  m.classList.add('flex');
}

function closeModal() {
  const m = document.getElementById('customModal');
  if (m) { m.classList.add('hidden'); m.classList.remove('flex'); }
}

function updateUserStatus(id, blocked) {
  AdminStore.updateItem('users', id, { isBanned: blocked, status: blocked ? 'blocked' : 'active' });
}

function toggleUserBan(id, name) {
  const u = findUser(id);
  if (!u) return;
  const blocked = !(u.isBanned || u.status === 'blocked');
  showModal('Xác nhận thay đổi trạng thái', 'Bạn có chắc chắn muốn ' + (blocked ? 'khóa' : 'mở khóa') + ' tài khoản ' + (name || u.name) + ' (' + id + ')?', blocked ? 'lock' : 'lock_open', () => {
    updateUserStatus(id, blocked);
    showToast((blocked ? 'Đã khóa ' : 'Đã mở khóa ') + (name || u.name));
  });
}

function tempBanUser(id, duration) {
  const u = findUser(id);
  if (!u) return;
  showModal('Tạm khóa tài khoản', 'Tài khoản ' + u.name + ' sẽ bị đình chỉ hoạt động trong ' + duration + '.', 'gavel', () => {
    AdminStore.updateItem('users', id, { isBanned: true, status: 'blocked', banDuration: duration, banStartedAt: new Date().toISOString() });
    showToast('Đã tạm khóa ' + u.name + ' trong ' + duration);
  });
}

function verifyKycAction(id, name) {
  showModal('Duyệt định danh CCCD', 'Phê duyệt hồ sơ và cấp xác minh danh tính KYC cho ' + (name || id) + '?', 'verified_user', () => {
    AdminStore.updateItem('users', id, { kyc: 'Đã xác minh KYC', status: 'active' });
    showToast('Đã duyệt xác thực KYC thành công cho ' + (name || id));
  });
}

function openIdViewerModal(id) {
  const u = findUser(id);
  showModal('Hồ sơ CCCD / Bằng cấp điện tử', 'Mã hồ sơ: ' + id + ' - Thành viên: ' + (u ? u.name : '') + '. Giấy tờ minh chứng đã được kiểm tra tính hợp lệ.', 'badge');
}

function viewEvidenceModal(id) {
  const u = findUser(id);
  showModal('Bằng chứng vi phạm', 'Dữ liệu vi phạm của tài khoản ' + (u ? u.name : id) + ' đã được hệ thống ghi lại trong Nhật ký hệ thống.', 'report');
}

function unbanUser(id, name) { toggleUserBan(id, name); }

function grantReputationBadge() {
  if (!currentInspectedUser) return;
  AdminStore.updateItem('users', currentInspectedUser.id, { badge: true });
  showToast('Đã cấp Huy Hiệu Uy Tín cho ' + currentInspectedUser.name);
}

function toggleDrawerBanState() {
  if (currentInspectedUser) toggleUserBan(currentInspectedUser.id, currentInspectedUser.name);
}

function resetUserCredScore() {
  if (!currentInspectedUser) return;
  AdminStore.updateItem('users', currentInspectedUser.id, { credit: 100 });
  showToast('Đã khôi phục điểm tín nhiệm về 100');
}

function createUser(data) {
  const name = (data?.name || '').trim(), email = (data?.email || '').trim();
  if (!name || !email) { showToast('Vui lòng nhập đầy đủ Tên và Email', 'error'); return null; }
  const u = AdminStore.createItem('users', {
    name, email,
    rating: 5.0, completedSessions: 0, credit: 100,
    kyc: 'Chờ xác minh',
    teach: data.teach || [],
    learn: data.learn || [],
    category: data.category || 'it',
    status: 'pending', isBanned: false, badge: false
  });
  showToast('Đã khởi tạo tài khoản mới: ' + u.name);
  return u;
}

function deleteUser(id) {
  const u = findUser(id);
  if (!u) return;
  showModal('Xóa người dùng', 'Bạn có chắc chắn muốn xóa tài khoản ' + u.name + ' khỏi hệ thống?', 'delete', () => {
    AdminStore.deleteItem('users', id);
    if (currentInspectedUser?.id === id) closeDrawer();
    showToast('Đã xóa người dùng ' + u.name);
  });
}

function createUserFromForm() {
  const name = document.getElementById('newUserName'), email = document.getElementById('newUserEmail'), teach = document.getElementById('newUserTeach'), learn = document.getElementById('newUserLearn'), cat = document.getElementById('newUserCategory');
  if (!name?.value.trim() || !email?.value.trim()) { showToast('Vui lòng nhập đầy đủ tên và email', 'error'); return; }
  createUser({
    name: name.value,
    email: email.value,
    teach: teach.value.split(',').map(s => s.trim()).filter(Boolean),
    learn: learn.value.split(',').map(s => s.trim()).filter(Boolean),
    category: cat.value
  });
  [name, email, teach, learn].forEach(e => { if (e) e.value = ''; });
  document.getElementById('createUserModal')?.classList.add('hidden');
}

function renderUsers() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;
  const users = AdminStore.data.users || [];

  tbody.innerHTML = users.map(u => {
    const blocked = u.isBanned || u.status === 'blocked', pending = u.status === 'pending';
    const initials = u.name.split(/\s+/).slice(-2).map(x => x[0]).join('').toUpperCase();
    const statusText = blocked ? 'Bị khóa' : pending ? 'Chờ xác minh' : 'Hoạt động';
    const statusClass = blocked ? 'bg-red-100 text-red-900' : pending ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800';
    
    return `<tr class="hover:bg-surface-container-low/60 transition-all duration-200 group ${blocked ? 'opacity-85' : ''}" data-user-id="${esc(u.id)}" data-search-text="${esc([u.id, u.name, u.email, u.status, u.kyc, ...(u.teach || []), ...(u.learn || [])].join(' '))}"><td class="py-space-md px-space-md text-center"><input class="row-checkbox w-4 h-4 rounded text-primary-container accent-primary-container cursor-pointer" type="checkbox"></td><td class="py-space-md px-space-md"><div class="flex items-center gap-space-sm"><div class="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold shadow-sm">${initials}</div><div class="flex flex-col"><div class="flex items-center gap-1.5"><span class="font-headline-sm text-[16px] text-on-surface font-bold ${blocked ? 'line-through decoration-error' : ''}">${esc(u.name)}</span><span class="material-symbols-outlined text-[16px] ${pending ? 'text-secondary' : 'text-primary-container'}">${pending ? 'badge' : 'verified'}</span></div><span class="font-body-sm text-body-sm text-on-surface-variant">${esc(u.email)}</span><span class="font-label-sm text-label-sm ${pending ? 'text-secondary font-semibold' : 'text-on-surface-variant/80'}">ID: ${esc(u.id)}</span></div></div></td><td class="py-space-md px-space-md"><div class="flex flex-col gap-1.5"><span class="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 font-label-sm flex items-center gap-1"><span class="material-symbols-outlined text-[13px] text-emerald-600">school</span>Dạy: ${esc((u.teach || []).join(', '))}</span><span class="px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-900 font-label-sm flex items-center gap-1"><span class="material-symbols-outlined text-[13px] text-orange-600">psychology</span>Học: ${esc((u.learn || []).join(', '))}</span></div></td><td class="py-space-md px-space-md text-center"><div class="inline-flex flex-col items-center"><span class="font-label-lg text-label-lg font-bold text-on-surface">${u.completedSessions} buổi</span><div class="flex items-center ${Number(u.rating) < 4 ? 'text-error' : 'text-secondary'} font-label-md gap-0.5"><span>${Number(u.rating).toFixed(1)}</span><span class="material-symbols-outlined text-[14px]">star</span></div></div></td><td class="py-space-md px-space-md"><span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusClass} font-label-md"><span class="w-2 h-2 rounded-full ${blocked ? 'bg-error' : pending ? 'bg-[#FEA619]' : 'bg-[#10B981]'}"></span>${statusText}</span></td><td class="py-space-md px-space-md text-right pr-space-lg"><div class="flex items-center justify-end gap-space-xs">${pending ? `<button class="px-space-sm py-1.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-label-md flex items-center gap-1" onclick="verifyKycAction('${u.id}','${esc(u.name)}')" type="button"><span class="material-symbols-outlined text-[16px]">how_to_reg</span>Duyệt hồ sơ</button>` : `<button class="px-space-sm py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md flex items-center gap-1" onclick="inspectUser('${u.id}')" type="button"><span class="material-symbols-outlined text-[16px]">visibility</span>Hồ sơ</button>`}<button class="p-1.5 rounded-xl hover:bg-error-container text-on-surface-variant hover:text-error" onclick="toggleUserBan('${u.id}','${esc(u.name)}')" title="${blocked ? 'Mở khóa' : 'Khóa tài khoản'}" type="button"><span class="material-symbols-outlined text-[18px]">${blocked ? 'lock_open' : 'block'}</span></button><button class="p-1.5 rounded-xl hover:bg-surface-container text-on-surface-variant" onclick="deleteUser('${u.id}')" title="Xóa người dùng" type="button"><span class="material-symbols-outlined text-[18px]">delete</span></button></div></td></tr>`;
  }).join('');

  applyUserFilters();
  updateStats();
}

function applyUserFilters() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;
  const q = (document.getElementById('searchInput')?.value || '').toLowerCase().trim();
  const status = document.getElementById('statusFilter')?.value || 'all';
  const skill = document.getElementById('skillFilter')?.value || 'all';

  tbody.querySelectorAll('tr').forEach(row => {
    const u = findUser(row.dataset.userId);
    if (!u) return;

    let ok = !q || (row.dataset.searchText || '').toLowerCase().includes(q);
    if (status === 'active') ok = ok && !u.isBanned && u.status === 'active';
    if (status === 'pending') ok = ok && u.status === 'pending';
    if (status === 'blocked') ok = ok && (u.isBanned || u.status === 'blocked');
    if (status === 'flagged') ok = ok && Number(u.credit) < 70;
    if (skill !== 'all') ok = ok && u.category === skill;

    row.classList.toggle('hidden', !ok);
  });
}

function updateStats() {
  const users = AdminStore.data.users || [];
  const active = users.filter(u => !u.isBanned && u.status === 'active').length;
  const blocked = users.filter(u => u.isBanned || u.status === 'blocked').length;
  const pending = users.filter(u => u.status === 'pending').length;

  const values = { total: users.length, active, blocked, pending };
  document.querySelectorAll('[data-user-stat]').forEach(e => {
    const k = e.dataset.userStat;
    e.textContent = (values[k] ?? 0).toLocaleString('vi-VN');
  });

  const footer = document.getElementById('user-table-summary');
  if (footer) footer.innerText = 'Hiển thị ' + users.length + ' trong tổng số ' + users.length + ' người dùng hệ thống';
}

function updateCounter() {
  const checked = [...document.querySelectorAll('.row-checkbox:checked')].length;
  const c = document.getElementById('selectionCounter'), n = document.getElementById('selectedNumber');
  if (n) n.innerText = checked;
  if (c) c.classList.toggle('hidden', checked === 0);
}

function confirmBulkBlock() {
  const ids = [...document.querySelectorAll('.row-checkbox:checked')].map(cb => cb.closest('tr')?.dataset.userId).filter(Boolean);
  if (!ids.length) { showToast('Hãy chọn ít nhất 1 người dùng', 'info'); return; }
  showModal('Khóa hàng loạt', 'Bạn có chắc chắn muốn khóa ' + ids.length + ' tài khoản đã chọn?', 'lock', () => {
    ids.forEach(id => AdminStore.updateItem('users', id, { isBanned: true, status: 'blocked' }));
    showToast('Đã khóa thành công ' + ids.length + ' tài khoản');
  });
}

function exportDataToCSV() {
  const rows = AdminStore.data.users || [];
  const csv = ['ID,Tên,Email,Trạng thái,Điểm tín nhiệm', ...rows.map(u => [u.id, u.name, u.email, AdminStore.getUserStatusLabel(u), u.credit].map(v => '"' + String(v).replaceAll('"', '""') + '"').join(','))].join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' }), a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'skillswap-users.csv';
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('Đã xuất danh sách người dùng ra file CSV');
}

document.addEventListener('DOMContentLoaded', () => {
  renderUsers();

  // Bắt tham số từ URL
  const params = new URLSearchParams(window.location.search);
  const statusParam = params.get('status') || params.get('filter');
  if (statusParam && document.getElementById('statusFilter')) {
    document.getElementById('statusFilter').value = statusParam;
    applyUserFilters();
  }

  document.getElementById('searchInput')?.addEventListener('input', applyUserFilters);
  document.getElementById('statusFilter')?.addEventListener('change', applyUserFilters);
  document.getElementById('skillFilter')?.addEventListener('change', applyUserFilters);

  document.getElementById('selectAllCheckbox')?.addEventListener('change', e => {
    document.querySelectorAll('.row-checkbox').forEach(c => {
      if (!c.closest('tr')?.classList.contains('hidden')) c.checked = e.target.checked;
    });
    updateCounter();
  });

  document.getElementById('usersTableBody')?.addEventListener('change', e => {
    if (e.target.matches('.row-checkbox')) updateCounter();
  });

  document.getElementById('create-user-btn')?.addEventListener('click', () => {
    document.getElementById('createUserModal')?.classList.remove('hidden');
    document.getElementById('newUserName')?.focus();
  });

  document.getElementById('create-user-cancel')?.addEventListener('click', () => document.getElementById('createUserModal')?.classList.add('hidden'));
  document.getElementById('create-user-cancel-2')?.addEventListener('click', () => document.getElementById('createUserModal')?.classList.add('hidden'));
  document.getElementById('create-user-save')?.addEventListener('click', createUserFromForm);

  document.getElementById('bulk-notify-btn')?.addEventListener('click', () => {
    const count = [...document.querySelectorAll('.row-checkbox:checked')].length;
    if (!count) { showToast('Vui lòng chọn ít nhất một người dùng', 'info'); return; }
    AdminStore.createItem('notifications', {
      title: 'Thông báo tới nhóm người dùng',
      content: 'Ban quản trị đã gửi thông báo đến ' + count + ' người dùng được chọn.',
      category: 'Thông báo quản trị',
      channels: ['In-app'],
      audience: count + ' người dùng được chọn',
      schedule: 'Gửi ngay',
      status: 'published',
      read: false
    });
    showToast('Đã phát thông báo tới ' + count + ' người dùng');
  });

  document.getElementById('header-create-notif-btn')?.addEventListener('click', () => location.href = 'content.html#compose');
  document.getElementById('drawerBanBtn')?.addEventListener('click', () => currentInspectedUser && toggleUserBan(currentInspectedUser.id, currentInspectedUser.name));
});

window.addEventListener(AdminStore.EVENT_NAME, () => {
  renderUsers();
  if (currentInspectedUser) {
    const latest = findUser(currentInspectedUser.id);
    if (latest) {
      currentInspectedUser = latest;
      inspectUser(latest.id);
    }
  }
});

window.inspectUser = inspectUser;
window.closeDrawer = closeDrawer;
window.showModal = showModal;
window.closeModal = closeModal;
window.toggleUserBan = toggleUserBan;
window.tempBanUser = tempBanUser;
window.verifyKycAction = verifyKycAction;
window.openIdViewerModal = openIdViewerModal;
window.viewEvidenceModal = viewEvidenceModal;
window.unbanUser = unbanUser;
window.grantReputationBadge = grantReputationBadge;
window.toggleDrawerBanState = toggleDrawerBanState;
window.resetUserCredScore = resetUserCredScore;
window.exportDataToCSV = exportDataToCSV;
window.confirmBulkBlock = confirmBulkBlock;
window.createUser = createUser;
window.updateUser = (id, changes) => AdminStore.updateItem('users', id, changes);
window.deleteUser = deleteUser;
})();