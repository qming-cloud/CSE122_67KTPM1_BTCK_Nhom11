# CraftLink - Kênh Người Sáng Tạo (Maker Portal)

> **Học phần:** PHÁT TRIỂN ỨNG DỤNG WEB CƠ BẢN – CSE122  
> **Đề tài:** BTL-11 – CraftLink – Sàn sản phẩm sáng tạo tùy biến (Creator Commerce)  
> **Vai trò triển khai:** Vai trò 2 – Người sáng tạo (Maker / Nghệ nhân)

---

## 📌 Giới thiệu

Thư mục này chứa toàn bộ mã nguồn giao diện Frontend và nghiệp vụ của **Vai trò 2: Người sáng tạo (Maker)** trên nền tảng CraftLink. Hệ thống cho phép nghệ nhân làng nghề quản lý các tác phẩm trưng bày, tiếp nhận yêu cầu đặt làm thủ công theo yêu cầu riêng (Custom Briefs), và soạn thảo đề xuất báo giá (Proposals) tích hợp trí tuệ nhân tạo **AI-3: Revision Summarizer**.

## 📂 Cấu trúc thư mục

```text
CraftLink/
├── seller/
│   ├── dashboard.html          # Bảng điều khiển tổng quan nghệ nhân & thống kê
│   ├── brief-inbox.html        # Giao diện 5: Hộp thư tiếp nhận yêu cầu tùy biến (Brief Inbox)
│   ├── proposal-editor.html    # Giao diện 6: Soạn đề xuất & báo giá tích hợp AI-3 Revision Summarizer
│   ├── products.html           # Giao diện 4: Quản lý danh sách tác phẩm (Listing Management)
│   ├── product-form.html       # Đăng / chỉnh sửa tác phẩm thủ công (CRUD)
│   ├── orders.html             # Quản lý đơn hàng (5 tab trạng thái chuẩn E-commerce)
│   ├── order-detail.html       # Chi tiết hóa đơn và tiến độ giao hàng
│   ├── inventory.html          # Kiểm kê và điều chỉnh tồn kho
│   ├── revenue.html            # Báo cáo doanh thu & rút tiền về tài khoản ngân hàng
│   ├── reviews-messages.html   # Quản lý đánh giá và chat trao đổi với khách
│   ├── promotions.html         # Tạo và quản lý mã giảm giá
│   ├── shop-profile.html       # Hồ sơ câu chuyện làng nghề & chứng nhận WFTO
│   ├── settings.html           # Cài đặt gian hàng
│   ├── login.html              # Đăng nhập kênh người sáng tạo
│   ├── seller-data.js          # Dữ liệu giả lập chuẩn LocalStorage (CRUD đầy đủ)
│   ├── seller.js               # App Shell dùng chung (Sidebar, Header, Toast, Modal, Format VND)
│   └── seller.css              # Tùy biến kiểu dáng kênh người bán
├── assets/
│   ├── css/
│   │   ├── base.css            # Reset CSS & thanh cuộn tùy biến
│   │   └── colors.css          # Hệ màu di sản (Heritage Design Tokens)
│   └── js/
│       └── tailwind-config.js  # Cấu hình Tailwind theme dùng chung
├── maker-listing-management.html # Alias Giao diện 4 theo chuẩn đề bài BTL-11
├── maker-brief-inbox.html        # Alias Giao diện 5 theo chuẩn đề bài BTL-11
└── maker-proposal-editor.html    # Alias Giao diện 6 theo chuẩn đề bài BTL-11
```

## 🚀 Các màn hình nghiệp vụ chính (Tối thiểu 3 màn hình theo Đề bài)

1. **Giao diện 4: Maker Listing Management (`seller/products.html` hoặc `maker-listing-management.html`)**
   - Quản lý danh mục tác phẩm: Thổ cẩm, gốm mộc, mây tre đan, sơn mài.
   - Thao tác CRUD: Thêm mới, chỉnh sửa, xóa/ẩn sản phẩm lưu trực tiếp vào `LocalStorage`.
   - Tìm kiếm theo tên/làng nghề và lọc theo trạng thái (Đang mở bán, Tạm ẩn, Hết hàng).

2. **Giao diện 5: Maker Brief Inbox (`seller/brief-inbox.html` hoặc `maker-brief-inbox.html`)**
   - Hộp thư nhận yêu cầu tùy biến gửi từ khách hàng.
   - Phân loại theo 5 trạng thái nghiệp vụ: Chờ xử lý (`pending`), Cần sửa đổi (`revision_requested`), Đã gửi đề xuất (`proposed`), Đang chế tác (`in_progress`), Đã hoàn thành (`completed`).
   - Xem chi tiết ngân sách, kích thước, chất liệu yêu cầu, hạn chót và ảnh phác thảo của khách.

3. **Giao diện 6: Maker Proposal Editor (`seller/proposal-editor.html` hoặc `maker-proposal-editor.html`)**
   - Soạn thảo đề xuất gửi cho khách hàng dựa trên Brief được chọn.
   - Bóc tách chi phí tự động: Tiền nguyên vật liệu + Công nghệ nhân + Hộp quà di sản $\rightarrow$ Tổng báo giá & đối chiếu ngân sách khách.
   - **Tích hợp AI-3: Revision Summarizer:** Tự động đọc và bóc tách các yêu cầu sửa đổi dài dòng/lộn xộn của khách hàng thành Checklist công việc rõ ràng (Màu sắc, Họa tiết, Kích thước, Tiến độ), có khối giải thích *"Vì sao có kết quả này?"* và xử lý kịch bản lỗi/fallback an toàn.

## 💻 Hướng dẫn chạy thử nghiệm

1. Mở bất kỳ file `.html` nào trực tiếp bằng trình duyệt Web (Chrome, Edge, Firefox), hoặc sử dụng extension **Live Server** trong VS Code.
2. Có thể bắt đầu từ:
   - `seller/login.html`: Bấm nút **"Điền nhanh"** để đăng nhập tài khoản nghệ nhân mẫu.
   - `seller/dashboard.html`: Xem bảng điều khiển tổng quan và các yêu cầu Brief mới.
   - `seller/brief-inbox.html`: Xem danh sách yêu cầu tùy biến.
   - `seller/proposal-editor.html`: Trải nghiệm tính năng AI Revision Summarizer.
