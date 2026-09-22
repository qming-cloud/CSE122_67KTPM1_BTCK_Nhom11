let currentUserEmail = localStorage.getItem('userEmail');
let currentData = mockAccounts.filter(acc => acc.email !== currentUserEmail);
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

const activePersona = localStorage.getItem('activePersona');
if (activePersona === 'guest') {
  isLoggedIn = false;
} else if (activePersona === 'student' || activePersona === 'admin') {
  isLoggedIn = true;
  if (!localStorage.getItem('userName')) {
    localStorage.setItem('userName', 'System Admin');
  }
}
let pendingSwapStudent = null;

function updateHeaderState() {
  const avatarImg = document.getElementById('header-avatar-img');
  const onlineDot = document.getElementById('header-online-dot');

  if (isLoggedIn) {
    if (avatarImg) {
      avatarImg.src = localStorage.getItem('userAvatar') || "https://api.dicebear.com/7.x/notionists/svg?seed=User";
      avatarImg.classList.remove('opacity-50', 'grayscale');
    }
    if (onlineDot) {
      onlineDot.classList.replace('bg-slate-300', 'bg-emerald-500');
    }

    if (typeof checkInbox === 'function') checkInbox();

    const userName = localStorage.getItem('userName');
    if (userName && !sessionStorage.getItem('welcomed')) {
      setTimeout(() => showToast(`Xin chào ${userName}! Đăng nhập thành công.`), 500);
      sessionStorage.setItem('welcomed', 'true');
    }
  } else {
    if (avatarImg) {
      avatarImg.src = "https://api.dicebear.com/7.x/notionists/svg?seed=Guest";
      avatarImg.classList.add('opacity-50', 'grayscale');
    }
    if (onlineDot) {
      onlineDot.classList.replace('bg-emerald-500', 'bg-slate-300');
    }
  }
}

function createStudentCard(student) {
  const teachTags = student.teach.map(t => `<span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-xs border border-emerald-300">${t}</span>`).join('');
  const learnTags = student.learn.map(t => `<span class="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-xs border border-amber-300">${t}</span>`).join('');

  const onlineIndicator = student.isOnline ? `<span class="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse"></span>` : ``;

  return `
    <div class="bg-white rounded-3xl border-2 border-on-surface neo-shadow p-6 flex flex-col justify-between relative group hover:-translate-y-1 transition-all">
      <div>
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center gap-3">
            <div class="relative">
              <img alt="${student.name}" class="w-14 h-14 rounded-2xl object-cover border-2 border-on-surface neo-shadow-sm" src="${student.avatar}" />
              ${onlineIndicator}
              <span class="absolute -bottom-1 -right-1 bg-primary text-white p-0.5 rounded-full text-[10px] flex items-center justify-center" title="Đã xác thực email trường">
                <span class="material-symbols-outlined text-xs">verified</span>
              </span>
            </div>
            <div>
              <div class="flex items-center gap-1">
                <h4 class="font-extrabold text-base text-on-surface">${student.name}</h4>
                <span class="text-[10px] font-bold bg-${student.tagColor1}-100 text-${student.tagColor1}-800 px-1.5 py-0.2 rounded">${student.schoolTag}</span>
              </div>
              <p class="text-xs font-bold text-on-surface-variant">${student.schoolName}</p>
              <p class="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                <span class="material-symbols-outlined text-xs text-amber-500" style="font-variation-settings: 'FILL' 1;">star</span>
                <span class="font-extrabold text-slate-800">${student.rating}</span> (${student.swaps} lượt đổi thành công)
              </p>
            </div>
          </div>
        </div>
        <div class="space-y-3 my-4">
          <div>
            <span class="text-[11px] font-black uppercase text-emerald-700 tracking-wider block mb-1.5 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500"></span> DẠY MIỄN PHÍ:
            </span>
            <div class="flex flex-wrap gap-1.5">${teachTags}</div>
          </div>
          <div>
            <span class="text-[11px] font-black uppercase text-amber-700 tracking-wider block mb-1.5 flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-amber-500"></span> MUỐN HỌC:
            </span>
            <div class="flex flex-wrap gap-1.5">${learnTags}</div>
          </div>
        </div>
      </div>
      <div class="pt-3 border-t border-slate-200 flex items-center gap-2">
        <button onclick="openModal('${student.email}', '${student.name}')" class="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-extrabold text-xs border-2 border-on-surface neo-shadow-sm flex items-center justify-center gap-1 transition-transform active:translate-y-0.5">
          <span class="material-symbols-outlined text-sm">swap_horiz</span>
          <span>Gửi Yêu Cầu Đổi Kỹ Năng</span>
        </button>
        <button class="p-2 rounded-xl bg-surface-container hover:bg-surface-container-highest text-on-surface border border-outline-variant" title="Lưu lại">
          <span class="material-symbols-outlined text-base">bookmark</span>
        </button>
      </div>
    </div>
  `;
}

