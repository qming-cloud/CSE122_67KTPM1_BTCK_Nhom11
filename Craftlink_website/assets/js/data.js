const mockProducts = [
  {
    id: 1,
    name: "Khăn Choàng Thổ Cẩm Lanh Chàm H'Mông",
    price: 850000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6MeeHyxvVHtgsAkMUxbTyaklNh9gGF5LCO0h-LRJ72ce-2a7o9R8EauJGLCBxsmTOTjxoXMfWN0pDhWzqrUsnAR4umWx0XlluBn-5gy2vZCQ4-y0BrjHpBwnhkmy7nxmSLRFLjJS6Tj2grneYDsKhHCGaxAFgiH9qKTY3pYHZwKTXjRLpSEdqK1Gib0tG3gEIvdsJe12Act0hxnjy8TCFfg-HsDSOwDYee910v7LYp0BUvmZUIcxf",
    rating: 4.9,
    reviews: 42,
    tribe: "H'Mông",
    material: "Lanh gai dầu & Chàm"
  },
  {
    id: 2,
    name: "Túi Tote Thêu Tay Họa Tiết Trống Đồng",
    price: 650000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd-9y6j0p458-heKTEQHtwZxdWLyrG7p7yeSEoC9L3kRiGekGTtOsIkkB1fTP7_fwP5BULH47z851BpMn0WuSzBy33BZqULJy3Sl0NSceUUJXfr_zynveJn7ANswoac_9G6rUBNYXrbe1A9viirixSf7XGDujBVTSerINDqyJkU7o6BqXI2wPoGZo798Zy9kNS_1khSRukXaZfkcRn49A03hIExQhuUklgQ7J7fDDdjCLca4thDoNr",
    rating: 4.8,
    reviews: 28,
    tribe: "Dao Đỏ Tuyên Quang",
    material: "Vải bố & Chỉ thêu"
  },
  {
    id: 3,
    name: "Váy Quấn Truyền Thống Dệt Zèng",
    price: 1200000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9AKsnSV7fTSSlJmmDyLZo6dpZQDwnC8NOwMXESN8sRte46fMnPdp5B9gJ1yo2d9fWNU1BGCz1KN7dxjGgGRiVPACtnrNTaiR_idwi-xPYuPrcW6FWe5tTNuHiV9rOvmHLz4ghE9n95rX6VJfTAXvJiFCYy3EK8Ps6d0yIeQ9atmEKSm-XVnFndTfDcnmqipMVsGSL43YoGcYeiXxWh8If2tXsK5sJ1IONWeO9rSr_Wf4faAWu3_jo",
    rating: 5.0,
    reviews: 15,
    tribe: "Tà Ôi (A Lưới)",
    material: "Chỉ cườm chì Zèng cổ"
  },
  {
    id: 4,
    name: "Khăn Lụa Tơ Tằm Nhuộm Củ Nâu",
    price: 450000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD93GfF4gMr0tx2aDHXn3RyKFplJkXo5JD9v2YMAifer9sWPHP3ceVYKH_3mIsm_eXZAT7lz3ES7SwIPPjSdaU3kweVbFmE5wqMofDn4ROjda_-hAlAXMnL6kFgJkHm_ynfJSsScGvAp8ZrW6_3UaCl41dHd68_n66VG2kMH0RrERWVdixg8RaiUdipqrGwMdUT2RAoMWs4sPTwezOOe9Rsui2Yqr8tRuNWdQa_2aIl1G3deRaGZQfd",
    rating: 4.7,
    reviews: 56,
    tribe: "Thái Đen & Thái Trắng",
    material: "Lụa tơ tằm dệt tay truyền thống"
  },
  {
    id: 5,
    name: "Áo Dài Cách Tân Thổ Cẩm Kẻ Sọc",
    price: 1850000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBicsfaq39Ix-LzvngL8k6ZH6_Bx0DKdjLlQkIwTR7ymVVNPIOem4t2VTMM-wcE8cn8xvj37sJp2kzuifoP1slXQLTV1q1DTLa5Hvx6kFG14Tsce2knph43dH4NMkf11Mw3yJmQ23E30TlBMjncDviqlnPjAy49cMKKrhkkpAPowr2-iYvh3ICL6LmnhZ_i1TUCW9DK2DFimWQoMjj9jWJTi3JtLaPHYGPCj2ln95PNuSLHPRFivOgP",
    rating: 4.9,
    reviews: 11,
    tribe: "Chăm Ninh Thuận",
    material: "Bông đồi tự nhiên (Organic Cotton)"
  },
  {
    id: 6,
    name: "Vỏ Gối Sofa Họa Tiết Kỷ Hà Thêu Tay",
    price: 320000,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSVx4dW4CrzVXsanBo3UrHj3Y26ploE4JOMOLYABURsg2H0ldaN25Lu1XlXxpUty0c3cny87lsEJnZsSUK0-j2ZhowZ0DKvOd230i3Xq1y5Y6zarVc6a64OKm8jFfeBdqcfDPopo0jEKyWZJqRHKguOt7L9VZFhKeydMlaYdiF3y9FuvkLdfKpA5Rj5EcoHIFHPGnERc2y2s2Yy8x3opuKq75kuUFuaHiCDukoyZ_31agyx58joT_P",
    rating: 4.6,
    reviews: 89,
    tribe: "Mường Hòa Bình",
    material: "Lanh gai dầu & Chàm"
  }
];
