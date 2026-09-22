/* SkillSwap Admin - CONTENT / BROADCAST / STORIES */
(function(){
'use strict';

const esc = v => String(v ?? '').replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));
let currentNotifFilter = 'all'; // all | active | scheduled

function toggleComposer() {
  const f = document.getElementById('quick-broadcast-form');
  if (!f) return;
  f.classList.toggle('hidden');
  if (!f.classList.contains('hidden')) {
    f.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    document.getElementById('composer-title-input')?.focus();
  }
}

function resetComposer() {
  const t = document.getElementById('composer-title-input'), b = document.getElementById('composer-body-textarea');
  if (t) t.value = '';
  if (b) b.value = '';
}

function renderNotifications() {
  const tbody = document.getElementById('notifications-list');
  if (!tbody) return;
  const data = AdminStore.data.notifications || [];

  tbody.innerHTML = data.slice().reverse().map(n => {
    const status = n.status === 'active'
      ? ['Đang hiển thị', 'bg-primary-fixed text-primary']
      : n.status === 'published'
      ? ['Đã gửi', 'bg-tertiary-fixed text-on-tertiary-fixed']
      : ['Đã lên lịch', 'bg-secondary-fixed text-on-secondary-fixed'];

    return `<tr class="hover:bg-surface-container-low/60 transition-all" data-notification-id="${esc(n.id)}" data-notif-status="${esc(n.status)}"><td class="py-space-md px-space-lg"><div class="flex flex-col"><span class="font-label-lg text-label-lg font-bold text-on-surface cursor-pointer hover:text-primary">${esc(n.title)}</span><div class="flex items-center gap-space-xs mt-1"><span class="px-space-xs py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm">${esc(n.category || 'Thông báo')}</span><span class="font-label-sm text-on-surface-variant">ID: #${esc(n.id)}</span></div></div></td><td class="py-space-md px-space-md"><div class="flex items-center gap-1.5 flex-wrap">${(n.channels || ['In-app']).map(ch => `<span class="inline-flex items-center gap-1 px-space-xs py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm"><span class="material-symbols-outlined text-[14px] text-primary">campaign</span>${esc(ch)}</span>`).join('')}</div></td><td class="py-space-md px-space-md"><div class="flex items-center gap-1 font-label-md text-on-surface"><span class="material-symbols-outlined text-[16px] text-on-surface-variant">groups</span><span>${esc(n.audience || 'Toàn bộ người dùng')}</span></div></td><td class="py-space-md px-space-md"><div class="flex flex-col"><span class="font-label-md text-label-md font-bold text-on-surface">${esc(n.schedule || 'Gửi ngay')}</span><span class="font-label-sm text-on-surface-variant">Tạo: ${new Date(n.createdAt).toLocaleString('vi-VN')}</span></div></td><td class="py-space-md px-space-md"><span class="font-label-sm text-on-surface-variant">${n.status === 'published' ? 'Đã phát sóng' : 'Theo dõi sau khi gửi'}</span></td><td class="py-space-md px-space-md"><span class="inline-flex items-center gap-1 px-space-sm py-1 rounded-full ${status[1]} font-label-sm font-bold"><span class="w-2 h-2 rounded-full bg-current"></span>${status[0]}</span></td><td class="py-space-md px-space-lg text-right"><div class="inline-flex items-center gap-1"><button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary" data-action="preview" title="Xem trước"><span class="material-symbols-outlined text-[18px]">visibility</span></button><button class="p-1.5 rounded-lg text-on-surface-variant hover:text-primary" data-action="edit" title="Chỉnh sửa"><span class="material-symbols-outlined text-[18px]">edit</span></button><button class="p-1.5 rounded-lg text-on-surface-variant hover:text-error" data-action="delete" title="Xóa"><span class="material-symbols-outlined text-[18px]">delete</span></button></div></td></tr>`;
  }).join('') || '<tr><td colspan="7" class="py-10 text-center text-on-surface-variant">Chưa có thông báo nào.</td></tr>';

  filterNotifications();
}

function filterNotifications() {
  const tbody = document.getElementById('notifications-list');
  if (!tbody) return;

  tbody.querySelectorAll('tr[data-notif-status]').forEach(row => {
    const s = row.dataset.notifStatus;
    let show = true;
    if (currentNotifFilter === 'active') show = (s === 'active' || s === 'published');
    else if (currentNotifFilter === 'scheduled') show = (s === 'scheduled');
    row.classList.toggle('hidden', !show);
  });

  const visibleCount = tbody.querySelectorAll('tr[data-notif-status]:not(.hidden)').length;
  const countBadge = document.querySelector('section.mb-space-xl .flex span.bg-surface-container-high');
  if (countBadge) countBadge.textContent = visibleCount + ' mục';
}

function createNotification() {
  const title = document.getElementById('composer-title-input'), body = document.getElementById('composer-body-textarea');
  if (!title?.value.trim()) {
    showToast('Vui lòng nhập tiêu đề thông báo', 'error');
    title?.focus();
    return;
  }
  const n = AdminStore.createItem('notifications', {
    title: title.value.trim(),
    content: body?.value.trim() || '',
    category: 'Broadcast mới',
    channels: ['In-app Pop-up'],
    audience: 'Toàn bộ người dùng',
    schedule: 'Gửi ngay',
    status: 'published',
    read: false
  });
  resetComposer();
  document.getElementById('quick-broadcast-form')?.classList.add('hidden');
  showToast('Đã tạo và gửi thông báo "' + n.title + '"');
}

