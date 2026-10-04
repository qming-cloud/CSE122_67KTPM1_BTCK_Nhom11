# Craft Link - Di sản thủ công Việt

Website e-commerce giới thiệu và bán sản phẩm thủ công Việt Nam (dệt thổ cẩm, gốm mộc, mây tre đan) theo mô hình thương mại công bằng.

## Cấu trúc thư mục

```
├── index.html              # Trang chủ
├── pages/                  # Các trang con
│   ├── thocam.html         # Bộ sưu tập thổ cẩm
│   ├── product.html        # Chi tiết sản phẩm
│   └── impact.html         # Về chúng tôi & Tác động
├── assets/
│   ├── css/
│   │   ├── base.css        # Style dùng chung (reset, scrollbar)
│   │   └── colors.css      # Bảng màu chủ đề (CSS variables)
│   └── js/
│       ├── tailwind-config.js  # Cấu hình theme Tailwind (dùng chung)
│       ├── thocam.js       # Tương tác trang thổ cẩm (price slider)
│       └── product.js      # Tương tác trang sản phẩm (tab switching)
└── docs/
    ├── design-system.md    # Design system (màu, typography, component)
    ├── assignment-craftlink.md   # Đề bài / yêu cầu dự án
    └── mockups/            # Ảnh mockup thiết kế từng trang
```

## Cách chạy

Mở `index.html` trực tiếp bằng trình duyệt, hoặc dùng extension **Live Server** của VS Code để chạy local server.

Lưu ý: trang cần kết nối mạng để tải Tailwind CSS (CDN) và Google Fonts.

## Công nghệ

- HTML + Tailwind CSS (CDN)
- Google Fonts: Playfair Display, Plus Jakarta Sans
- Không cần build, không cần cài đặt dependencies
