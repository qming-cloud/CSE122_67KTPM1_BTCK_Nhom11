function togglePasswordPage() {
  const pwdInput = document.getElementById('passwordInput');
  const eyeIcon = document.getElementById('passwordEyeIcon');
  if (pwdInput && eyeIcon) {
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      eyeIcon.textContent = 'visibility_off';
    } else {
      pwdInput.type = 'password';
      eyeIcon.textContent = 'visibility';
    }
  }
}

function showError(inputId, message) {
  const wrapper = document.getElementById(inputId.replace('Input', '-wrapper'));
  const errorMsg = document.getElementById(inputId.replace('Input', '-error'));
  const icon = document.getElementById(inputId.replace('Input', '-icon'));
  
  if (wrapper && errorMsg && icon) {
    wrapper.classList.remove('border-outline-variant/40', 'focus-within:border-primary', 'focus-within:ring-primary/20');
    wrapper.classList.add('border-red-500', 'focus-within:border-red-500', 'focus-within:ring-red-500/20', 'bg-red-50/50');
    
    icon.classList.remove('text-on-surface-variant');
    icon.classList.add('text-red-500');
    
    errorMsg.querySelector('.error-text').textContent = message;
    errorMsg.classList.remove('hidden');
  }
}

function clearError(inputId) {
  const wrapper = document.getElementById(inputId.replace('Input', '-wrapper'));
  const errorMsg = document.getElementById(inputId.replace('Input', '-error'));
  const icon = document.getElementById(inputId.replace('Input', '-icon'));
  
  if (wrapper && errorMsg && icon) {
    wrapper.classList.add('border-outline-variant/40', 'focus-within:border-primary', 'focus-within:ring-primary/20');
    wrapper.classList.remove('border-red-500', 'focus-within:border-red-500', 'focus-within:ring-red-500/20', 'bg-red-50/50');
    
    icon.classList.add('text-on-surface-variant');
    icon.classList.remove('text-red-500');
    
    errorMsg.classList.add('hidden');
  }
}

function validateEmail(email) {
  if (!email) return "Vui lòng nhập địa chỉ email của bạn.";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Địa chỉ email không hợp lệ (VD: ten@truong.edu.vn).";
  return "";
}

function validatePassword(password) {
  if (!password) return "Vui lòng nhập mật khẩu của bạn.";
  if (password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";
  return "";
}

// Real-time validation
document.addEventListener('DOMContentLoaded', () => {
  const emailInput = document.getElementById('emailInput');
  const passwordInput = document.getElementById('passwordInput');

  if (emailInput) {
    emailInput.addEventListener('input', (e) => {
      const error = validateEmail(e.target.value.trim());
      if (error) showError('emailInput', error);
      else clearError('emailInput');
    });
  }

  if (passwordInput) {
    passwordInput.addEventListener('input', (e) => {
      const error = validatePassword(e.target.value);
      if (error) showError('passwordInput', error);
      else clearError('passwordInput');
    });
  }
});

function submitLoginPage(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('emailInput').value.trim();
  const passwordInput = document.getElementById('passwordInput').value;
  
  // Validate before submit
  const emailError = validateEmail(emailInput);
  const passwordError = validatePassword(passwordInput);
  
  if (emailError) showError('emailInput', emailError);
  if (passwordError) showError('passwordInput', passwordError);
  
  if (emailError || passwordError) {
    // Shake animation for the form to indicate error
    const form = document.getElementById('loginPageForm');
    form.classList.add('animate-shake');
    setTimeout(() => form.classList.remove('animate-shake'), 500);
    return;
  }
  
  // Kiểm tra tài khoản
  const user = mockAccounts.find(acc => acc.email === emailInput && acc.password === passwordInput);
  
  if (user) {
    // Save to localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', user.name);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('userAvatar', user.avatar);
    
    const role = user.role || 'student';
    localStorage.setItem('realUserRole', role);
    localStorage.setItem('activePersona', role);
    
    // Sync with admin common.js
    localStorage.setItem('skillswap_current_user', JSON.stringify({
      id: 'USR-' + (user.email === 'admin@skillswap.vn' ? 'ADMIN' : user.name),
      name: user.name,
      email: user.email,
      role: role,
      isLoggedIn: true,
      loginAt: new Date().toISOString()
    }));
    
    if (role === 'admin') {
      window.location.href = 'admin/html/dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
  } else {
    // Thông báo lỗi sai tài khoản mật khẩu
    let errorDiv = document.getElementById('auth-error');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.id = 'auth-error';
      errorDiv.className = 'text-red-500 text-xs font-bold mt-4 text-center bg-red-50 p-3 rounded-xl border border-red-200 flex items-center justify-center gap-2 animate-slideUp';
      
      const form = document.getElementById('loginPageForm');
      form.insertBefore(errorDiv, form.lastElementChild);
    }
    errorDiv.innerHTML = '<span class="material-symbols-outlined text-lg">error</span> <span>Email hoặc Mật khẩu không chính xác. Vui lòng thử lại!</span>';
    
    // Highlight both fields
    showError('emailInput', '');
    showError('passwordInput', '');
  }
}