function renderStories() {
  const list = document.getElementById('stories-list');
  if (!list) return;

  list.querySelectorAll('[data-dynamic-story="true"]').forEach(e => e.remove());

  (AdminStore.data.stories || []).slice().reverse().forEach(s => {
    const card = document.createElement('div');
    card.dataset.dynamicStory = 'true';
    card.className = 'p-space-md rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm';
    const initials = s.name.split(/\s+/).slice(-2).map(x => x[0]).join('').toUpperCase();

    card.innerHTML = `<div class="flex items-center justify-between"><span class="px-space-xs py-0.5 rounded-full bg-tertiary-fixed text-tertiary font-label-sm font-bold">Mới thêm</span><div class="flex gap-3"><button class="text-primary font-semibold" data-action="edit-story">Chỉnh sửa</button><button class="text-error font-semibold" data-action="delete-story">Xóa</button></div></div><div class="flex items-start gap-space-md"><div class="w-14 h-14 rounded-2xl bg-primary-fixed flex items-center justify-center font-label-lg font-bold text-primary">${esc(initials)}</div><div><span class="font-label-md font-bold text-on-surface">${esc(s.name)}</span><span class="block font-label-sm text-on-surface-variant">${esc(s.role || 'Thành viên SkillSwap')}</span></div></div><p class="font-body-sm text-on-surface-variant italic bg-surface-container-low p-space-sm rounded-xl">&quot;${esc(s.quote)}&quot;</p>`;

    card.querySelector('[data-action="edit-story"]').onclick = () => {
      const q = prompt('Nội dung câu chuyện mới:', s.quote);
      if (q?.trim()) AdminStore.updateItem('stories', s.id, { quote: q.trim() });
    };

    card.querySelector('[data-action="delete-story"]').onclick = () => {
      if (confirm('Bạn có muốn xóa câu chuyện này?')) AdminStore.deleteItem('stories', s.id);
    };

    list.prepend(card);
  });
}

function createStory() {
  const name = document.getElementById('new-story-name'), quote = document.getElementById('new-story-quote');
  if (!name?.value.trim() || !quote?.value.trim()) {
    showToast('Vui lòng nhập tên nhân vật và nội dung câu chuyện', 'error');
    return;
  }
  AdminStore.createItem('stories', { name: name.value.trim(), quote: quote.value.trim() });
  name.value = ''; quote.value = '';
  document.getElementById('quick-story-form')?.classList.add('hidden');
  document.getElementById('quick-story-form')?.classList.remove('flex');
  showToast('Đã đăng bài viết thành công lên trang chủ');
}

document.addEventListener('DOMContentLoaded', () => {
  renderNotifications();
  renderStories();

  document.getElementById('open-broadcast-btn')?.addEventListener('click', toggleComposer);
  document.getElementById('header-create-notif-btn')?.addEventListener('click', () => {
    if (location.pathname.includes('content.html')) toggleComposer();
    else window.location.href = 'content.html#compose';
  });

  document.getElementById('composer-submit-btn')?.addEventListener('click', createNotification);
  document.getElementById('composer-cancel-btn')?.addEventListener('click', () => {
    resetComposer();
    document.getElementById('quick-broadcast-form')?.classList.add('hidden');
  });
  document.getElementById('close-composer-btn')?.addEventListener('click', () => document.getElementById('quick-broadcast-form')?.classList.add('hidden'));

  document.getElementById('add-story-header-btn')?.addEventListener('click', () => {
    const f = document.getElementById('quick-story-form');
    f?.classList.remove('hidden');
    f?.classList.add('flex');
    f?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  document.getElementById('add-story-btn')?.addEventListener('click', () => {
    const f = document.getElementById('quick-story-form');
    f?.classList.toggle('hidden');
    f?.classList.toggle('flex');
  });

  document.getElementById('cancel-story-btn')?.addEventListener('click', () => {
    document.getElementById('new-story-name').value = '';
    document.getElementById('new-story-quote').value = '';
    document.getElementById('quick-story-form')?.classList.add('hidden');
    document.getElementById('quick-story-form')?.classList.remove('flex');
  });

  document.getElementById('save-story-btn')?.addEventListener('click', createStory);

  document.getElementById('notifications-list')?.addEventListener('click', e => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const row = btn.closest('[data-notification-id]'), id = row?.dataset.notificationId, n = AdminStore.getById('notifications', id);
    if (!n) return;

    if (btn.dataset.action === 'preview') showToast(n.content || n.title, 'info');
    if (btn.dataset.action === 'edit') {
      const t = prompt('Tiêu đề mới:', n.title);
      if (t?.trim()) AdminStore.updateItem('notifications', id, { title: t.trim() });
    }
    if (btn.dataset.action === 'delete' && confirm('Bạn có chắc chắn muốn xóa thông báo này?')) {
      AdminStore.deleteItem('notifications', id);
    }
  });

  if (location.hash === '#compose') toggleComposer();

  // Filter Tabs
  const filterTabs = document.querySelectorAll('section.mb-space-xl .flex.items-center.gap-space-xs button');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('bg-surface-container-lowest', 'text-primary-container', 'shadow-sm');
        t.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      tab.classList.remove('bg-surface-container', 'text-on-surface-variant');
      tab.classList.add('bg-surface-container-lowest', 'text-primary-container', 'shadow-sm');

      const text = tab.textContent.trim();
      if (text.includes('Tất cả')) currentNotifFilter = 'all';
      else if (text.includes('kích hoạt')) currentNotifFilter = 'active';
      else if (text.includes('Lịch')) currentNotifFilter = 'scheduled';

      filterNotifications();
      showToast('Bộ lọc: ' + text, 'info');
    });
  });
});

window.addEventListener(AdminStore.EVENT_NAME, () => {
  renderNotifications();
  renderStories();
});
})();