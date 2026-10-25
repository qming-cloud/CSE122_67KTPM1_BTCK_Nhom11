// Quản lý Modal & Overlay toàn hệ thống Admin / Moderator
window.closeAllModals = function() {
  document.querySelectorAll('.fixed.inset-0.z-50').forEach(function(m) {
    m.classList.add('modal-hidden');
  });
  var p = document.getElementById('notifPanel');
  if (p) p.classList.add('hidden');
};

// Đóng mọi modal đang mở & panel thông báo bằng phím Escape
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    window.closeAllModals();
  }
});

// Đảm bảo click vào vùng backdrop (ngoài dialog) sẽ luôn đóng modal an toàn
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.fixed.inset-0.z-50').forEach(function(modal) {
    modal.addEventListener('click', function(e) {
      // Nếu click trực tiếp vào chính container modal hoặc backdrop overlay
      if (e.target === modal || e.target.classList.contains('backdrop-blur-sm') || e.target.classList.contains('bg-primary/50')) {
        modal.classList.add('modal-hidden');
      }
    });
  });
});

