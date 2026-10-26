# Craft Link - Di sản thủ công Việt

Website e-commerce giới thiệu và bán sản phẩm thủ công Việt Nam (dệt thổ cẩm, gốm mộc, mây tre đan) theo mô hình thương mại công bằng.

## Cấu trúc thư mục

```
├── index.html              # Trang chủ
├── pages/                  # Các trang con
│   ├── buyer-marketplace.html  # Sàn khám phá (Marketplace)
│   ├── buyer-custom-brief.html # Tạo yêu cầu tùy biến (Brief)
│   ├── buyer-orders.html       # Theo dõi đơn hàng & tiến độ
│   ├── product.html            # Chi tiết sản phẩm
│   └── impact.html             # Về chúng tôi & Tác động
├── seller/                 # Phân hệ Người sáng tạo (Maker)
│   ├── dashboard.html          # Bảng điều khiển xưởng & KPI
│   ├── brief-inbox.html        # Hộp thư yêu cầu tùy biến
│   ├── proposal-editor.html    # Soạn đề xuất & báo giá (AI-3 Revision Summarizer)
│   ├── products.html           # Quản lý tác phẩm
│   ├── product-form.html       # Đăng / chỉnh sửa tác phẩm
│   ├── orders.html             # Quản lý đơn hàng
│   ├── order-detail.html       # Chi tiết đơn hàng
│   ├── inventory.html          # Quản lý kho
│   ├── revenue.html            # Báo cáo doanh thu
│   ├── promotions.html         # Khuyến mãi
│   ├── reviews-messages.html   # Đánh giá & tin nhắn
│   ├── shop-profile.html       # Hồ sơ xưởng
│   ├── settings.html           # Cài đặt
│   ├── login.html              # Điều hướng đến trang đăng nhập dùng chung
│   ├── seller.js               # Layout, toast, modal dùng chung
│   ├── seller-data.js          # Dữ liệu và CRUD của kênh người bán
│   └── seller.css              # Style riêng cho kênh người bán
├── assets/
│   ├── css/
│   │   ├── base.css        # Style dùng chung (reset, responsive, scrollbar)
│   │   └── colors.css      # Bảng màu chủ đề (CSS variables)
│   └── js/
│       ├── tailwind-config.js  # Cấu hình theme Tailwind (dùng chung)
│       ├── role-switcher.js    # Widget chuyển đổi vai trò (Buyer/Maker/Moderator/Admin)
│       ├── marketplace.js  # Tương tác trang sàn thương mại (filter, search, pagination)
│       └── product.js      # Tương tác trang sản phẩm (tab switching)
└── docs/
    ├── design-system.md    # Design system (màu, typography, component)
    ├── assignment-craftlink.md   # Đề bài / yêu cầu dự án
    └── mockups/            # Ảnh mockup thiết kế từng trang
```

## Phân hệ Người sáng tạo (Maker)

Các màn hình của nghệ nhân nằm trong `seller/` và dùng chung `assets/css/base.css`, `assets/css/colors.css`, `assets/js/tailwind-config.js`. Mở `seller/dashboard.html` để vào bảng điều khiển; trang đăng nhập dùng chung `pages/login.html`.

Widget chuyển đổi vai trò được nạp tự động từ `assets/js/role-switcher.js`, cho phép chuyển giữa Buyer, Maker, Moderator và Admin.

## Cách chạy

Mở `index.html` trực tiếp bằng trình duyệt, hoặc dùng extension **Live Server** của VS Code để chạy local server.

Lưu ý: trang cần kết nối mạng để tải Tailwind CSS (CDN) và Google Fonts.

## Công nghệ

- HTML + Tailwind CSS (CDN)
- Google Fonts: Playfair Display, Plus Jakarta Sans
- Không cần build, không cần cài đặt dependencies
