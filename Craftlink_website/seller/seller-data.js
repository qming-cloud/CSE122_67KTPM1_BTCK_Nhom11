/**
 * ==========================================================================
 * CRAFT LINK - SELLER PORTAL MOCK DATA (seller-data.js)
 * Dữ liệu giả lập chuẩn cho nền tảng thương mại điện tử thủ công mỹ nghệ.
 * Tích hợp tự động lưu và đọc từ LocalStorage để thao tác CRUD hoạt động thật.
 * ==========================================================================
 */

const STORAGE_KEYS = {
  SHOP_INFO: 'craftlink_seller_shop_info',
  PRODUCTS: 'craftlink_seller_products',
  ORDERS: 'craftlink_seller_orders',
  REVIEWS: 'craftlink_seller_reviews',
  MESSAGES: 'craftlink_seller_messages',
  PROMOTIONS: 'craftlink_seller_promotions',
  TRANSACTIONS: 'craftlink_seller_transactions',
  SETTINGS: 'craftlink_seller_settings',
  NOTIFICATIONS: 'craftlink_seller_notifications',
  BRIEFS: 'craftlink_seller_briefs',
  PROPOSALS: 'craftlink_seller_proposals',
  REVISIONS: 'craftlink_seller_revisions'
};

// Dữ liệu ban đầu mặc định của gian hàng nghệ nhân
const DEFAULT_SHOP_INFO = {
  id: "SHOP_084",
  name: "Xưởng Dệt Chàm & Thêu Tay Bản Phố",
  artisanName: "Nghệ nhân Vàng Thị Mai",
  ethnicGroup: "Dân tộc H'Mông Hoa",
  village: "Bản Phố, Huyện Bắc Hà, Tỉnh Lào Cai",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAfeDcjbel9PgaOPKsXiTnmmt9HzUNMRNarcvfjPFi7lg-OfC5dHFtTQ9wh06mybenJZqJ3EpEeoUfDwx2Hl2450M6j4AH8rzyPmLCIsufOV4CxyEAN6vwTDOENjcStpLHb2rQeoZCCqyBPUPiu5pKJwG7z8yzcr2tSEFQNdJipk6iLyhcphGRHWeLTmgZnILx14Lp1fFMsgIzZLIqqfOxAXJ74cKdjYCsT381x8Biu5hgbhW7jBVo",
  coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCn6Mod7HwcwbLvZp07ozudATDYxeidZxR-QS4uNS1ToADHUlFu6VNniMTudCWf1FfvFVFcy40tjcXN-xsmp6AHmEzg9LxsxAjTNtYvULx69YHTeTlhJ8qO_NrFYcXT3KgZlBVoaHE9dtacSc60jzPIzIHVdz8edwhCjnI2TAif_g12SsVhf5d5TP6DPbxnUKEwNXs6QeDCpGU04qE6jN9r5TQT-ODdhKXN3sfnvOzWRcb-0eN7-38",
  phone: "0984 321 789",
  email: "mai.craftlink.bacha@gmail.com",
  joinedDate: "15/03/2021",
  rating: 4.9,
  reviewCount: 148,
  isWftoCertified: true, // Chứng nhận Thương Mại Công Bằng thế giới WFTO
  bio: "Hơn 35 năm gắn bó cùng khung cửi gỗ pơ-mu và cây chàm rừng. Chúng tôi bảo tồn kỹ thuật vẽ sáp ong truyền thống và tạo sinh kế bền vững cho hơn 28 chị em phụ nữ trong bản.",
  story: "Mỗi đường kim thêu chữ thập, mỗi dải màu nhuộm từ củ nâu và lá chàm hữu cơ không chỉ là tấm vải, mà là bài ca về núi rừng Tây Bắc được truyền đời qua 4 thế hệ phụ nữ người H'Mông.",
  bankInfo: {
    bankName: "Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank)",
    accountNumber: "0011004899882",
    accountHolder: "VANG THI MAI",
    branch: "Chi nhánh Lào Cai"
  },
  walletBalance: 24850000,
  pendingWithdrawal: 0
};

