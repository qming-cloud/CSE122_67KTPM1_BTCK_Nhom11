## MỤC LỤC

1. [Giới thiệu dự án SkillSwap](#1-giới-thiệu-dự-án-skillswap)
2. [Vấn đề thực tế và ý tưởng giải pháp](#2-vấn-đề-thực-tế-và-ý-tưởng-giải-pháp)
3. [Đối tượng người dùng](#3-đối-tượng-người-dùng)
4. [Mục tiêu của website](#4-mục-tiêu-của-website)
5. [Định hướng thiết kế giao diện](#5-định-hướng-thiết-kế-giao-diện)
6. [Cấu trúc và các màn hình chính](#6-cấu-trúc-và-các-màn-hình-chính)
   - 6.1. [Trang chủ](#61-trang-chủ)
   - 6.2. [Dashboard](#62-dashboard)
   - 6.3. [Khám phá](#63-khám-phá)
   - 6.4. [Gợi ý phù hợp](#64-gợi-ý-phù-hợp)
   - 6.5. [Hồ sơ cá nhân](#65-hồ-sơ-cá-nhân)
   - 6.6. [Tin nhắn](#66-tin-nhắn)
   - 6.7. [Lịch học](#67-lịch-học)
   - 6.8. [Quản trị viên](#68-quản-trị-viên)
7. [Thiết kế trải nghiệm người dùng (UX)](#7-thiết-kế-trải-nghiệm-người-dùng-ux)
8. [Các chức năng dự kiến](#8-các-chức-năng-dự-kiến)
9. [Định hướng công nghệ](#9-định-hướng-công-nghệ)
10. [Kết luận](#10-kết-luận)
11. [Phụ lục – Mô tả nhanh giao diện Dashboard](#phụ-lục--mô-tả-nhanh-giao-diện-dashboard)

---

## 1. Giới thiệu dự án SkillSwap

SkillSwap là ý tưởng xây dựng một nền tảng web dành cho sinh viên, cho phép người dùng chia sẻ những kỹ năng mình có và tìm kiếm những kỹ năng mình muốn học. Khác với mô hình học trực tuyến truyền thống, SkillSwap tập trung vào hình thức trao đổi kỹ năng giữa người dùng: một sinh viên có thể dạy một kỹ năng và đồng thời học một kỹ năng khác từ sinh viên phù hợp.

Ý tưởng được phát triển theo hướng một sản phẩm web có tính ứng dụng thực tế, có khả năng hình thành cộng đồng học tập ngang hàng. Điểm nổi bật của dự án là hệ thống gợi ý mức độ phù hợp giữa các sinh viên dựa trên kỹ năng, trình độ, thời gian và hình thức học.

## 2. Vấn đề thực tế và ý tưởng giải pháp

Trong môi trường đại học, nhiều sinh viên có kỹ năng tốt ở một lĩnh vực nhưng lại cần hỗ trợ ở một lĩnh vực khác. Ví dụ, một sinh viên có thể biết C++ và muốn cải thiện tiếng Anh giao tiếp, trong khi một sinh viên khác giỏi tiếng Anh nhưng đang cần học lập trình. Tuy nhiên, việc tìm đúng người có nhu cầu bổ trợ lẫn nhau thường phụ thuộc vào các nhóm mạng xã hội hoặc quan hệ cá nhân.

SkillSwap đề xuất giải quyết vấn đề trên bằng một quy trình đơn giản:

1. Người dùng tạo hồ sơ và khai báo các kỹ năng có thể chia sẻ.
2. Người dùng lựa chọn các kỹ năng mình muốn học.
3. Hệ thống phân tích dữ liệu và đề xuất những người có mức độ phù hợp cao.
4. Hai bên gửi và chấp nhận yêu cầu kết nối.
5. Người dùng có thể nhắn tin, thống nhất lịch học và thực hiện buổi trao đổi.
6. Sau buổi học, hai bên có thể đánh giá để xây dựng mức độ uy tín trong cộng đồng.

## 3. Đối tượng người dùng

- Sinh viên đại học muốn học thêm kỹ năng ngoài chương trình chính khóa.
- Sinh viên có kỹ năng và muốn chia sẻ kiến thức với người khác.
- Những người muốn tìm bạn học có cùng mục tiêu.
- Câu lạc bộ học thuật hoặc cộng đồng sinh viên có nhu cầu tổ chức trao đổi kỹ năng.

## 4. Mục tiêu của website

- Tạo môi trường thuận tiện để sinh viên tìm người có kỹ năng phù hợp.
- Khuyến khích hình thức học tập ngang hàng thay vì chỉ phụ thuộc vào lớp học truyền thống.
- Giảm thời gian tìm kiếm người học/người dạy phù hợp.
- Xây dựng hệ thống hồ sơ, kết nối, lịch học và đánh giá có tính minh bạch.
- Tạo một sản phẩm web có tính thực tiễn và có khả năng mở rộng trong tương lai.

## 5. Định hướng thiết kế giao diện

Nhóm lựa chọn phong cách giao diện tươi sáng, trẻ trung và thân thiện với sinh viên. Thiết kế ưu tiên các khoảng trắng, card bo góc, biểu tượng trực quan và màu sắc nổi bật vừa phải. Mục đích là tạo cảm giác giống một sản phẩm công nghệ hiện đại nhưng vẫn dễ sử dụng đối với người dùng mới.

Các nguyên tắc thiết kế chính:

- **Đơn giản:** người dùng có thể hiểu chức năng ngay từ lần đầu truy cập.
- **Trực quan:** kỹ năng, điểm Match và trạng thái lịch học được thể hiện bằng card, badge và icon.
- **Thân thiện:** sử dụng lời chào, hình ảnh sinh viên và các micro-interaction nhẹ.
- **Nhất quán:** nút bấm, màu sắc, khoảng cách và kiểu chữ được sử dụng đồng bộ.

## 6. Cấu trúc và các màn hình chính

### 6.1. Trang chủ

Giới thiệu ngắn gọn SkillSwap, giải thích cơ chế trao đổi kỹ năng và dẫn người dùng đến hai hành động chính: tìm người phù hợp hoặc khám phá kỹ năng.

### 6.2. Dashboard

Sau khi đăng nhập, người dùng nhìn thấy lời chào, thanh tìm kiếm, các đề xuất Match nổi bật, lịch học sắp tới và hoạt động gần đây. Đây là màn hình trung tâm của hệ thống.

### 6.3. Khám phá

Cho phép tìm kiếm người dùng hoặc kỹ năng theo từ khóa và danh mục như Lập trình, Ngoại ngữ, Thiết kế, Kinh doanh, Âm nhạc và các lĩnh vực khác.

### 6.4. Gợi ý phù hợp

Hiển thị các hồ sơ có điểm tương thích cao. Mỗi thẻ người dùng thể hiện kỹ năng có thể dạy, kỹ năng muốn học, đánh giá và phần trăm Match.

### 6.5. Hồ sơ cá nhân

Hiển thị thông tin cơ bản, các kỹ năng có thể dạy, kỹ năng muốn học, trình độ, số buổi trao đổi và đánh giá từ những người đã kết nối.

### 6.6. Tin nhắn

Cho phép hai người đã kết nối trao đổi thông tin và thống nhất nội dung, thời gian của buổi học.

### 6.7. Lịch học

Hiển thị các buổi trao đổi đã xác nhận, thời gian, hình thức học và trạng thái của từng buổi.

### 6.8. Quản trị viên

Quản lý tài khoản, danh mục kỹ năng, báo cáo vi phạm, lượt kết nối và các chỉ số hoạt động của hệ thống.

## 7. Thiết kế trải nghiệm người dùng (UX)

Luồng sử dụng cơ bản được định hướng như sau:

> **Đăng ký → Tạo hồ sơ → Chọn kỹ năng có thể dạy → Chọn kỹ năng muốn học → Xem Match → Kết nối → Nhắn tin → Đặt lịch → Trao đổi → Đánh giá**

Để giảm thao tác, hệ thống nên ưu tiên các nút hành động rõ ràng như "Kết nối", "Xem hồ sơ", "Đặt lịch" và "Bắt đầu trò chuyện". Người dùng không nên phải đi qua quá nhiều màn hình để hoàn thành một nhiệm vụ.

## 8. Các chức năng dự kiến

| Nhóm chức năng | Chức năng | Mức ưu tiên |
|---|---|---|
| Tài khoản | Đăng ký, đăng nhập, đăng xuất, cập nhật hồ sơ | Cao |
| Kỹ năng | Thêm, sửa, xóa kỹ năng; chọn trình độ | Cao |
| Matching | Tính và hiển thị mức độ phù hợp | Rất cao |
| Kết nối | Gửi, chấp nhận hoặc từ chối lời mời | Cao |
| Tin nhắn | Trao đổi giữa hai người đã kết nối | Trung bình |
| Lịch học | Tạo và quản lý buổi trao đổi | Trung bình |
| Đánh giá | Đánh giá sau buổi trao đổi | Trung bình |
| Quản trị | Quản lý người dùng, kỹ năng và báo cáo | Trung bình |

## 9. Định hướng công nghệ

- **Frontend:** HTML, CSS, JavaScript hoặc React tùy yêu cầu môn học.
- **Backend:** Node.js/Express, PHP hoặc framework phù hợp với năng lực nhóm.
- **Database:** MySQL hoặc PostgreSQL.
- **Authentication:** đăng nhập bằng tài khoản và phân quyền người dùng/admin.
- **Realtime:** có thể bổ sung WebSocket cho chức năng chat nếu thời gian cho phép.
- **Responsive UI:** sử dụng CSS Flexbox/Grid hoặc framework giao diện để hỗ trợ nhiều kích thước màn hình.

## 10. Kết luận

SkillSwap hướng tới giải quyết một nhu cầu cụ thể trong cộng đồng sinh viên: tìm kiếm người phù hợp để trao đổi kiến thức và kỹ năng. Ý tưởng không tập trung vào việc xây dựng một nền tảng học trực tuyến đại trà mà nhấn mạnh vào sự tương hỗ giữa người học và người chia sẻ.

Về mặt học tập, dự án có thể giúp nhóm vận dụng nhiều kiến thức về phân tích yêu cầu, thiết kế giao diện, UX/UI, lập trình frontend, backend, cơ sở dữ liệu, xác thực, thuật toán matching và kiểm thử phần mềm. Giao diện tươi sáng, trẻ trung và hệ thống Match là hai yếu tố tạo nên bản sắc riêng cho sản phẩm.

Trong các giai đoạn tiếp theo, nhóm có thể mở rộng SkillSwap bằng hệ thống điểm uy tín, thông báo thời gian thực, gợi ý kỹ năng bằng AI, xác thực tài khoản sinh viên và thống kê hoạt động cộng đồng. Tuy nhiên, phiên bản đầu tiên nên tập trung hoàn thiện các chức năng cốt lõi để đảm bảo sản phẩm có thể hoạt động ổn định và dễ trình diễn.