function renderStudents() {
  const container = document.getElementById('student-list-container');
  if (!container) return;
  // Chỉ hiển thị tối đa 3 thẻ trên màn hình
  container.innerHTML = currentData.slice(0, 3).map(createStudentCard).join('');
}

// Modal & Toast Logic
function openModal(studentEmail, studentName) {
  if (!isLoggedIn) {
    window.location.href = 'login.html';
  } else {
    document.getElementById('modal-student-name').textContent = studentName;
    document.getElementById('modal-student-name').dataset.email = studentEmail;
    document.getElementById('modal-message').value = '';
    const modal = document.getElementById('swap-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function submitAuth(event) {
  event.preventDefault();

  const emailInput = document.getElementById('emailInput').value.trim();
  const passwordInput = document.getElementById('passwordInput').value;

  // Kiểm tra tài khoản
  const user = mockAccounts.find(acc => acc.email === emailInput && acc.password === passwordInput);

  if (user) {
    isLoggedIn = true;
    closeAuthModal();

    // Update Header Avatar to show logged in state
    const avatarImg = document.getElementById('header-avatar-img');
    const onlineDot = document.getElementById('header-online-dot');
    if (avatarImg) {
      avatarImg.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuDprvDVi4C988LoOjMIcMJ9Mp1VWTqNSRRf2HBATWSB6R-Mam27Z9QpJ1pBed5P2TIX5aqEaSioClPSkPTZrafsbCJDeDNeHyupTZ-049j98O3GcZ6wUnzHZCi05LV-wOd5SLld7k3cceCV_pskV2q_PcXSPXl7ew639xhQfrifYA2YHK_xquAeNfjT2m3azpBVyi73SZR_mHUERK6hPq-m6gXYep5jXH_ltTWpG0hEl1HUxDlUIwM-4A";
      avatarImg.classList.remove('opacity-50', 'grayscale');
    }
    if (onlineDot) {
      onlineDot.classList.replace('bg-slate-300', 'bg-emerald-500');
    }

    showToast(`Xin chào ${user.name}! Đăng nhập thành công.`);

    if (pendingSwapStudent) {
      setTimeout(() => {
        openModal(pendingSwapStudent);
      }, 500);
    }
  } else {
    // Thông báo lỗi
    const errorDiv = document.getElementById('auth-error') || document.createElement('div');
    errorDiv.id = 'auth-error';
    errorDiv.className = 'text-red-500 text-xs font-bold mt-2 text-center';
    errorDiv.textContent = 'Email hoặc Mật khẩu không chính xác. Vui lòng thử lại!';

    const form = document.getElementById('loginForm');
    if (!document.getElementById('auth-error')) {
      form.insertBefore(errorDiv, form.lastElementChild);
    }
  }
}

function handleAvatarClick(event) {
  event.preventDefault();

  const dropdown = document.getElementById('avatar-dropdown');
  const loggedInView = document.getElementById('dropdown-logged-in');
  const guestView = document.getElementById('dropdown-guest');

  if (dropdown) {
    if (dropdown.classList.contains('hidden')) {
      dropdown.classList.remove('hidden');
      dropdown.classList.add('flex');

      if (isLoggedIn) {
        if (loggedInView) {
          loggedInView.classList.remove('hidden');
          loggedInView.classList.add('flex');
        }
        if (guestView) {
          guestView.classList.remove('flex');
          guestView.classList.add('hidden');
        }

        // Show user info
        const usernameDisplay = document.getElementById('dropdown-username');
        if (usernameDisplay) {
          const userName = localStorage.getItem('userName');
          if (userName) {
            usernameDisplay.textContent = userName;
          }
        }
      } else {
        if (loggedInView) {
          loggedInView.classList.remove('flex');
          loggedInView.classList.add('hidden');
        }
        if (guestView) {
          guestView.classList.remove('hidden');
          guestView.classList.add('flex');
        }
      }
    } else {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('flex');
    }
  }
}

function handleLogout(event) {
  event.preventDefault();
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userAvatar');
  localStorage.removeItem('activePersona');
  localStorage.removeItem('realUserRole');
  localStorage.removeItem('skillswap_current_user');
  sessionStorage.removeItem('welcomed');
  window.location.href = 'login.html';
}

// Đóng dropdown khi click ra ngoài
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('avatar-dropdown');
  if (dropdown && !dropdown.classList.contains('hidden')) {
    const avatarContainer = dropdown.closest('.relative');
    if (avatarContainer && !avatarContainer.contains(e.target)) {
      dropdown.classList.add('hidden');
      dropdown.classList.remove('flex');
    }
  }
});