// Dữ liệu ban đầu mặc định của Sản phẩm
const DEFAULT_PRODUCTS = [
  {
    id: "SP-001",
    name: "Khăn choàng Thổ cẩm Dệt thoi Sợi Gai dầu Nhuộm Chàm",
    category: "Thổ cẩm & Dệt may",
    price: 680000,
    originalPrice: 750000,
    stock: 18,
    status: "active", // active: Đang bán, hidden: Tạm ẩn, out_of_stock: Hết hàng
    isFairTrade: true,
    isBestSeller: true,
    isNew: false,
    village: "Làng dệt thổ cẩm Lùng Tám, Hà Giang",
    material: "100% Sợi gai dầu tự nhiên, chàm hữu cơ",
    soldCount: 94,
    rating: 5.0,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCn6Mod7HwcwbLvZp07ozudATDYxeidZxR-QS4uNS1ToADHUlFu6VNniMTudCWf1FfvFVFcy40tjcXN-xsmp6AHmEzg9LxsxAjTNtYvULx69YHTeTlhJ8qO_NrFYcXT3KgZlBVoaHE9dtacSc60jzPIzIHVdz8edwhCjnI2TAif_g12SsVhf5d5TP6DPbxnUKEwNXs6QeDCpGU04qE6jN9r5TQT-ODdhKXN3sfnvOzWRcb-0eN7-38",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATH2qCxomyhQAfUA_WIgd5zd_MhCtZllLqMFQE4Qb26XZeeVqEYhzyTyzPk4MJ8-hHtoOSWbmOSvcU_hsgv16uVZ7KXEniCPF_311RADuIBuT2GmJYaoC4EWblLBQ2Sb75FdDUR-JYz4zzc6WN1XheuQlGUudbXHrpQFf8YOBFG1mu8clBrZfhhYqDG29XugvUcSSejcvKLsov2hUKNP6Tjacd6h-Zanke0Vf0bQQfqLhSFr3MlxQ1"
    ],
    description: "Sản phẩm dệt thoi thủ công hoàn toàn từ sợi lanh/gai dầu bản địa, được nhuộm chàm nhiều lần tạo sắc xanh huyền bí đặc trưng Tây Bắc. Không sử dụng phẩm màu hóa học."
  },
  {
    id: "SP-002",
    name: "Túi Tote Thổ cẩm Vẽ sáp ong Họa tiết Răng bừa H'Mông",
    category: "Thổ cẩm & Dệt may",
    price: 420000,
    originalPrice: 450000,
    stock: 4, // Cảnh báo sắp hết
    status: "active",
    isFairTrade: true,
    isBestSeller: true,
    isNew: false,
    village: "Bản Phố, Bắc Hà, Lào Cai",
    material: "Vải lanh thô dệt tay, quai da bò thuộc thực vật",
    soldCount: 162,
    rating: 4.9,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP51iMFuasIpeKibcoHy_cdaDoubZ5PXXfvQC5RGCMuoudhEzaZp31f_PsRDaDr1eQbs_zLNB9-tb115i1FcWzj_2vWtjbT0mpDopvqSKygizYRLjH4fgHAB25jl4ysy2UiGIgRtKwukAJOsYX8OWTi3qlRfLzYPCYuCD7BvkPndpvWVkD8HDi2tgbPyWXKpt_0bAH0Q737IXndz6kRbanrWr2sbVGmC2AOvlDj22_cpT2VD565x6"
    ],
    description: "Túi tote tiện dụng phong cách mộc tự nhiên. Điểm nhấn là mảng thổ cẩm vẽ sáp ong truyền thống với họa tiết cổ mang ý nghĩa mùa màng bội thu."
  },
  {
    id: "SP-003",
    name: "Bình Gốm Men tro Nung củi Mộc Phù Lãng",
    category: "Gốm mộc & Men tro",
    price: 850000,
    originalPrice: 850000,
    stock: 2, // Sắp hết
    status: "active",
    isFairTrade: true,
    isBestSeller: false,
    isNew: true,
    village: "Làng gốm Phù Lãng, Quế Võ, Bắc Ninh",
    material: "Đất sét đỏ Phù Lãng, men tro trấu tự nhiên",
    soldCount: 28,
    rating: 4.8,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvdqdMcS2Vr6-xL_Rf76g2SQtyHm9Ov-o4BurqkhuJKMkcgjDGA3GBcFMs7eIjwIXs_WJrGi1_r_QSu0ND3XL-cv2WSe6vPBlnHv05SbJy6EQAm5Tm1N5UZJgQTv62up9JrCmasyePZCrYSL_S_v2I5WLgJKfJbg3ZMy-JBqBqHc2XCP_XE63DKQxWmoNz5c5ldDfn_VRqEYNU6JrXTA_bO7LYK5YKpGz4FPM7sp5qiTyNEBrgIBFm"
    ],
    description: "Bình hoa dáng giọt sương nung củi nhiệt độ cao trong lò bầu truyền thống. Màu men da lươn biến ảo độc bản, không bình nào giống bình nào."
  },
  {
    id: "SP-004",
    name: "Hộp Đựng Trà Mây Tre Đan Mắt cáo Tinh xảo",
    category: "Mây tre đan",
    price: 360000,
    originalPrice: 390000,
    stock: 35,
    status: "active",
    isFairTrade: true,
    isBestSeller: false,
    isNew: true,
    village: "Làng nghề mây tre Phú Vinh, Chương Mỹ, Hà Nội",
    material: "Mây giang phơi nắng tự nhiên, chống mốc thảo mộc",
    soldCount: 45,
    rating: 4.9,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATH2qCxomyhQAfUA_WIgd5zd_MhCtZllLqMFQE4Qb26XZeeVqEYhzyTyzPk4MJ8-hHtoOSWbmOSvcU_hsgv16uVZ7KXEniCPF_311RADuIBuT2GmJYaoC4EWblLBQ2Sb75FdDUR-JYz4zzc6WN1XheuQlGUudbXHrpQFf8YOBFG1mu8clBrZfhhYqDG29XugvUcSSejcvKLsov2hUKNP6Tjacd6h-Zanke0Vf0bQQfqLhSFr3MlxQ1"
    ],
    description: "Hộp đựng trà cao cấp đan bằng sợi cật mây vót sợi mảnh như sợi tơ. Thiết kế khít nắp giữ hương trà lâu dài."
  },
  {
    id: "SP-005",
    name: "Khay Sơn Mài Cẩn Trứng & Dát Vàng Họa Tiết Hoa Sen",
    category: "Sơn mài & Khảm trai",
    price: 1250000,
    originalPrice: 1350000,
    stock: 0,
    status: "out_of_stock", // Hết hàng
    isFairTrade: true,
    isBestSeller: true,
    isNew: false,
    village: "Làng sơn mài Hạ Thái, Thường Tín, Hà Nội",
    material: "Sơn ta tự nhiên Phú Thọ, vỏ trứng vịt, vàng lá 24k",
    soldCount: 68,
    rating: 5.0,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDry9lxaLw-ojcUe4_nCKOYHWyEw6TV0-ZaW6im2vlSaem7F6WOOsvxxqNCnADw3D0eTw-bfz4tDIpt6ECImZ0KKX4OUTKDQ4FZwYxV9t4u0UewLGTagurSA2i1HflRANsVodNIoTQoPaF7vpuEBP3DqxlaoOERTU9EBq1Z7qujnPzFYqJsfWvr-22q7AoGtq38NDXPJzLx352WEvUWglo1qVnCKdkQZSZVMsl9ZEaw_UGJXaX0qoWW"
    ],
    description: "Trải qua 18 công đoạn mài sơn nước tỉ mỉ kéo dài gần 2 tháng. Khay mang vẻ đẹp bóng sâu thẳm của sơn ta cổ truyền."
  },
  {
    id: "SP-006",
    name: "Vòng Tay Bạc Chạm Hoa Văn Mặt Trời Dân Tộc Dao Đỏ",
    category: "Trang sức bạc & Kim hoàn",
    price: 920000,
    originalPrice: 990000,
    stock: 12,
    status: "active",
    isFairTrade: true,
    isBestSeller: false,
    isNew: false,
    village: "Làng chạm bạc Đồng Xâm, Thái Bình",
    material: "Bạc ta 99% đúc chạm thủ công",
    soldCount: 37,
    rating: 4.7,
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP51iMFuasIpeKibcoHy_cdaDoubZ5PXXfvQC5RGCMuoudhEzaZp31f_PsRDaDr1eQbs_zLNB9-tb115i1FcWzj_2vWtjbT0mpDopvqSKygizYRLjH4fgHAB25jl4ysy2UiGIgRtKwukAJOsYX8OWTi3qlRfLzYPCYuCD7BvkPndpvWVkD8HDi2tgbPyWXKpt_0bAH0Q737IXndz6kRbanrWr2sbVGmC2AOvlDj22_cpT2VD565x6"
    ],
    description: "Vòng tay bạc khắc chạm hoa văn hộ mệnh cầu bình an và may mắn của đồng bào người Dao Đỏ vùng cao."
  }
];

