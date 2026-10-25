# 🧶 CraftLink – Sàn Sản Phẩm Sáng Tạo Tùy Biến

<p align="center">
  <strong>Di sản thủ công Việt • Creator Commerce Platform</strong><br/>
  Kết nối nghệ nhân dân tộc thiểu số Việt Nam với người yêu handmade toàn cầu
</p>

---

## 📋 Thông tin dự án

| | |
|---|---|
| **Học phần** | Phát triển ứng dụng web cơ bản – CSE122 |
| **Đề tài** | BTL-11 – CraftLink |
| **Loại** | Web Frontend (nguyên mẫu) |
| **Nhóm** | 3 sinh viên |

## 🌐 Demo trực tuyến

🔗 **GitHub Pages:** [https://KhanhNguyen3010.github.io/CSE_BTCK_2551170903/](https://KhanhNguyen3010.github.io/CSE_BTCK_2551170903/)

> Nếu link trên chưa hoạt động, hãy làm theo hướng dẫn bên dưới để bật GitHub Pages.

---

## 🚀 Hướng dẫn chạy cục bộ (Local Development)

### Yêu cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Không cần cài đặt Node.js hay bất kỳ backend nào

### Cách 1: Mở trực tiếp (Đơn giản nhất)

```bash
# Clone repository
git clone https://github.com/KhanhNguyen3010/CSE_BTCK_2551170903.git
cd CSE_BTCK_2551170903

# Mở file trong trình duyệt
open Craftlink_website/index.html        # macOS
xdg-open Craftlink_website/index.html    # Linux
start Craftlink_website/index.html       # Windows
```

### Cách 2: Dùng Live Server (Khuyến khích)

```bash
# Cài VS Code extension "Live Server" (Ritwick Dey)
# Hoặc dùng npx:
npx -y live-server Craftlink_website --port=3000 --open

# Truy cập: http://localhost:3000
```

### Cách 3: Dùng Python HTTP Server

```bash
cd Craftlink_website
python3 -m http.server 3000

# Truy cập: http://localhost:3000
```

### Cách 4: Dùng Node.js HTTP Server

```bash
npx -y http-server Craftlink_website -p 3000 -o

# Truy cập: http://localhost:3000
```

> **Lưu ý:** Một số tính năng (Mock API, CORS) cần chạy qua HTTP server thay vì mở trực tiếp file.

---

## 🏗️ Triển khai lên GitHub Pages

### Bước 1: Push code lên branch `main`

```bash
git add .
git commit -m "docs: add screen inventory, AI usage report, GitHub Pages config"
git checkout main
git merge feat/buyer
git push origin main
```

### Bước 2: Bật GitHub Pages

1. Vào repository trên GitHub → **Settings** → **Pages**
2. Trong phần **Build and deployment**:
   - **Source:** chọn **GitHub Actions**
3. Workflow sẽ tự động chạy khi push lên `main`
4. Sau khi deploy thành công, truy cập: `https://KhanhNguyen3010.github.io/CSE_BTCK_2551170903/`

### Bước 3 (Tùy chọn): Trigger deploy thủ công

1. Vào tab **Actions** trên GitHub
2. Chọn workflow **"Deploy to GitHub Pages"**
3. Click **"Run workflow"** → chọn branch `main` → **"Run workflow"**

---

## 📁 Cấu trúc dự án

```
Craftlink-web/
├── index.html                              ← Redirect → Craftlink_website/
├── README.md                               ← Hướng dẫn (file này)
├── .github/workflows/deploy.yml            ← GitHub Actions auto-deploy
│
└── Craftlink_website/
    ├── index.html                          ← Trang chủ
    ├── pages/
    │   ├── login.html                      ← Đăng nhập / Đăng ký
    │   ├── buyer-marketplace.html          ← Sàn Khám Phá
    │   ├── buyer-custom-brief.html         ← Tạo Yêu Cầu Tùy Biến
    │   ├── buyer-orders.html               ← Đơn Hàng Tùy Biến
    │   ├── buyer-cart.html                 ← Giỏ Hàng
    │   ├── product.html                    ← Chi Tiết Sản Phẩm
    │   └── impact.html                     ← Về Chúng Tôi & Tác Động
    ├── assets/
    │   ├── css/
    │   │   ├── colors.css                  ← Design tokens (màu)
    │   │   └── base.css                    ← Typography
    │   └── js/
    │       ├── data.js                     ← Mock data sản phẩm
    │       ├── thocam.js                   ← Logic marketplace
    │       ├── product.js                  ← Logic chi tiết SP
    │       └── tailwind-config.js          ← Cấu hình Tailwind
    └── docs/
        ├── assignment-craftlink.md         ← Đề bài BTL
        ├── design-system.md                ← Hệ thống thiết kế
        ├── screen-inventory.md             ← Bảng kiểm kê màn hình
        ├── ai-usage-report.md              ← Báo cáo sử dụng AI
        └── mockups/                        ← Ảnh mockup
```

---

## 🎭 Vai trò & Màn hình

| Vai trò | Màn hình | Trạng thái |
|---|---|:---:|
| **Dùng chung** | Trang chủ, Đăng nhập, Tác động, Chi tiết SP, Giỏ hàng | ✅ |
| **Khách hàng** | Sàn Khám Phá, Tạo Brief, Đơn hàng, Giỏ hàng | ✅ |
| **Người sáng tạo** | Listing Management, Brief Inbox, Proposal Editor | 🔲 |
| **Kiểm duyệt viên** | Moderation Queue, Report Center, Content Guidelines | 🔲 |
| **Quản trị viên** | Category Mgmt, User Mgmt, Platform Dashboard | 🔲 |

> Chi tiết xem: [`docs/screen-inventory.md`](Craftlink_website/docs/screen-inventory.md)

---

## 🤖 Tính năng AI

| # | Tính năng | Mô tả | Cách mô phỏng |
|:---:|---|---|---|
| AI-1 | **Brief Builder** | Chuyển mô tả tự do → creative brief | JS timeout + JSON response |
| AI-2 | **Style Matcher** | Ghép brief với listing phù hợp | Rule-based filter algorithm |
| AI-3 | **Revision Summarizer** | Tóm tắt revision cần làm | Canned responses |

> Chi tiết xem: [`docs/ai-usage-report.md`](Craftlink_website/docs/ai-usage-report.md)

---

## 🛠️ Công nghệ sử dụng

| Công nghệ | Mục đích |
|---|---|
| **HTML5** | Cấu trúc semantic |
| **Tailwind CSS** (CDN v3) | Styling utility-first |
| **Vanilla JavaScript** | DOM manipulation, events, LocalStorage |
| **Google Material Symbols** | Icon system |
| **Google Fonts** | Playfair Display + Plus Jakarta Sans |
| **Postman Mock API** | API giả lập sản phẩm |
| **LocalStorage** | Lưu trữ briefs, giỏ hàng |
| **GitHub Actions** | Auto-deploy GitHub Pages |

---

## 📖 Tài liệu dự án

| Tài liệu | Đường dẫn |
|---|---|
| Đề bài BTL | [`docs/assignment-craftlink.md`](Craftlink_website/docs/assignment-craftlink.md) |
| Hệ thống thiết kế | [`docs/design-system.md`](Craftlink_website/docs/design-system.md) |
| Bảng kiểm kê màn hình | [`docs/screen-inventory.md`](Craftlink_website/docs/screen-inventory.md) |
| Báo cáo sử dụng AI | [`docs/ai-usage-report.md`](Craftlink_website/docs/ai-usage-report.md) |

---

## 👥 Phân công nhóm

| Thành viên | Vai trò chính | Trách nhiệm chéo |
|---|---|---|
| **SV1** | Khách hàng (Buyer) | Responsive, giao diện dùng chung |
| **SV2** | Người sáng tạo (Maker) | JavaScript, dữ liệu giả lập |
| **SV3** | Kiểm duyệt + Quản trị | Tích hợp, điều hướng, phát hành |

---

## 📝 License

Dự án này được thực hiện cho mục đích học tập tại UIT – Trường Đại học Công nghệ Thông tin, ĐHQG-HCM.