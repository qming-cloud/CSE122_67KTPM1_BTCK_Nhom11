# Ảnh sử dụng trong dự án

Toàn bộ ảnh trong 4 trang (logo, avatar, ảnh minh hoạ, ảnh bằng chứng...) hiện đang được host trên CDN của Google
(`lh3.googleusercontent.com`) — đây là các link ảnh gốc do công cụ tạo giao diện sinh ra, không phải ảnh do bạn tải lên.

**Giới hạn kỹ thuật:** môi trường chạy của tôi bị giới hạn mạng (chỉ được phép truy cập một số domain như GitHub, npm, PyPI...),
không truy cập được `lh3.googleusercontent.com`, nên tôi không thể tải các ảnh này về máy để lưu thành file cục bộ trong thư mục
`images/` này.

**Cách xử lý đề xuất:**
1. Xem file `image-manifest.json` — liệt kê đầy đủ 13 link ảnh gốc, dùng ở trang nào, mô tả (alt) là gì.
2. Tự tải ảnh về (bấm chuột phải > Lưu ảnh, hoặc dùng `wget "<url>"`) và đặt vào thư mục `images/` này, đặt tên theo ý bạn
   (ví dụ `images/logo.png`, `images/avatar-mai-anh.jpg`...).
3. Gửi lại tên file cho tôi (hoặc tự thay), tôi sẽ cập nhật thuộc tính `src` trong các file HTML ở thư mục `html/`
   từ link Google CDN sang đường dẫn cục bộ `../images/ten-file.jpg`.

Hiện tại các thẻ `<img>` trong HTML vẫn đang trỏ thẳng đến link Google CDN nên giao diện vẫn hiển thị bình thường,
chỉ là ảnh chưa được lưu vật lý trong thư mục này.