// Dữ liệu ban đầu của Đơn hàng (Orders)
const DEFAULT_ORDERS = [
  {
    id: "CL-240801",
    customerName: "Nguyễn Thị Phương Thảo",
    phone: "0912 345 678",
    email: "phuongthao.art@gmail.com",
    address: "Số 28 Ngõ 12 Đặng Thai Mai, P. Quảng An, Q. Tây Hồ, Hà Nội",
    createdAt: "06/10/2026 10:25",
    status: "pending", // pending: Chờ xác nhận, preparing: Đang chuẩn bị, shipping: Đang giao, completed: Hoàn thành, cancelled: Đã hủy
    paymentMethod: "Chuyển khoản VNPAY (Đã thanh toán)",
    paymentStatus: "paid",
    shippingProvider: "Giao Hàng Tiết Kiệm (GHTK)",
    trackingCode: "GHTK-VN88921104",
    shippingFee: 30000,
    note: "Vui lòng đóng gói cẩn thận giúp mình làm quà tặng bạn nước ngoài ạ.",
    items: [
      {
        productId: "SP-001",
        productName: "Khăn choàng Thổ cẩm Dệt thoi Sợi Gai dầu Nhuộm Chàm",
        price: 680000,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCn6Mod7HwcwbLvZp07ozudATDYxeidZxR-QS4uNS1ToADHUlFu6VNniMTudCWf1FfvFVFcy40tjcXN-xsmp6AHmEzg9LxsxAjTNtYvULx69YHTeTlhJ8qO_NrFYcXT3KgZlBVoaHE9dtacSc60jzPIzIHVdz8edwhCjnI2TAif_g12SsVhf5d5TP6DPbxnUKEwNXs6QeDCpGU04qE6jN9r5TQT-ODdhKXN3sfnvOzWRcb-0eN7-38"
      }
    ],
    totalAmount: 710000
  },
  {
    id: "CL-240798",
    customerName: "Trần Anh Tuấn",
    phone: "0904 888 123",
    email: "tuantran.arc@outlook.com",
    address: "Căn hộ B12-04, Vinhomes Golden River, Bến Nghé, Quận 1, TP. Hồ Chí Minh",
    createdAt: "06/10/2026 08:40",
    status: "pending",
    paymentMethod: "Thanh toán khi nhận hàng (COD)",
    paymentStatus: "unpaid",
    shippingProvider: "Viettel Post Chuyển phát nhanh",
    trackingCode: "VTP-0923847721",
    shippingFee: 45000,
    note: "Gọi trước khi giao 30 phút.",
    items: [
      {
        productId: "SP-002",
        productName: "Túi Tote Thổ cẩm Vẽ sáp ong Họa tiết Răng bừa H'Mông",
        price: 420000,
        quantity: 2,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP51iMFuasIpeKibcoHy_cdaDoubZ5PXXfvQC5RGCMuoudhEzaZp31f_PsRDaDr1eQbs_zLNB9-tb115i1FcWzj_2vWtjbT0mpDopvqSKygizYRLjH4fgHAB25jl4ysy2UiGIgRtKwukAJOsYX8OWTi3qlRfLzYPCYuCD7BvkPndpvWVkD8HDi2tgbPyWXKpt_0bAH0Q737IXndz6kRbanrWr2sbVGmC2AOvlDj22_cpT2VD565x6"
      }
    ],
    totalAmount: 885000
  },
  {
    id: "CL-240755",
    customerName: "Lê Minh Thảo (Hội quán Di Sản)",
    phone: "0977 112 334",
    email: "hoiquandisan@gmail.com",
    address: "Tầng 3, 18 Hàng Gai, P. Hàng Trống, Q. Hoàn Kiếm, Hà Nội",
    createdAt: "05/10/2026 14:15",
    status: "preparing",
    paymentMethod: "Chuyển khoản QR SeABank",
    paymentStatus: "paid",
    shippingProvider: "GHTK Express",
    trackingCode: "GHTK-HN33918291",
    shippingFee: 0,
    note: "Đơn trưng bày hội chợ OCOP thủ công.",
    items: [
      {
        productId: "SP-004",
        productName: "Hộp Đựng Trà Mây Tre Đan Mắt cáo Tinh xảo",
        price: 360000,
        quantity: 3,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATH2qCxomyhQAfUA_WIgd5zd_MhCtZllLqMFQE4Qb26XZeeVqEYhzyTyzPk4MJ8-hHtoOSWbmOSvcU_hsgv16uVZ7KXEniCPF_311RADuIBuT2GmJYaoC4EWblLBQ2Sb75FdDUR-JYz4zzc6WN1XheuQlGUudbXHrpQFf8YOBFG1mu8clBrZfhhYqDG29XugvUcSSejcvKLsov2hUKNP6Tjacd6h-Zanke0Vf0bQQfqLhSFr3MlxQ1"
      },
      {
        productId: "SP-001",
        productName: "Khăn choàng Thổ cẩm Dệt thoi Sợi Gai dầu Nhuộm Chàm",
        price: 680000,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCn6Mod7HwcwbLvZp07ozudATDYxeidZxR-QS4uNS1ToADHUlFu6VNniMTudCWf1FfvFVFcy40tjcXN-xsmp6AHmEzg9LxsxAjTNtYvULx69YHTeTlhJ8qO_NrFYcXT3KgZlBVoaHE9dtacSc60jzPIzIHVdz8edwhCjnI2TAif_g12SsVhf5d5TP6DPbxnUKEwNXs6QeDCpGU04qE6jN9r5TQT-ODdhKXN3sfnvOzWRcb-0eN7-38"
      }
    ],
    totalAmount: 1760000
  },
  {
    id: "CL-240689",
    customerName: "Bà Dominique Mercier",
    phone: "0335 992 118",
    email: "dominique.m@ambafrance.org",
    address: "57 Trần Phú, P. Điện Biên, Q. Ba Đình, Hà Nội",
    createdAt: "04/10/2026 09:10",
    status: "shipping",
    paymentMethod: "Thẻ Quốc Tế Visa/Mastercard",
    paymentStatus: "paid",
    shippingProvider: "VNPost Nhanh EMS",
    trackingCode: "EMS-VN992817260",
    shippingFee: 35000,
    note: "Please keep natural indigo smell, love your work!",
    items: [
      {
        productId: "SP-006",
        productName: "Vòng Tay Bạc Chạm Hoa Văn Mặt Trời Dân Tộc Dao Đỏ",
        price: 920000,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP51iMFuasIpeKibcoHy_cdaDoubZ5PXXfvQC5RGCMuoudhEzaZp31f_PsRDaDr1eQbs_zLNB9-tb115i1FcWzj_2vWtjbT0mpDopvqSKygizYRLjH4fgHAB25jl4ysy2UiGIgRtKwukAJOsYX8OWTi3qlRfLzYPCYuCD7BvkPndpvWVkD8HDi2tgbPyWXKpt_0bAH0Q737IXndz6kRbanrWr2sbVGmC2AOvlDj22_cpT2VD565x6"
      }
    ],
    totalAmount: 955000
  },
  {
    id: "CL-240502",
    customerName: "Hoàng Văn Nam",
    phone: "0982 777 999",
    email: "namhoang.archi@gmail.com",
    address: "Biệt thự số 14, Đường Hoa Phượng 3, Vinhomes Riverside, Long Biên, Hà Nội",
    createdAt: "01/10/2026 16:30",
    status: "completed",
    paymentMethod: "Chuyển khoản Ngân hàng (Đã đối soát)",
    paymentStatus: "paid",
    shippingProvider: "GHTK Tiết Kiệm",
    trackingCode: "GHTK-HN11029388",
    shippingFee: 0,
    note: "Giao thành công, khách khen sản phẩm rất tinh xảo.",
    items: [
      {
        productId: "SP-003",
        productName: "Bình Gốm Men tro Nung củi Mộc Phù Lãng",
        price: 850000,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvdqdMcS2Vr6-xL_Rf76g2SQtyHm9Ov-o4BurqkhuJKMkcgjDGA3GBcFMs7eIjwIXs_WJrGi1_r_QSu0ND3XL-cv2WSe6vPBlnHv05SbJy6EQAm5Tm1N5UZJgQTv62up9JrCmasyePZCrYSL_S_v2I5WLgJKfJbg3ZMy-JBqBqHc2XCP_XE63DKQxWmoNz5c5ldDfn_VRqEYNU6JrXTA_bO7LYK5YKpGz4FPM7sp5qiTyNEBrgIBFm"
      }
    ],
    totalAmount: 850000
  },
  {
    id: "CL-240411",
    customerName: "Vũ Đình Khải",
    phone: "0934 661 229",
    email: "vudinhkhai91@yahoo.com",
    address: "Số 9 Tô Hiến Thành, TP. Nam Định",
    createdAt: "28/09/2026 11:00",
    status: "cancelled",
    paymentMethod: "COD",
    paymentStatus: "cancelled",
    shippingProvider: "GHTK",
    trackingCode: "GHTK-ND8829103",
    shippingFee: 30000,
    note: "Khách đổi ý muốn lấy mẫu họa tiết khác.",
    items: [
      {
        productId: "SP-002",
        productName: "Túi Tote Thổ cẩm Vẽ sáp ong Họa tiết Răng bừa H'Mông",
        price: 420000,
        quantity: 1,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP51iMFuasIpeKibcoHy_cdaDoubZ5PXXfvQC5RGCMuoudhEzaZp31f_PsRDaDr1eQbs_zLNB9-tb115i1FcWzj_2vWtjbT0mpDopvqSKygizYRLjH4fgHAB25jl4ysy2UiGIgRtKwukAJOsYX8OWTi3qlRfLzYPCYuCD7BvkPndpvWVkD8HDi2tgbPyWXKpt_0bAH0Q737IXndz6kRbanrWr2sbVGmC2AOvlDj22_cpT2VD565x6"
      }
    ],
    totalAmount: 450000
  }
];