function togglePassword() {
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

function closeModal() {
  const modal = document.getElementById('swap-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toast-message').textContent = msg;
  toast.classList.remove('translate-y-20', 'opacity-0');

  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 3000);
}

function submitSwapRequest() {
  const targetEmail = document.getElementById('modal-student-name').dataset.email;
  const message = document.getElementById('modal-message').value.trim();

  if (!message) {
    alert("Vui lòng nhập lời nhắn!");
    return;
  }

  const req = {
    id: Date.now().toString(),
    from: currentUserEmail,
    to: targetEmail,
    message: message
  };

  const requests = JSON.parse(localStorage.getItem('swapRequests') || '[]');
  requests.push(req);
  localStorage.setItem('swapRequests', JSON.stringify(requests));

  closeModal();
  showToast("Đã gửi yêu cầu thành công!");
}

// INBOX LOGIC
function getInbox() {
  if (!currentUserEmail) return [];
  const requests = JSON.parse(localStorage.getItem('swapRequests') || '[]');
  return requests.filter(req => req.to === currentUserEmail);
}

function checkInbox() {
  const dot = document.getElementById('header-notification-dot');
  if (!dot) return;
  const requests = getInbox();
  if (requests.length > 0) {
    dot.classList.remove('hidden');
  } else {
    dot.classList.add('hidden');
  }
}

