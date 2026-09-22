const mockAccounts = [
  {
    email: "admin@skillswap.vn", password: "Password123", name: "System Admin", schoolName: "SkillSwap Headquarter",
    schoolTag: "ADMIN", rating: "5.0", swaps: 999, isOnline: true, isNear: true,
    teach: ["Quản trị hệ thống"], learn: ["Quản lý cộng đồng"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=Admin", tagColor1: "red",
    role: "admin"
  },
  {
    email: "minhhoang.k66@hust.edu.vn", password: "Password123", name: "Minh Hoàng", schoolName: "ĐH Bách Khoa • KH Máy Tính",
    schoolTag: "K66", rating: "4.98", swaps: 32, isOnline: true, isNear: false,
    teach: ["Python & Crawl Data", "Cấu trúc Dữ liệu"], learn: ["IELTS Speaking 7.0", "Guitar đệm hát"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=MinhHoang", tagColor1: "blue"
  },
  {
    email: "lananh.nguyen@ftu.edu.vn", password: "Password123", name: "Lan Anh", schoolName: "ĐH Ngoại Thương • Kinh Tế Đối Ngoại",
    schoolTag: "K60", rating: "5.0", swaps: 45, isOnline: false, isNear: true,
    teach: ["IELTS Speaking 8.0", "Thuyết trình Case Study"], learn: ["Làm Video CapCut", "Figma Prototyping"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=LanAnh", tagColor1: "pink"
  },
  {
    email: "ducbinh.le@neu.edu.vn", password: "Password123", name: "Đức Bình", schoolName: "ĐH Kinh Tế Quốc Dân • Kế Toán",
    schoolTag: "K62", rating: "4.8", swaps: 15, isOnline: true, isNear: true,
    teach: ["Excel & VBA", "Kế toán cơ bản"], learn: ["Tiếng Nhật N4", "Thiết kế Slide"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=DucBinh", tagColor1: "emerald"
  },
  {
    email: "thuytrang.tran@rmit.edu.vn", password: "Password123", name: "Thùy Trang", schoolName: "RMIT • Thiết Kế Đa Phương Tiện",
    schoolTag: "Year 3", rating: "4.95", swaps: 28, isOnline: true, isNear: false,
    teach: ["Figma UI/UX", "Adobe Illustrator"], learn: ["Tiếng Hàn Giao Tiếp", "Marketing Cơ bản"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=ThuyTrang", tagColor1: "amber"
  },
  {
    email: "quanghuy.vu@fpt.edu.vn", password: "Password123", name: "Quang Huy", schoolName: "Đại học FPT • Kỹ Thuật Phần Mềm",
    schoolTag: "K15", rating: "4.7", swaps: 12, isOnline: false, isNear: true,
    teach: ["Java cơ bản", "Thuật toán"], learn: ["Tiếng Anh TOEIC", "Bơi lội"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=QuangHuy", tagColor1: "orange"
  },
  {
    email: "huonggiang.pham@vnu.edu.vn", password: "Password123", name: "Hương Giang", schoolName: "ĐHQGHN • Ngôn ngữ học",
    schoolTag: "Năm 4", rating: "4.9", swaps: 22, isOnline: true, isNear: true,
    teach: ["Viết lách sáng tạo", "Tiếng Trung HSK4"], learn: ["Làm Video TikTok", "Guitar đệm hát"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=HuongGiang", tagColor1: "teal"
  },
  {
    email: "tuananh.do@hust.edu.vn", password: "Password123", name: "Tuấn Anh", schoolName: "ĐH Bách Khoa • Điện Tử Viễn Thông",
    schoolTag: "K65", rating: "4.6", swaps: 10, isOnline: false, isNear: false,
    teach: ["Lập trình C", "Toán Cao Cấp"], learn: ["Giao tiếp Tiếng Anh", "Photoshop"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=TuanAnh", tagColor1: "blue"
  },
  {
    email: "khanhly.vu@hau.edu.vn", password: "Password123", name: "Khánh Ly", schoolName: "ĐH Kiến Trúc • Nội thất",
    schoolTag: "K19", rating: "4.85", swaps: 18, isOnline: true, isNear: true,
    teach: ["SketchUp & Vray", "Vẽ Tay"], learn: ["Tiếng Anh Giao Tiếp", "Chụp ảnh"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=KhanhLy", tagColor1: "indigo"
  },
  {
    email: "trongdat.nguyen@utc.edu.vn", password: "Password123", name: "Trọng Đạt", schoolName: "ĐH GTVT • Logistics",
    schoolTag: "K61", rating: "4.75", swaps: 14, isOnline: true, isNear: false,
    teach: ["Quản lý chuỗi cung ứng", "Excel nâng cao"], learn: ["Tiếng Trung HSK3", "Thuyết trình"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=TrongDat", tagColor1: "gray"
  },
  {
    email: "maiphuong.le@hanu.edu.vn", password: "Password123", name: "Mai Phương", schoolName: "ĐH Hà Nội • Ngôn ngữ Pháp",
    schoolTag: "Năm 2", rating: "4.92", swaps: 25, isOnline: false, isNear: true,
    teach: ["Tiếng Pháp cơ bản", "Dịch thuật"], learn: ["Thiết kế đồ hoạ", "Quản lý thời gian"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=MaiPhuong", tagColor1: "rose"
  },
  {
    email: "vietdung.tran@ptit.edu.vn", password: "Password123", name: "Việt Dũng", schoolName: "PTIT • An Toàn Thông Tin",
    schoolTag: "D21", rating: "4.8", swaps: 19, isOnline: true, isNear: false,
    teach: ["Linux & Networking", "Cybersecurity 101"], learn: ["IELTS Writing", "Nấu ăn"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=VietDung", tagColor1: "red"
  },
  {
    email: "thuha.ngo@hvnh.edu.vn", password: "Password123", name: "Thu Hà", schoolName: "Học viện Ngân Hàng • Ngân hàng",
    schoolTag: "K23", rating: "4.88", swaps: 21, isOnline: true, isNear: true,
    teach: ["Kiến thức Tài chính", "Kế toán Ngân hàng"], learn: ["Lập trình Python", "Tiếng Anh chuyên ngành"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=ThuHa", tagColor1: "sky"
  },
  {
    email: "xuanbach.dinh@hmu.edu.vn", password: "Password123", name: "Xuân Bách", schoolName: "ĐH Y Hà Nội • Đa Khoa",
    schoolTag: "Y4", rating: "4.96", swaps: 30, isOnline: false, isNear: false,
    teach: ["Sinh học & Giải phẫu", "Sơ cứu cơ bản"], learn: ["Tiếng Anh Y Khoa", "Thuyết trình"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=XuanBach", tagColor1: "cyan"
  },
  {
    email: "diemquynh.hoang@huce.edu.vn", password: "Password123", name: "Diễm Quỳnh", schoolName: "ĐH Xây Dựng • Quản lý dự án",
    schoolTag: "K64", rating: "4.7", swaps: 11, isOnline: true, isNear: true,
    teach: ["Autocad 2D", "Dự toán công trình"], learn: ["Tiếng Nhật N5", "Kỹ năng Lãnh đạo"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=DiemQuynh", tagColor1: "lime"
  },
  {
    email: "manhtien.bui@hou.edu.vn", password: "Password123", name: "Mạnh Tiến", schoolName: "ĐH Mở Hà Nội • Công nghệ Sinh học",
    schoolTag: "K28", rating: "4.6", swaps: 8, isOnline: false, isNear: true,
    teach: ["Sinh học tế bào", "Làm vườn"], learn: ["Tiếng Anh Giao Tiếp", "Chỉnh sửa Video"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=ManhTien", tagColor1: "green"
  },
  {
    email: "baongoc.truong@aof.edu.vn", password: "Password123", name: "Bảo Ngọc", schoolName: "Học viện Tài Chính • Kiểm Toán",
    schoolTag: "CQ58", rating: "4.85", swaps: 16, isOnline: true, isNear: false,
    teach: ["Kiểm toán căn bản", "Luật Thuế"], learn: ["IELTS Reading", "Làm MC"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=BaoNgoc", tagColor1: "fuchsia"
  },
  {
    email: "congminh.ly@vba.edu.vn", password: "Password123", name: "Công Minh", schoolName: "Học viện Nông Nghiệp • Chăn Nuôi",
    schoolTag: "K65", rating: "4.65", swaps: 9, isOnline: false, isNear: false,
    teach: ["Kiến thức Nông nghiệp", "Cách trồng sen đá"], learn: ["Marketing", "Tiếng Anh TOEIC"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=CongMinh", tagColor1: "emerald"
  },
  {
    email: "thaovy.nguyen@tmu.edu.vn", password: "Password123", name: "Thảo Vy", schoolName: "ĐH Thương Mại • Quản trị Kinh doanh",
    schoolTag: "K56", rating: "4.9", swaps: 24, isOnline: true, isNear: true,
    teach: ["Khởi nghiệp", "Lập kế hoạch Kinh doanh"], learn: ["Thiết kế Web", "Tiếng Trung Giao tiếp"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=ThaoVy", tagColor1: "violet"
  },
  {
    email: "hoangnam.tran@vfu.edu.vn", password: "Password123", name: "Hoàng Nam", schoolName: "ĐH Lâm Nghiệp • Quản lý Tài nguyên",
    schoolTag: "K64", rating: "4.72", swaps: 13, isOnline: true, isNear: false,
    teach: ["Kỹ năng sinh tồn", "Lập bản đồ GIS"], learn: ["Lập trình Python", "Tiếng Anh cơ bản"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=HoangNam", tagColor1: "stone"
  },
  {
    email: "thanhhuyen.le@vcu.edu.vn", password: "Password123", name: "Thanh Huyền", schoolName: "ĐH Thương Mại • Thương Mại Điện Tử",
    schoolTag: "K57", rating: "4.95", swaps: 35, isOnline: false, isNear: true,
    teach: ["Bán hàng Shopee", "Chạy Ads"], learn: ["Thiết kế UI/UX", "Tiếng Anh Thương Mại"],
    avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=ThanhHuyen", tagColor1: "pink"
  }
];