// Dữ liệu Đánh giá từ khách hàng
const DEFAULT_REVIEWS = [
  {
    id: "REV-101",
    customerName: "Nguyễn Thị Phương Thảo",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    rating: 5,
    date: "05/10/2026",
    productName: "Khăn choàng Thổ cẩm Dệt thoi Sợi Gai dầu Nhuộm Chàm",
    comment: "Khăn cầm rất chắc tay, mùi thơm dịu tự nhiên của lá chàm rừng vùng cao không lẫn đi đâu được. Cảm ơn cô Vàng Thị Mai đã tạo ra sản phẩm tuyệt vời như vậy!",
    reply: "Xưởng cảm ơn con gái nhiều nhé, chúc con luôn ấm áp và yêu mến thổ cẩm quê cô!",
    replyDate: "05/10/2026 18:20",
    likes: 12
  },
  {
    id: "REV-102",
    customerName: "Hoàng Văn Nam",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    rating: 5,
    date: "02/10/2026",
    productName: "Bình Gốm Men tro Nung củi Mộc Phù Lãng",
    comment: "Đúng chất gốm mộc Phù Lãng. Nước men da lươn biến hỏa nhìn rất có hồn phong trần, cắm hoa sen hay cành đào dại rất đẹp.",
    reply: null,
    replyDate: null,
    likes: 5
  },
  {
    id: "REV-103",
    customerName: "Phạm Thúy Hằng",
    customerAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    rating: 4,
    date: "29/09/2026",
    productName: "Túi Tote Thổ cẩm Vẽ sáp ong Họa tiết Răng bừa H'Mông",
    comment: "Túi xinh, vải lanh dày dặn. Tuy nhiên dây đeo hơi dài so với bạn nào người nhỏ nhắn khoảng 1m50 như mình.",
    reply: "Dạ cô Mai cảm ơn cháu đã góp ý ạ! Đợt tới xưởng sẽ may thêm nấc khuy điều chỉnh độ dài dây đeo cho tiện nhé cháu.",
    replyDate: "30/09/2026 09:00",
    likes: 3
  }
];

