(function() {
    const toggleBtn = document.getElementById('togglePasswordBtn');
    const pwdInput = document.getElementById('passwordInput');
    const eyeIcon = document.getElementById('passwordEyeIcon');

    if (toggleBtn && pwdInput && eyeIcon) {
      toggleBtn.addEventListener('click', function() {
        if (pwdInput.type === 'password') {
          pwdInput.type = 'text';
          eyeIcon.textContent = 'visibility_off';
        } else {
          pwdInput.type = 'password';
          eyeIcon.textContent = 'visibility';
        }
      });
    }
  })();
