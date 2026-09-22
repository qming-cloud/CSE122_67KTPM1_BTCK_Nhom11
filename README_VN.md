# SkillSwap - Nền Tảng Trao Đổi Kỹ Năng Sinh Viên

## 1. Tổng Quan Dự Án (Project Overview)
**SkillSwap** là một nền tảng trao đổi kỹ năng ngang hàng (peer-to-peer) được thiết kế đặc biệt dành cho sinh viên đại học. Dự án hướng tới việc xây dựng một hệ sinh thái học tập năng động, mang tính cộng tác cao, nơi sinh viên có thể tự do chia sẻ thế mạnh của mình và học hỏi thêm những kỹ năng mới từ bạn bè.

Dự án nhấn mạnh vào sự uy tín trong học thuật kết hợp với năng lượng tích cực của tuổi trẻ, mang lại một trải nghiệm kết nối thân thiện và dễ dàng sử dụng.

## 2. Các Tính Năng Cốt Lõi
- **Hồ sơ Sinh viên (Student Profile Cards):** Thể hiện chi tiết thông tin của sinh viên bao gồm: Avatar, huy hiệu trường học, điểm đánh giá (sao) và các kỹ năng của họ.
- **Hệ thống Phân loại Kỹ năng:** 
  - **Kỹ năng có thể dạy (Teach Intent):** Được đánh dấu bằng nhãn màu Xanh ngọc (Emerald), thể hiện sự thành thạo và sẵn sàng chia sẻ.
  - **Kỹ năng muốn học (Learn Intent):** Được đánh dấu bằng nhãn màu Cam (Orange), thể hiện mục tiêu học tập và nhu cầu tìm người hướng dẫn.
- **Đề xuất Trao đổi (Propose Swap):** Nút hành động chính (Call-to-Action) giúp người dùng kết nối nhanh chóng với một sinh viên khác để bắt đầu quá trình trao đổi kỹ năng.
- **Tìm kiếm và Lọc (Search & Filters):** Hệ thống tìm kiếm tối giản nhưng mạnh mẽ, kết hợp cùng các thẻ lọc giúp người dùng nhanh chóng tìm thấy đối tác trao đổi phù hợp.

## 3. Phong Cách Thiết Kế & Nhận Diện (Brand & Style)
Hệ thống thiết kế (Design System) của SkillSwap được tinh chỉnh để mang lại cảm giác cao cấp, rõ ràng nhưng không kém phần hiện đại:

- **Màu sắc chủ đạo:**
  - **Màu chính (Primary):** Xanh Indigo (Indigo - `#4F46E5`) dùng cho các nút bấm chính, điều hướng và tạo sự đáng tin cậy.
  - **Màu điểm xuyết (Accent):** Vàng hổ phách (Amber - `#F59E0B`) dùng cho các huy hiệu thành tích, đánh giá, tạo cảm giác được khích lệ và tạo động lực.
- **Giao diện (Layout & Elevation):** Sử dụng các thẻ (card) trắng trên nền xám nhạt (`#F8FAFC`), kết hợp với các hiệu ứng đổ bóng tinh tế (ambient drop shadows) và viền mỏng để phân cấp thông tin rõ ràng mà không bị rối mắt.
- **Nghệ thuật chữ (Typography):** Sử dụng phông chữ **Plus Jakarta Sans** mang lại sự gọn gàng, thân thiện và độ đọc hiểu cao trên mọi thiết bị, từ màn hình rộng cho đến điện thoại di động.
- **Hình khối (Shapes):** Kết hợp hài hòa giữa các thẻ bo góc vừa phải (`12px` - `16px`) và các thẻ kỹ năng bo tròn hoàn toàn (pill-shaped) giúp làm nổi bật thông tin.

## 4. Công Nghệ
Dự án là một ứng dụng Web tĩnh với thiết kế Giao diện người dùng (UI) mạnh mẽ:
- **Ngôn ngữ:** HTML5
- **Styling:** CSS với framework **TailwindCSS** (sử dụng qua CDN), kết hợp với các hiệu ứng bóng đổ tùy chỉnh (Neo-brutalism/neo-shadow) và CSS Grid.
- **Biểu tượng & Phông chữ:** Tích hợp Google Fonts (Plus Jakarta Sans) và Material Symbols.
- **Đáp ứng (Responsive):** Thiết kế tự động điều chỉnh linh hoạt từ Mobile (dưới 640px), Tablet (đến 1024px) và Desktop (lên tới 1280px).