// Tin nhắn chat với khách hàng
const DEFAULT_MESSAGES = [
  {
    id: "CHAT-01",
    customerName: "Nguyễn Thị Phương Thảo",
    customerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
    lastMessage: "Dạ vâng cô ơi, cô gói hộp mộc thắt dây thừng gai giúp con nhé!",
    lastTime: "10:30",
    unread: 1,
    online: true,
    history: [
      { sender: "customer", text: "Chào cô Mai ạ, con vừa đặt chiếc khăn choàng thổ cẩm mã CL-240801.", time: "10:26" },
      { sender: "seller", text: "Chào cháu, cô vừa nhận được đơn rồi nhé. Khăn mới dệt đợt này chàm đậm đẹp lắm!", time: "10:28" },
      { sender: "customer", text: "Dạ vâng cô ơi, cô gói hộp mộc thắt dây thừng gai giúp con nhé!", time: "10:30" }
    ]
  },
  {
    id: "CHAT-02",
    customerName: "Trần Anh Tuấn",
    customerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    lastMessage: "Shop cho mình hỏi túi tote này đựng vừa Macbook 14 inch không ạ?",
    lastTime: "Hôm qua",
    unread: 0,
    online: false,
    history: [
      { sender: "customer", text: "Shop cho mình hỏi túi tote này đựng vừa Macbook 14 inch không ạ?", time: "14:15" },
      { sender: "seller", text: "Chào anh, kích thước túi 38x42cm đựng vừa thoải mái laptop 14-15 inch kèm sạc và sổ tay anh nhé.", time: "14:22" }
    ]
  }
];

// Khuyến mãi & Voucher
const DEFAULT_PROMOTIONS = [
  {
    id: "KM-01",
    code: "CRAFTVIET10",
    title: "Tri ân Khách hàng Yêu Di Sản",
    type: "percentage", // percentage: % hoặc fixed: số tiền cố định
    value: 10, // 10%
    minOrder: 500000,
    maxDiscount: 100000,
    startDate: "01/10/2026",
    endDate: "31/10/2026",
    usedCount: 26,
    limit: 100,
    status: "active" // active, expired, upcoming
  },
  {
    id: "KM-02",
    code: "FREESHIP50K",
    title: "Hỗ trợ Phí Vận Chuyển Vùng Cao",
    type: "fixed",
    value: 50000,
    minOrder: 800000,
    maxDiscount: 50000,
    startDate: "01/09/2026",
    endDate: "15/10/2026",
    usedCount: 48,
    limit: 50,
    status: "active"
  }
];

// Lịch sử giao dịch ví & doanh thu
const DEFAULT_TRANSACTIONS = [
  {
    id: "TX-9941",
    type: "income",
    title: "Tiền bán hàng đơn #CL-240502",
    amount: 850000,
    date: "01/10/2026 16:35",
    status: "completed",
    note: "Đã trừ phí nền tảng 3% Fair Trade"
  },
  {
    id: "TX-9938",
    type: "withdrawal",
    title: "Rút tiền về Vietcombank 0011004899882",
    amount: -15000000,
    date: "25/09/2026 09:12",
    status: "completed",
    note: "Mã giao dịch ngân hàng: VCB-9912048"
  },
  {
    id: "TX-9912",
    type: "income",
    title: "Tiền bán hàng đơn #CL-239912",
    amount: 2150000,
    date: "20/09/2026 14:00",
    status: "completed",
    note: "Đơn hàng bộ đôi khăn và túi thổ cẩm"
  }
];

// ==========================================================================
// DỮ LIỆU ĐẶT HÀNG TÙY BIẾN (CREATOR COMMERCE - BRIEFS, PROPOSALS & REVISIONS)
// Phục vụ Vai trò 2: Người sáng tạo (Maker)
// ==========================================================================

