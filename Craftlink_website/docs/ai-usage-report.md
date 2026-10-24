# Báo Cáo Sử Dụng AI – CraftLink

> **Dự án:** CraftLink – Sàn sản phẩm sáng tạo tùy biến  
> **Học phần:** Phát triển ứng dụng web cơ bản – CSE122  
> **Ngày lập:** 25/10/2026  

---

## 1. Công cụ AI đã sử dụng

| # | Công cụ AI | Phiên bản / Gói | Mục đích sử dụng |
|:---:|---|---|---|
| 1 | **Google Gemini (AI Studio)** | Gemini 2.0 | Sinh giao diện HTML/CSS ban đầu, tạo nội dung mô tả sản phẩm, sinh mock data |
| 2 | **Antigravity IDE (Google)** | Claude Opus 4.6 (Thinking) | Tạo tài liệu dự án (screen-inventory, ai-usage-report), hỗ trợ cấu hình GitHub Pages, viết README |
| 3 | **Tailwind CSS CDN** | v3.x | Framework CSS utility-first (không phải AI, nhưng liệt kê vì đề yêu cầu khai báo công cụ) |

---

## 2. Các câu lệnh prompt chính

### 2.1. Sinh giao diện HTML

| # | Prompt tóm tắt | Kết quả | File áp dụng |
|:---:|---|---|---|
| P-01 | "Tạo trang chủ cho website thủ công mỹ nghệ Việt Nam với hero section, danh mục sản phẩm, chỉ số tác động xã hội, sử dụng Tailwind CSS" | HTML hoàn chỉnh cho trang chủ | `index.html` |
| P-02 | "Tạo trang đăng nhập với form email/password, tab chuyển đăng nhập/đăng ký, login social, animation" | HTML/CSS trang đăng nhập | `pages/login.html` |
| P-03 | "Tạo trang marketplace với sidebar filter (dân tộc, vùng miền, chất liệu, giá), grid sản phẩm, pagination" | HTML + JS marketplace | `pages/buyer-marketplace.html` |
| P-04 | "Tạo form tạo brief tùy biến với validation, AI Brief Builder mô phỏng, modal thành công" | HTML + JS custom brief | `pages/buyer-custom-brief.html` |
| P-05 | "Tạo trang đơn hàng tùy biến với filter theo trạng thái, card đơn hàng, timeline tiến trình" | HTML + JS buyer orders | `pages/buyer-orders.html` |
| P-06 | "Tạo trang chi tiết sản phẩm với gallery ảnh, tab mô tả/review/câu chuyện, bộ đếm số lượng" | HTML + JS product detail | `pages/product.html` |
| P-07 | "Tạo trang impact/about us với số liệu tác động, bản đồ nghệ nhân, timeline, testimonials" | HTML trang impact | `pages/impact.html` |
| P-08 | "Tạo trang giỏ hàng với danh sách sản phẩm, tăng/giảm số lượng, xóa, tính tổng" | HTML + JS giỏ hàng | `pages/buyer-cart.html` |

### 2.2. Sinh dữ liệu & Logic

| # | Prompt tóm tắt | Kết quả | File áp dụng |
|:---:|---|---|---|
| P-09 | "Tạo mock data JSON cho 6 sản phẩm thổ cẩm Việt Nam với tên, giá, ảnh, dân tộc, chất liệu" | Array mockProducts | `assets/js/data.js` |
| P-10 | "Tạo logic filter/search/sort/pagination cho marketplace, kết hợp mock API Postman" | Logic marketplace hoàn chỉnh | `assets/js/thocam.js` |
| P-11 | "Tạo logic tab switching, gallery ảnh, bộ đếm số lượng cho trang chi tiết sản phẩm" | JS tương tác product | `assets/js/product.js` |

### 2.3. Sinh tài liệu

| # | Prompt tóm tắt | Kết quả | File áp dụng |
|:---:|---|---|---|
| P-12 | "Đọc dự án rồi tạo bảng kiểm kê màn hình, sơ đồ user flow, triển khai GitHub Pages, hướng dẫn README, báo cáo AI" | Tài liệu docs hoàn chỉnh | `docs/screen-inventory.md`, `docs/ai-usage-report.md`, `README.md` |

---

## 3. Phần AI sinh ra vs. Phần sinh viên chỉnh sửa

### 3.1. Giao diện HTML/CSS

| Thành phần | AI sinh | Sinh viên chỉnh sửa |
|---|---|---|
| **Cấu trúc HTML** | AI sinh khung HTML semantic cơ bản với các section | SV chỉnh layout, thêm/bớt section, sửa thứ tự, thêm accessibility attributes |
| **Nội dung text** | AI sinh nội dung tiếng Việt mẫu | SV biên tập lại nội dung cho phù hợp ngữ cảnh thổ cẩm Việt |
| **Tailwind classes** | AI sinh classes cơ bản | SV tinh chỉnh responsive breakpoints, hover effects, animation classes |
| **Hình ảnh** | AI gợi ý URL ảnh từ Google Photos (aida-public) | SV chọn lọc ảnh phù hợp, thay ảnh không đúng chủ đề |
| **Color scheme** | AI sinh bảng màu dựa trên mô tả "thủ công Việt, tông trầm ấm" | SV tạo file `colors.css` và `design-system.md` với design tokens chuẩn |

### 3.2. JavaScript

| Thành phần | AI sinh | Sinh viên chỉnh sửa |
|---|---|---|
| **Filter logic** (`thocam.js`) | AI sinh skeleton filter/search | SV viết lại toàn bộ logic filter đa tiêu chí, kết hợp API Postman mock, xử lý edge cases |
| **Form validation** (`buyer-custom-brief.html`) | AI sinh validation cơ bản | SV thêm validation đầy đủ, xử lý localStorage CRUD |
| **Tab/Gallery** (`product.js`) | AI sinh event listeners mẫu | SV chỉnh sửa cho đúng DOM structure thực tế |
| **Cart logic** | AI sinh template | SV implement localStorage cart, tính tổng, cập nhật badge |

