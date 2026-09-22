document.addEventListener('DOMContentLoaded', () => {
  const realUserRole = localStorage.getItem('realUserRole');
  if (realUserRole !== 'admin') return;

  const activePersona = localStorage.getItem('activePersona') || 'admin';
  
  // Inject CSS for the widget
  const style = document.createElement('style');
  style.textContent = `
    .persona-switcher {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 999999;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .persona-btn {
      background: #10b981;
      color: white;
      border: 3px solid #1e293b;
      box-shadow: 4px 4px 0px #1e293b;
      padding: 10px 16px;
      border-radius: 12px;
      font-weight: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    .persona-btn:active {
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0px #1e293b;
    }
    .persona-menu {
      position: absolute;
      bottom: 60px;
      right: 0;
      background: white;
      border: 3px solid #1e293b;
      box-shadow: 4px 4px 0px #1e293b;
      border-radius: 16px;
      width: 240px;
      display: none;
      flex-direction: column;
      overflow: hidden;
    }
    .persona-menu.show {
      display: flex;
    }
    .persona-option {
      padding: 14px 16px;
      font-weight: 700;
      font-size: 14px;
      color: #1e293b;
      border-bottom: 2px solid #e2e8f0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background 0.2s;
    }
    .persona-option:last-child {
      border-bottom: none;
    }
    .persona-option:hover {
      background: #f1f5f9;
    }
    .persona-option.active {
      background: #dcfce7;
      color: #059669;
    }
  `;
  document.head.appendChild(style);

  // Widget Container
  const container = document.createElement('div');
  container.className = 'persona-switcher';

  // Menu
  const menu = document.createElement('div');
  menu.className = 'persona-menu';

  const options = [
    { id: 'admin', label: 'Quản Trị Viên (Admin)', icon: 'shield' },
    { id: 'student', label: 'Sinh Viên (Student)', icon: 'school' },
    { id: 'guest', label: 'Khách (Guest)', icon: 'person_outline' }
  ];

  options.forEach(opt => {
    const item = document.createElement('div');
    item.className = `persona-option ${activePersona === opt.id ? 'active' : ''}`;
    item.innerHTML = `<span class="material-symbols-outlined">${opt.icon}</span> ${opt.label}`;
    item.onclick = () => {
      localStorage.setItem('activePersona', opt.id);
      
      const currentPath = window.location.pathname;
      const isInAdmin = currentPath.includes('/admin/html/');
      
      if (opt.id === 'admin') {
        if (!isInAdmin) {
          // Navigating from main app to admin portal
          window.location.href = 'admin/html/dashboard.html';
        } else {
          window.location.reload();
        }
      } else {
        if (isInAdmin) {
          // Navigating from admin portal to main app
          window.location.href = '../../index.html';
        } else {
          window.location.reload();
        }
      }
    };
    menu.appendChild(item);
  });

  // Toggle Button
  const btn = document.createElement('button');
  btn.className = 'persona-btn';
  const activeOpt = options.find(o => o.id === activePersona) || options[0];
  btn.innerHTML = `<span class="material-symbols-outlined">swap_horiz</span> <span>Góc nhìn: ${activeOpt.label.split(' ')[0]}</span>`;
  
  btn.onclick = () => {
    menu.classList.toggle('show');
  };
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      menu.classList.remove('show');
    }
  });

  container.appendChild(menu);
  container.appendChild(btn);
  document.body.appendChild(container);
});