const DEFAULT_BRIEFS = [
  {
    id: "BR-101",
    title: "Khăn choàng thổ cẩm dệt lanh thêu tên gia đình & hoa văn H'Mông cổ",
    category: "Thổ cẩm & Dệt may",
    buyerName: "Nguyễn Hải Yến",
    buyerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80",
    buyerPhone: "0912 456 789",
    buyerEmail: "haiyen.nguyen@gmail.com",
    createdAt: "14/10/2026 10:30",
    deadline: "30/10/2026",
    budget: 1200000,
    status: "pending", // pending: Chờ gửi đề xuất, proposed: Đã gửi đề xuất, revision_requested: Khách yêu cầu sửa, in_progress: Đang chế tác, completed: Hoàn thành, rejected: Đã từ chối
    statusText: "Chờ gửi đề xuất",
    dimensions: "180cm x 45cm",
    materialRequired: "Sợi lanh thô dệt tay, nhuộm chàm tự nhiên 100%, chỉ thêu củ nâu & vàng dành dành",
    description: "Tôi muốn đặt 1 chiếc khăn choàng thổ cẩm làm quà kỷ niệm ngày cưới của bố mẹ. Khăn cần có hoa văn quả trám cổ của người H'Mông Hoa ở hai đầu khăn, và thêu chữ 'Vạn An - 1986' ở góc viền bằng chỉ màu vàng nghệ.",
    referenceImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCn6Mod7HwcwbLvZp07ozudATDYxeidZxR-QS4uNS1ToADHUlFu6VNniMTudCWf1FfvFVFcy40tjcXN-xsmp6AHmEzg9LxsxAjTNtYvULx69YHTeTlhJ8qO_NrFYcXT3KgZlBVoaHE9dtacSc60jzPIzIHVdz8edwhCjnI2TAif_g12SsVhf5d5TP6DPbxnUKEwNXs6QeDCpGU04qE6jN9r5TQT-ODdhKXN3sfnvOzWRcb-0eN7-38"
    ],
    notes: "Khách mong muốn có hộp quà tre đan lót rơm mộc kèm thư tay chúc mừng."
  },
  {
    id: "BR-102",
    title: "Áo khoác thổ cẩm may đo dáng hiện đại kết hợp vạt chàm vẽ sáp ong",
    category: "Thổ cẩm & Dệt may",
    buyerName: "Trần Minh Quân",
    buyerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
    buyerPhone: "0983 112 334",
    buyerEmail: "quan.designer@craftstudio.vn",
    createdAt: "12/10/2026 15:45",
    deadline: "05/11/2026",
    budget: 2800000,
    status: "revision_requested",
    statusText: "Khách yêu cầu chỉnh sửa",
    dimensions: "Size L may đo (Rộng vai 46cm, Dài áo 74cm, Dài tay 61cm)",
    materialRequired: "Vải chàm thô dệt thoi Bắc Hà, vạt vẽ sáp ong cổ truyền, lót lụa tơ tằm mềm",
    description: "Áo khoác dáng Kimono cách tân, phần lưng sau trơn không thêu, tập trung điểm nhấn mảng thổ cẩm vẽ sáp ong ở vạt áo trước và viền cổ tay.",
    referenceImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCAP51iMFuasIpeKibcoHy_cdaDoubZ5PXXfvQC5RGCMuoudhEzaZp31f_PsRDaDr1eQbs_zLNB9-tb115i1FcWzj_2vWtjbT0mpDopvqSKygizYRLjH4fgHAB25jl4ysy2UiGIgRtKwukAJOsYX8OWTi3qlRfLzYPCYuCD7BvkPndpvWVkD8HDi2tgbPyWXKpt_0bAH0Q737IXndz6kRbanrWr2sbVGmC2AOvlDj22_cpT2VD565x6"
    ],
    latestCustomerFeedback: "Chào cô Mai, bản phác thảo đợt 1 nhìn rất đẹp rồi ạ! Tuy nhiên cháu có vài góp ý cần cô sửa giúp cháu: 1. Phần màu chàm cháu muốn nhuộm đậm hơn 2 nước nữa cho màu xanh đen trầm hơn chứ đừng ngả xanh lam sáng quá; 2. Vạt áo thêu sáp ong cô bớt họa tiết răng bừa lại giúp cháu, thay bằng hoa văn móc câu đôi nhìn thanh thoát hơn; 3. Chiều dài thân áo cô tăng thêm 4cm (thành 76cm) để mặc trùm qua hông một chút; 4. Về thời gian nếu hoàn thiện trước ngày 02/11 được thì tuyệt vời vì cháu cần đi dự triển lãm. Cô xem lại chi phí có phát sinh gì không nhé!",
    notes: "Khách hàng là nhà thiết kế thời trang, yêu cầu độ chính xác cao về màu sắc tự nhiên."
  },
  {
    id: "BR-103",
    title: "Bộ 20 túi vải lanh đựng trà quà tặng doanh nghiệp thêu logo biểu trưng",
    category: "Thổ cẩm & Dệt may",
    buyerName: "Lê Hoàng Yến (Heritage Tea)",
    buyerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80",
    buyerPhone: "0904 889 911",
    buyerEmail: "contact@heritage-gift.vn",
    createdAt: "10/10/2026 09:15",
    deadline: "25/10/2026",
    budget: 4500000,
    status: "proposed",
    statusText: "Đã gửi đề xuất",
    dimensions: "18cm x 25cm (dạng túi rút dây)",
    materialRequired: "Vải lanh tự nhiên mộc chưa tẩy trắng, dây gai dầu luồn miệng",
    description: "Đặt làm 20 túi dây rút đựng bánh trà Shan Tuyết cổ thụ làm quà biếu ngoại giao. Mặt trước thêu tay logo búp chè đơn sắc bằng chỉ màu nâu củ nâu tự nhiên.",
    referenceImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATH2qCxomyhQAfUA_WIgd5zd_MhCtZllLqMFQE4Qb26XZeeVqEYhzyTyzPk4MJ8-hHtoOSWbmOSvcU_hsgv16uVZ7KXEniCPF_311RADuIBuT2GmJYaoC4EWblLBQ2Sb75FdDUR-JYz4zzc6WN1XheuQlGUudbXHrpQFf8YOBFG1mu8clBrZfhhYqDG29XugvUcSSejcvKLsov2hUKNP6Tjacd6h-Zanke0Vf0bQQfqLhSFr3MlxQ1"
    ],
    notes: "Xưởng đã gửi Proposal PROP-103 với mức giá 4.200.000đ, đang đợi khách duyệt thanh toán cọc."
  },
  {
    id: "BR-104",
    title: "Tranh thổ cẩm dệt nổi khổ lớn phong cảnh ruộng bậc thang Mù Cang Chải",
    category: "Thổ cẩm & Dệt may",
    buyerName: "KTS Phạm Đăng Khoa",
    buyerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80",
    buyerPhone: "0936 221 789",
    buyerEmail: "dangkhoa.arch@atelier.com",
    createdAt: "05/10/2026 14:00",
    deadline: "20/11/2026",
    budget: 8500000,
    status: "in_progress",
    statusText: "Đang chế tác",
    dimensions: "120cm x 80cm (kèm nẹp gỗ pơ-mu trên dưới)",
    materialRequired: "Lanh thô dệt sợi to nhuộm 7 sắc thảo mộc Tây Bắc",
    description: "Tác phẩm trang trí sảnh khách sạn boutique tại phố cổ Hà Nội. Tái hiện các đường cong tầng tầng lớp lớp của ruộng bậc thang mùa lúa chín.",
    referenceImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCn6Mod7HwcwbLvZp07ozudATDYxeidZxR-QS4uNS1ToADHUlFu6VNniMTudCWf1FfvFVFcy40tjcXN-xsmp6AHmEzg9LxsxAjTNtYvULx69YHTeTlhJ8qO_NrFYcXT3KgZlBVoaHE9dtacSc60jzPIzIHVdz8edwhCjnI2TAif_g12SsVhf5d5TP6DPbxnUKEwNXs6QeDCpGU04qE6jN9r5TQT-ODdhKXN3sfnvOzWRcb-0eN7-38"
    ],
    notes: "Đã duyệt phương án, đã tạm ứng 50% chi phí. Đang thoi dệt lớp màu thứ 4."
  }
];