function openInboxModal() {
  if (!isLoggedIn) {
    window.location.href = 'login.html';
    return;
  }
  const modal = document.getElementById('inbox-modal');
  const list = document.getElementById('inbox-list');

  const requests = getInbox();
  if (requests.length === 0) {
    list.innerHTML = '<div class="text-center py-8 text-on-surface-variant text-sm font-medium">Hòm thư trống. Chưa có ai gửi yêu cầu cho bạn.</div>';
  } else {
    list.innerHTML = requests.reverse().map(req => {
      const sender = mockAccounts.find(a => a.email === req.from);
      if (!sender) return '';
      return `
        <div class="p-4 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col gap-3">
          <div class="flex items-center gap-3">
            <img src="${sender.avatar}" class="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p class="font-bold text-sm text-on-surface">${sender.name}</p>
              <p class="text-[11px] text-on-surface-variant">${sender.schoolName}</p>
            </div>
          </div>
          <p class="text-sm font-medium text-on-surface italic bg-white p-3 rounded-xl border border-slate-100">"${req.message}"</p>
          <div class="flex gap-2 pt-2">
            <button onclick="acceptSwap('${req.id}')" class="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1"><span class="material-symbols-outlined text-sm">check</span> Đồng Ý</button>
            <button onclick="rejectSwap('${req.id}')" class="flex-1 py-2 bg-surface hover:bg-surface-container text-on-surface border border-outline-variant rounded-lg text-xs font-bold transition-colors">Từ Chối</button>
          </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeInboxModal() {
  const modal = document.getElementById('inbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

function acceptSwap(reqId) {
  removeRequest(reqId);
  closeInboxModal();
  showToast("Bạn đã đồng ý! Zalo của bạn ấy là: 0987.xxx.xxx");
}

function rejectSwap(reqId) {
  removeRequest(reqId);
  openInboxModal(); // reload list
}

function removeRequest(reqId) {
  let requests = JSON.parse(localStorage.getItem('swapRequests') || '[]');
  requests = requests.filter(r => r.id !== reqId);
  localStorage.setItem('swapRequests', JSON.stringify(requests));
  checkInbox();
}

// Filtering Logic
let isFilterOnline = false;
let isFilterNear = false;
let selectedTeach = '';
let selectedLearn = '';

function applyFilters() {
  currentData = mockAccounts.filter(acc => acc.email !== currentUserEmail).filter(s => {
    if (isFilterOnline && !s.isOnline) return false;
    if (isFilterNear && !s.isNear) return false;
    return true;
  });
  renderStudents();
}

(function () {
  // Update header avatar on load
  updateHeaderState();

  // Setup UI Filters
  const btnOnline = document.getElementById('filter-online');
  const btnNear = document.getElementById('filter-near');

  if (btnOnline) {
    btnOnline.addEventListener('click', () => {
      isFilterOnline = !isFilterOnline;
      if (isFilterOnline) {
        btnOnline.classList.replace('bg-on-surface', 'bg-primary');
      } else {
        btnOnline.classList.replace('bg-primary', 'bg-on-surface');
      }
      applyFilters();
    });
  }

  if (btnNear) {
    btnNear.addEventListener('click', () => {
      isFilterNear = !isFilterNear;
      if (isFilterNear) {
        btnNear.classList.replace('bg-white', 'bg-surface-container-highest');
      } else {
        btnNear.classList.replace('bg-surface-container-highest', 'bg-white');
      }
      applyFilters();
    });
  }

  // First render
  renderStudents();
})();

// Existing Widget Functions
function findMatches() {
  const teachSelect = document.getElementById('calc-teach');
  const learnSelect = document.getElementById('calc-learn');
  if (teachSelect && learnSelect) {
    filterHeroTeach = teachSelect.value;
    filterHeroLearn = learnSelect.value;

    // Tìm matches bằng thuật toán Fuzzy Matching (khớp từ khoá)
    let baseData = mockAccounts.filter(acc => acc.email !== currentUserEmail);

    const teachKeywords = filterHeroTeach.toLowerCase().split(/[\s&]+/);
    const learnKeywords = filterHeroLearn.toLowerCase().split(/[\s&]+/);

    baseData.forEach(s => {
      s.matchScore = 0;

      const studentLearnStr = s.learn.join(' ').toLowerCase();
      const studentTeachStr = s.teach.join(' ').toLowerCase();

      // Bạn DẠY môn X -> Sinh viên đó CẦN HỌC môn X
      if (filterHeroTeach) {
        teachKeywords.forEach(kw => {
          if (kw.length >= 2 && studentLearnStr.includes(kw)) s.matchScore += 2;
        });
      }

      // Bạn HỌC môn Y -> Sinh viên đó CÓ THỂ DẠY môn Y
      if (filterHeroLearn) {
        learnKeywords.forEach(kw => {
          if (kw.length >= 2 && studentTeachStr.includes(kw)) s.matchScore += 2;
        });
      }
    });

    // Sắp xếp điểm tương thích giảm dần
    baseData.sort((a, b) => b.matchScore - a.matchScore);

    // Lấy top 2 người có điểm cao nhất
    const topMatches = baseData.slice(0, 2);

    const resultsContainer = document.getElementById('hero-match-results');
    const cardsContainer = document.getElementById('hero-match-cards');
    const notificationBox = document.getElementById('hero-match-notification');

    if (resultsContainer && cardsContainer) {
      cardsContainer.innerHTML = topMatches.map(createStudentCard).join('');

      // Không ẩn box notification để user có thể tiếp tục chọn kỹ năng và bấm Ghép Cặp
      if (notificationBox) {
        notificationBox.classList.remove('hidden');
      }
      resultsContainer.classList.remove('hidden');
    }

    // Đồng thời cập nhật danh sách ở bên dưới
    applyFilters();
  }
}

function updateSwapMatches() {
  const teachElem = document.getElementById('calc-teach');
  const learnElem = document.getElementById('calc-learn');
  if (teachElem) selectedTeach = teachElem.value;
  if (learnElem) selectedLearn = learnElem.value;

  const title = document.getElementById('calc-results-title');
  const sub = document.getElementById('calc-results-sub');

  const counts = {
    "IELTS Speaking 7.0+ & Pitching": 28,
    "Phân tích Báo cáo Tài chính & DCF": 19,
    "Xây kênh TikTok 100k Followers": 34,
    "Viết CV & Luyện Mock Interview": 22,
    "Thiết kế Slide thuyết trình Notion/Canva": 16,
    "Nhiếp ảnh & Chụp ảnh chân dung": 15
  };

  if (learnElem && title && sub) {
    const count = counts[selectedLearn] || 25;
    title.textContent = `Có ${count} bạn sinh viên sẵn sàng trao đổi ${selectedLearn.split('&')[0]} ngay hôm nay!`;
    sub.textContent = `Đã tìm thấy bạn học tương thích tại Bách Khoa, Ngoại Thương, RMIT và NEU.`;
  }

  applyFilters();
}

function toggleSwapValues() {
  if (event && event.currentTarget) {
    const btn = event.currentTarget;
    btn.classList.add('rotate-180');
    setTimeout(() => btn.classList.remove('rotate-180'), 400);
  }
  updateSwapMatches();
}

// ScrollSpy & Nav Click Logic
function initScrollSpy() {
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');
  if (navLinks.length === 0) return;

  const targetIds = Array.from(navLinks).map(link => link.getAttribute('href').substring(1));
  const sections = targetIds.map(id => document.getElementById(id)).filter(el => el !== null);

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  let currentActiveId = null;
  let isClickScrolling = false;

  function updateActiveNav(activeId) {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.remove('text-on-surface-variant', 'hover:text-on-surface', 'hover:bg-surface-container');
        link.classList.add('bg-primary/10', 'text-primary');
      } else {
        link.classList.remove('bg-primary/10', 'text-primary');
        link.classList.add('text-on-surface-variant', 'hover:text-on-surface', 'hover:bg-surface-container');
      }
    });
  }

  // Handle clicks to smoothly scroll and update UI
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const id = href.substring(1);
      const targetElement = document.getElementById(id);

      if (targetElement) {
        e.preventDefault();
        currentActiveId = id;
        updateActiveNav(id);

        isClickScrolling = true;

        const headerPlaceholder = document.getElementById('header-placeholder');
        const headerOffset = (headerPlaceholder ? headerPlaceholder.offsetHeight : 64) + 16;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        if (history.pushState) {
          history.pushState(null, '', `#${id}`);
        } else {
          location.hash = `#${id}`;
        }

        setTimeout(() => {
          isClickScrolling = false;
        }, 800);
      }
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !isClickScrolling) {
        const id = entry.target.id;
        if (currentActiveId !== id) {
          currentActiveId = id;
          updateActiveNav(id);
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // Initial check
  setTimeout(() => {
    if (isClickScrolling) return;
    let bestMatch = null;
    let minDiff = Infinity;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const diff = Math.abs(rect.top);
      if (diff < minDiff) {
        minDiff = diff;
        bestMatch = section.id;
      }
    });
    if (bestMatch && !currentActiveId) {
      currentActiveId = bestMatch;
      updateActiveNav(bestMatch);
    }
  }, 100);
}

// Khởi chạy ScrollSpy ngay khi main.js load
initScrollSpy();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollSpy);
}
setTimeout(initScrollSpy, 300);
setTimeout(initScrollSpy, 800);