### 3.3. Dữ liệu

| Thành phần | AI sinh | Sinh viên chỉnh sửa |
|---|---|---|
| **Mock products** (`data.js`) | AI sinh 6 sản phẩm mẫu | SV chỉnh tên/giá/thông tin cho sát thực tế thổ cẩm Việt |
| **Postman Mock API** | — | SV tự tạo mock API trên Postman với dữ liệu tùy chỉnh |
| **LocalStorage briefs** | AI sinh cấu trúc JSON | SV implement CRUD hoàn chỉnh |

### 3.4. Tài liệu

| Thành phần | AI sinh | Sinh viên chỉnh sửa |
|---|---|---|
| **screen-inventory.md** | AI sinh bảng kiểm kê + sơ đồ Mermaid | SV review và bổ sung thông tin phân công |
| **ai-usage-report.md** | AI sinh khung báo cáo | SV khai báo trung thực nội dung sử dụng |
| **README.md** | AI sinh hướng dẫn | SV bổ sung link triển khai thực tế |
| **design-system.md** | AI sinh design tokens | SV chỉnh giá trị màu/typography cho đúng brand |

---

## 4. Lỗi AI gặp phải

| # | Lỗi | Mô tả | Cách xử lý |
|:---:|---|---|---|
| 1 | **Nội dung không chính xác** | AI sinh tên sản phẩm, tên dân tộc không đúng thực tế Việt Nam | SV tra cứu và sửa lại cho chính xác |
| 2 | **Responsive không hoàn hảo** | AI sinh layout desktop tốt nhưng mobile bị vỡ ở một số breakpoint | SV debug và chỉnh sửa responsive classes |
| 3 | **JavaScript lỗi DOM** | AI sinh JS truy vấn selector không đúng với cấu trúc HTML thực tế | SV debug, sửa selector, test lại |
| 4 | **Ảnh placeholder** | Một số ảnh AI gợi ý không load được hoặc không đúng chủ đề | SV thay bằng ảnh phù hợp |
| 5 | **Filter logic sai** | Logic filter đa tiêu chí ban đầu không kết hợp đúng AND/OR | SV viết lại toàn bộ hàm `applyFilters()` |

---

## 5. Cách sinh viên kiểm chứng

| Phương pháp | Mô tả |
|---|---|
| **Test thủ công trên trình duyệt** | Mở từng trang trên Chrome/Firefox/Safari, test responsive bằng DevTools |
| **Kiểm tra cross-browser** | Test trên Chrome, Firefox, Safari (macOS) |
| **Test responsive** | Dùng Chrome DevTools ở các breakpoint: 375px, 768px, 1024px, 1440px |
| **Validate HTML** | Kiểm tra HTML semantic bằng cách đọc code |
| **Test JavaScript** | Console.log debug, test từng tương tác (click, submit, filter) |
| **Đối chiếu nội dung** | So sánh nội dung AI sinh với thông tin thực tế về thổ cẩm Việt Nam |
| **Code review** | Thành viên nhóm review PR trên GitHub trước khi merge |

---

## 6. Điều sinh viên học được

| # | Bài học |
|:---:|---|
| 1 | AI là **điểm khởi đầu tốt** nhưng không thể thay thế việc hiểu code – phải đọc hiểu từng dòng trước khi dùng |
| 2 | **Nội dung tiếng Việt** đặc thù (tên dân tộc, chất liệu truyền thống) cần kiểm chứng kỹ – AI thường sinh nội dung gần đúng nhưng không chính xác |
| 3 | **Responsive CSS** luôn cần chỉnh tay – AI chưa xử lý tốt edge case trên mobile |
| 4 | **JavaScript tương tác** cần test kỹ trên DOM thực – AI sinh code dựa trên giả định cấu trúc HTML |
| 5 | **Quy trình Git** (branch → commit → PR → review → merge) là kỹ năng quan trọng khi làm việc nhóm |
| 6 | Cần **phân biệt rõ** phần AI hỗ trợ và phần tự làm để khai báo trung thực |

---

## 7. Tính năng Mock vs. API thật

| Tính năng | Mock / API thật | Mô tả |
|---|---|---|
| **Danh sách sản phẩm** | Mock (JSON local + Postman Mock API) | `data.js` cho fallback, Postman mock cho API call |
| **Tạo/Sửa brief** | Mock (LocalStorage) | Lưu vào `localStorage` key `craftlink_briefs` |
| **Đơn hàng** | Mock (hardcoded HTML + localStorage) | Dữ liệu đơn hàng hiển thị trực tiếp trong HTML |
| **Giỏ hàng** | Mock (LocalStorage) | Lưu vào `localStorage` |
| **AI Brief Builder** | Mock (JS timeout + JSON response) | Mô phỏng bằng `setTimeout` + phản hồi định sẵn |
| **AI Style Matcher** | Mock (rule-based filter) | Thuật toán JS lọc theo thuộc tính sản phẩm |
| **AI Revision Summarizer** | Mock (canned response) | Phản hồi text cố định |
| **Đăng nhập** | Mock (client-side only) | Không có xác thực thật, chỉ chuyển trang |

---

## 8. Tuyên bố trung thực

> Nhóm cam kết rằng toàn bộ nội dung trong báo cáo này được khai báo trung thực. AI được sử dụng như công cụ hỗ trợ, không thay thế quá trình học tập. Mỗi thành viên đều hiểu và có khả năng giải thích toàn bộ code trong phần mình phụ trách.