const DEFAULT_PROPOSALS = [
  {
    id: "PROP-103",
    briefId: "BR-103",
    briefTitle: "Bộ 20 túi vải lanh đựng trà quà tặng doanh nghiệp thêu logo biểu trưng",
    buyerName: "Lê Hoàng Yến (Heritage Tea)",
    totalPrice: 4200000,
    priceBreakdown: {
      materials: 1800000,
      craftsmanship: 2000000,
      packaging: 400000
    },
    estimatedDays: 12,
    deliveryDate: "22/10/2026",
    allowedRevisions: 2,
    status: "sent", // sent: Đã gửi khách, accepted: Khách đồng ý, rejected: Khách từ chối
    statusText: "Đã gửi khách",
    technicalSolution: "Chúng tôi sử dụng vải lanh dệt thoi mật độ sợi 32 sợi/inch, mộc tự nhiên thơm mùi rơm nắng. Chỉ thêu nhuộm củ nâu bền màu không phai khi giặt nước lạnh. Dây rút bện tay từ xơ gai dầu chắc chắn.",
    sketchImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuATH2qCxomyhQAfUA_WIgd5zd_MhCtZllLqMFQE4Qb26XZeeVqEYhzyTyzPk4MJ8-hHtoOSWbmOSvcU_hsgv16uVZ7KXEniCPF_311RADuIBuT2GmJYaoC4EWblLBQ2Sb75FdDUR-JYz4zzc6WN1XheuQlGUudbXHrpQFf8YOBFG1mu8clBrZfhhYqDG29XugvUcSSejcvKLsov2hUKNP6Tjacd6h-Zanke0Vf0bQQfqLhSFr3MlxQ1",
    createdAt: "11/10/2026 16:30"
  },
  {
    id: "PROP-104",
    briefId: "BR-104",
    briefTitle: "Tranh thổ cẩm dệt nổi khổ lớn phong cảnh ruộng bậc thang Mù Cang Chải",
    buyerName: "KTS Phạm Đăng Khoa",
    totalPrice: 8200000,
    priceBreakdown: {
      materials: 2800000,
      craftsmanship: 4800000,
      packaging: 600000
    },
    estimatedDays: 35,
    deliveryDate: "15/11/2026",
    allowedRevisions: 3,
    status: "accepted",
    statusText: "Khách đã duyệt",
    technicalSolution: "Nghệ nhân dùng kỹ thuật gài sợi tơ thổ cẩm nổi trên nền lanh mộc 3 lớp. Nẹp treo bằng gỗ pơ-mu rừng tái sinh được xử lý sáp ong chống mối mọt.",
    sketchImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCn6Mod7HwcwbLvZp07ozudATDYxeidZxR-QS4uNS1ToADHUlFu6VNniMTudCWf1FfvFVFcy40tjcXN-xsmp6AHmEzg9LxsxAjTNtYvULx69YHTeTlhJ8qO_NrFYcXT3KgZlBVoaHE9dtacSc60jzPIzIHVdz8edwhCjnI2TAif_g12SsVhf5d5TP6DPbxnUKEwNXs6QeDCpGU04qE6jN9r5TQT-ODdhKXN3sfnvOzWRcb-0eN7-38",
    createdAt: "07/10/2026 11:00"
  }
];

