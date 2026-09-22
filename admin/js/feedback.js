/* SkillSwap Admin - FEEDBACK / REPORTS */
(function(){
'use strict';

const tabs = ['tab-reports', 'tab-disputes', 'tab-reviews'];
let activeTicketId = null;

function renderFeedback() {
  const data = AdminStore.data.feedback || [];
  const cards = [...document.querySelectorAll('.ticket-card')];

  cards.forEach((card, i) => {
    const item = data[i] || data.find(x => x.ticket === card.dataset.ticket);
    if (!item) return;
    card.dataset.feedbackId = item.id;
    const resolved = item.status !== 'pending';

    card.classList.toggle('opacity-50', resolved);
    const badge = card.querySelector('.ticket-status-badge');
    if (badge) badge.textContent = resolved ? 'Đã xử lý' : 'Đang chờ';
  });

  const reviewCards = document.querySelectorAll('#ai-review-queue .grid > div');
  reviewCards.forEach((card, i) => {
    const item = data[i];
    if (item && item.status !== 'pending') {
      card.style.opacity = '.45';
      card.style.pointerEvents = 'none';
    }
  });

  const count = data.filter(x => x.status === 'pending').length;
  document.querySelectorAll('[data-pending-feedback-count]').forEach(e => e.textContent = count);
}

function resolveTicket(status, message) {
  const active = document.querySelector('.ticket-card.ring-2') || document.querySelector('.ticket-card');
  if (!active) return;
  const item = AdminStore.data.feedback.find(x => x.id === active.dataset.feedbackId || x.ticket === active.dataset.ticket);
  if (item) {
    AdminStore.updateItem('feedback', item.id, { status, resolvedAt: new Date().toISOString() });
    showToast(message);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderFeedback();

  tabs.forEach(id => document.getElementById(id)?.addEventListener('click', function () {
    tabs.forEach(x => {
      const b = document.getElementById(x);
      b?.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-bold');
      b?.classList.add('text-on-surface-variant');
    });
    this.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm', 'font-bold');
    this.classList.remove('text-on-surface-variant');
  }));

  document.querySelectorAll('.ticket-card').forEach(card => card.addEventListener('click', () => {
    document.querySelectorAll('.ticket-card').forEach(c => c.classList.remove('ring-2', 'ring-primary-container', 'shadow-md'));
    card.classList.add('ring-2', 'ring-primary-container', 'shadow-md');
    activeTicketId = card.dataset.feedbackId;
    showToast('Đã chọn Ticket ' + card.dataset.ticket, 'info');
  }));

  document.getElementById('ticket-refresh-btn')?.addEventListener('click', () => {
    renderFeedback();
    showToast('Đã làm mới và đồng bộ hàng đợi');
  });

  document.getElementById('ticket-filter-btn')?.addEventListener('click', () => showToast('Đang hiển thị các ticket có mức độ ưu tiên cao nhất', 'info'));
  document.getElementById('judgment-log-btn')?.addEventListener('click', () => showToast('Có ' + AdminStore.data.feedback.filter(x => x.status !== 'pending').length + ' vụ việc đã được phán quyết', 'info'));

  // Quyết định trọng tài
  document.getElementById('judgment-hide-btn')?.addEventListener('click', () => resolveTicket('hidden', 'Đã ẩn & hủy bỏ đánh giá 1 sao'));
  document.getElementById('judgment-warn-btn')?.addEventListener('click', () => resolveTicket('warned', 'Đã giữ nguyên đánh giá & phát thư cảnh cáo'));
  document.getElementById('judgment-penalty-btn')?.addEventListener('click', () => resolveTicket('penalized', 'Đã áp dụng hình phạt trừ 50 điểm tín nhiệm & cấm ghép đôi 3 ngày'));
  document.getElementById('judgment-reschedule-btn')?.addEventListener('click', () => resolveTicket('resolved', 'Đã hòa giải thành công và xếp lịch học bù tự động'));

  // AI Review Moderation Queue Buttons
  document.querySelectorAll('#ai-review-queue button').forEach(btn => {
    btn.addEventListener('click', function () {
      const text = this.textContent.trim();
      const card = this.closest('.p-space-md');
      if (text.includes('Duyệt')) {
        card.style.opacity = '0.4';
        showToast('Đã duyệt hiển thị công khai nhận xét');
      } else if (text.includes('Ẩn')) {
        card.style.opacity = '0.4';
        showToast('Đã ẩn vĩnh viễn nhận xét vi phạm');
      } else if (this.title?.includes('Cảnh báo')) {
        showToast('Đã gửi thông báo cảnh cáo tới tác giả bài viết', 'info');
      }
    });
  });

  document.getElementById('header-create-notif-btn')?.addEventListener('click', () => location.href = 'content.html#compose');
});

window.addEventListener(AdminStore.EVENT_NAME, renderFeedback);
})();