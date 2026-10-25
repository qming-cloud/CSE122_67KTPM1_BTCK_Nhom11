// Nút đăng xuất ở góc trên phải của thanh điều hướng
function logoutDemo(){
  if (typeof showToast === 'function') {
    showToast('Đã đăng xuất khỏi hệ thống', 'success');
  }
  var isSubPage = window.location.pathname.includes('/pages/');
  var target = isSubPage ? '../../pages/login.html' : '../pages/login.html';
  setTimeout(function(){ location.href = target; }, 350);
}