// Helper Service quản lý LocalStorage
const SellerStorage = {
  get(key, defaultVal) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultVal;
    } catch (e) {
      console.error(`Lỗi đọc storage ${key}:`, e);
      return defaultVal;
    }
  },
  set(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error(`Lỗi ghi storage ${key}:`, e);
    }
  },
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.SHOP_INFO)) {
      this.set(STORAGE_KEYS.SHOP_INFO, DEFAULT_SHOP_INFO);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      this.set(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.ORDERS)) {
      this.set(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.REVIEWS)) {
      this.set(STORAGE_KEYS.REVIEWS, DEFAULT_REVIEWS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
      this.set(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROMOTIONS)) {
      this.set(STORAGE_KEYS.PROMOTIONS, DEFAULT_PROMOTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.TRANSACTIONS)) {
      this.set(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.BRIEFS)) {
      this.set(STORAGE_KEYS.BRIEFS, DEFAULT_BRIEFS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.PROPOSALS)) {
      this.set(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS);
    }
  },
  resetToDefault() {
    this.set(STORAGE_KEYS.SHOP_INFO, DEFAULT_SHOP_INFO);
    this.set(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    this.set(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
    this.set(STORAGE_KEYS.REVIEWS, DEFAULT_REVIEWS);
    this.set(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES);
    this.set(STORAGE_KEYS.PROMOTIONS, DEFAULT_PROMOTIONS);
    this.set(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS);
    this.set(STORAGE_KEYS.BRIEFS, DEFAULT_BRIEFS);
    this.set(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS);
    window.location.reload();
  }
};

// Khởi tạo ngay khi nạp file
SellerStorage.init();

// Xuất các phương thức ra window để sử dụng trong toàn bộ trang seller
window.SellerData = {
  getShopInfo: () => SellerStorage.get(STORAGE_KEYS.SHOP_INFO, DEFAULT_SHOP_INFO),
  saveShopInfo: (data) => SellerStorage.set(STORAGE_KEYS.SHOP_INFO, data),

  getProducts: () => SellerStorage.get(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS),
  saveProducts: (data) => SellerStorage.set(STORAGE_KEYS.PRODUCTS, data),
  getProductById: (id) => {
    const list = SellerStorage.get(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    return list.find(p => p.id === id);
  },

  getOrders: () => SellerStorage.get(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS),
  saveOrders: (data) => SellerStorage.set(STORAGE_KEYS.ORDERS, data),
  getOrderById: (id) => {
    const list = SellerStorage.get(STORAGE_KEYS.ORDERS, DEFAULT_ORDERS);
    return list.find(o => o.id === id);
  },

  getReviews: () => SellerStorage.get(STORAGE_KEYS.REVIEWS, DEFAULT_REVIEWS),
  saveReviews: (data) => SellerStorage.set(STORAGE_KEYS.REVIEWS, data),

  getMessages: () => SellerStorage.get(STORAGE_KEYS.MESSAGES, DEFAULT_MESSAGES),
  saveMessages: (data) => SellerStorage.set(STORAGE_KEYS.MESSAGES, data),

  getPromotions: () => SellerStorage.get(STORAGE_KEYS.PROMOTIONS, DEFAULT_PROMOTIONS),
  savePromotions: (data) => SellerStorage.set(STORAGE_KEYS.PROMOTIONS, data),

  getTransactions: () => SellerStorage.get(STORAGE_KEYS.TRANSACTIONS, DEFAULT_TRANSACTIONS),
  saveTransactions: (data) => SellerStorage.set(STORAGE_KEYS.TRANSACTIONS, data),

  // ========================================================================
  // METHODS CHO BRIEFS & PROPOSALS (VAI TRÒ 2 - MAKER)
  // ========================================================================
  getBriefs: () => {
    let briefs = SellerStorage.get(STORAGE_KEYS.BRIEFS, DEFAULT_BRIEFS);
    // Tự động đồng bộ các brief do Buyer tạo mới qua localStorage
    try {
      const buyerBriefs = JSON.parse(localStorage.getItem('craftlink_briefs')) || [];
      buyerBriefs.forEach(b => {
        const id = b.id || ('BR-' + (b.title ? b.title.slice(0, 3).toUpperCase() : 'BUY') + '-01');
        if (!briefs.some(item => item.id === id || (b.title && item.title === b.title))) {
          briefs.unshift({
            id: id,
            customerName: b.customerName || b.buyerName || 'Khách hàng Buyer',
            customerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            title: b.title || b.productName || 'Yêu cầu đặt làm riêng theo yêu cầu',
            category: b.category || 'Dệt may thổ cẩm',
            budget: b.budget || '1.500.000 - 3.500.000 đ',
            deadline: b.deadline || '25 ngày tới',
            status: 'pending',
            statusText: 'Mới gửi',
            description: b.description || b.requirements || b.aiSummary || 'Khách hàng gửi yêu cầu tùy biến chi tiết từ AI Creative Brief Builder.',
            createdAt: b.createdAt || 'Vừa xong'
          });
        }
      });
    } catch(e) {}
    return briefs;
  },
  saveBriefs: (data) => SellerStorage.set(STORAGE_KEYS.BRIEFS, data),
  getBriefById: (id) => {
    const list = window.SellerData.getBriefs();
    return list.find(b => b.id === id);
  },
  updateBriefStatus: (id, newStatus, newStatusText) => {
    const list = SellerStorage.get(STORAGE_KEYS.BRIEFS, DEFAULT_BRIEFS);
    const index = list.findIndex(b => b.id === id);
    if (index !== -1) {
      list[index].status = newStatus;
      if (newStatusText) list[index].statusText = newStatusText;
      SellerStorage.set(STORAGE_KEYS.BRIEFS, list);
      return list[index];
    }
    return null;
  },

  getProposals: () => SellerStorage.get(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS),
  saveProposals: (data) => SellerStorage.set(STORAGE_KEYS.PROPOSALS, data),
  getProposalById: (id) => {
    const list = SellerStorage.get(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS);
    return list.find(p => p.id === id);
  },
  getProposalByBriefId: (briefId) => {
    const list = SellerStorage.get(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS);
    return list.find(p => p.briefId === briefId);
  },
  saveProposal: (proposalData) => {
    const list = SellerStorage.get(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS);
    const existingIndex = list.findIndex(p => p.id === proposalData.id || (proposalData.briefId && p.briefId === proposalData.briefId));
    if (existingIndex !== -1) {
      list[existingIndex] = { ...list[existingIndex], ...proposalData };
    } else {
      list.unshift(proposalData);
    }
    SellerStorage.set(STORAGE_KEYS.PROPOSALS, list);

    // Tự động cập nhật trạng thái Brief tương ứng thành 'proposed'
    if (proposalData.briefId) {
      window.SellerData.updateBriefStatus(proposalData.briefId, 'proposed', 'Đã gửi đề xuất');
    }
    return proposalData;
  },
  deleteProposal: (id) => {
    const list = SellerStorage.get(STORAGE_KEYS.PROPOSALS, DEFAULT_PROPOSALS);
    const filtered = list.filter(p => p.id !== id);
    SellerStorage.set(STORAGE_KEYS.PROPOSALS, filtered);
    return filtered;
  },

  resetAll: () => SellerStorage.resetToDefault()
};
