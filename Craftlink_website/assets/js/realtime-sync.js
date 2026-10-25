/**
 * CraftLink - Real-time Cross-Role Data Synchronization Hub (realtime-sync.js)
 * Tính năng Mở rộng 1 (+0.25 đến +0.50 điểm):
 * - Đồng bộ dữ liệu liên thông thời gian thực giữa các Role
 * - Sử dụng BroadcastChannel kết hợp window.addEventListener('storage')
 * - Khi Buyer gửi yêu cầu ở Tab 1 -> Màn hình Maker/Seller ở Tab 2 tự động cập nhật ngay lập tức
 * - Khi Maker cập nhật báo giá/tiến độ -> Tab Buyer tự động cập nhật trạng thái đơn
 */

(function () {
  'use strict';

  const CHANNEL_NAME = 'craftlink_realtime_sync_channel';
  const STORAGE_TRIGGER_KEY = 'craftlink_realtime_sync_trigger';

  // 1. Khởi tạo BroadcastChannel (hỗ trợ các trình duyệt hiện đại)
  const channel = ('BroadcastChannel' in window) ? new BroadcastChannel(CHANNEL_NAME) : null;

  // 2. Hàm phát thông điệp đồng bộ cho các tab khác
  function broadcast(type, payload = {}) {
    const message = {
      type,
      payload,
      timestamp: Date.now(),
      sender: window.location.pathname
    };

    // Cách 1: Gửi qua BroadcastChannel
    if (channel) {
      try {
        channel.postMessage(message);
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }
    }

    // Cách 2: Kích hoạt sự kiện 'storage' liên tab (chuẩn W3C tương thích 100%)
    try {
      localStorage.setItem(STORAGE_TRIGGER_KEY, JSON.stringify(message));
    } catch (err) {}
  }

  // 3. Hiển thị thông báo Toast real-time sống động
  function showRealtimeToast(title, message, icon = 'sync_alt', accentColor = '#3B6E4C') {
    let container = document.getElementById('craftlink-realtime-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'craftlink-realtime-toast-container';
      container.style.cssText = 'position: fixed; top: 24px; right: 24px; z-index: 9999999; display: flex; flex-direction: column; gap: 10px; pointer-events: none; max-width: 400px; width: calc(100vw - 48px);';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'craftlink-realtime-toast';
    toast.style.cssText = `
      pointer-events: auto;
      background: #FFFFFF;
      color: #1B1C19;
      border-left: 5px solid ${accentColor};
      border-radius: 14px;
      box-shadow: 0 12px 36px rgba(0,0,0,0.22);
      padding: 14px 18px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      transform: translateX(120%);
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      border-top: 1px solid rgba(0,0,0,0.06);
      border-right: 1px solid rgba(0,0,0,0.06);
      border-bottom: 1px solid rgba(0,0,0,0.06);
    `;

    // Nếu đang ở Dark Mode
    if (document.documentElement.getAttribute('data-theme') === 'dark' || document.documentElement.classList.contains('dark')) {
      toast.style.background = '#1A241F';
      toast.style.color = '#F0F6F2';
      toast.style.borderTopColor = '#28382F';
      toast.style.borderRightColor = '#28382F';
      toast.style.borderBottomColor = '#28382F';
      toast.style.boxShadow = '0 12px 36px rgba(0,0,0,0.5)';
    }

    toast.innerHTML = `
      <div style="width: 38px; height: 38px; border-radius: 10px; background: ${accentColor}18; color: ${accentColor}; display: flex; align-items: center; justify-content: center; shrink-0;">
        <span class="material-symbols-outlined" style="font-size: 22px;">${icon}</span>
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
          <h5 style="margin: 0; font-size: 13px; font-weight: 700; color: inherit;">${title}</h5>
          <span style="font-size: 10px; padding: 2px 6px; border-radius: 9999px; background: ${accentColor}22; color: ${accentColor}; font-weight: 700; text-transform: uppercase;">Realtime</span>
        </div>
        <p style="margin: 3px 0 0; font-size: 12px; color: #667085; line-height: 1.4;">${message}</p>
      </div>
    `;

    container.appendChild(toast);

    // Kích hoạt animation trượt vào
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
    });

    // Tự biến mất sau 4 giây
    setTimeout(() => {
      toast.style.transform = 'translateX(120%)';
      toast.style.opacity = '0';
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 400);
    }, 4500);
  }

  // 4. Xử lý thông điệp nhận được từ Tab khác
  function handleIncomingSync(data) {
    if (!data || !data.type) return;

    // Phát custom event cho các module trên trang hiện tại tự bắt
    window.dispatchEvent(new CustomEvent('craftlink:realtime-sync', { detail: data }));

    const isSellerPage = window.location.pathname.includes('/seller/');
    const isBuyerOrdersPage = window.location.pathname.includes('buyer-orders.html');

    // Tình huống 1: Khách hàng Buyer vừa tạo Brief mới ở Tab 1
    if (data.type === 'NEW_BRIEF' || data.type === 'BRIEF_CREATED') {
      if (isSellerPage) {
        showRealtimeToast(
          'Yêu Cầu Tùy Biến Mới!',
          `Khách hàng vừa gửi Brief: <b>"${data.payload.title || 'Mẫu mới'}"</b>. Danh sách đã tự cập nhật!`,
          'notification_important',
          '#B85B3A'
        );
        // Tự động render lại danh sách của Maker
        if (typeof window.renderBriefs === 'function') {
          window.renderBriefs();
        }
      }
    }

    // Tình huống 2: Maker vừa cập nhật trạng thái đơn (báo giá, đang làm, từ chối)
    if (data.type === 'STATUS_UPDATED' || data.type === 'PROPOSAL_SENT') {
      if (isBuyerOrdersPage) {
        showRealtimeToast(
          'Tiến Độ Đơn Hàng Cập Nhật!',
          `Nghệ nhân vừa cập nhật đơn: <b>"${data.payload.title || data.payload.id || ''}"</b> sang trạng thái mới.`,
          'verified',
          '#3B6E4C'
        );
        // Tự động render lại danh sách đơn hàng Buyer
        if (typeof window.renderOrders === 'function') {
          window.renderOrders();
        }
      }
    }
  }

  // 5. Lắng nghe qua BroadcastChannel
  if (channel) {
    channel.onmessage = (event) => {
      handleIncomingSync(event.data);
    };
  }

  // 6. LẮNG NGHE SỰ KIỆN STORAGE LIÊN TAB (YÊU CẦU MỞ RỘNG 1)
  window.addEventListener('storage', (event) => {
    // Khi key kích hoạt đồng bộ thay đổi
    if (event.key === STORAGE_TRIGGER_KEY && event.newValue) {
      try {
        const data = JSON.parse(event.newValue);
        handleIncomingSync(data);
      } catch (e) {}
    }

    // Hoặc khi danh sách 'craftlink_briefs' thay đổi trực tiếp
    if (event.key === 'craftlink_briefs') {
      if (window.location.pathname.includes('/seller/') && typeof window.renderBriefs === 'function') {
        window.renderBriefs();
        showRealtimeToast('Đồng Bộ Dữ Liệu', 'Dữ liệu yêu cầu vừa được đồng bộ từ Tab Khách hàng.', 'sync', '#3B6E4C');
      }
      if (window.location.pathname.includes('buyer-orders.html') && typeof window.renderOrders === 'function') {
        window.renderOrders();
        showRealtimeToast('Đồng Bộ Dữ Liệu', 'Dữ liệu đơn hàng vừa được cập nhật thời gian thực.', 'sync', '#3B6E4C');
      }
    }
  });

  // 7. Xuất API toàn cục để các trang dễ dàng kích hoạt
  window.CraftlinkSync = {
    // Gọi khi Buyer tạo brief
    notifyBriefCreated: (brief) => {
      broadcast('NEW_BRIEF', {
        id: brief.id,
        title: brief.title,
        budget: brief.budget,
        category: brief.category
      });
    },

    // Gọi khi Maker/Buyer cập nhật trạng thái
    notifyStatusChanged: (briefId, newStatus, title) => {
      broadcast('STATUS_UPDATED', {
        id: briefId,
        newStatus,
        title
      });
    },

    toast: showRealtimeToast
  };
})();
