const MENU_ITEMS = [
  'Thông tin nhân sự',
  'Thông tin tuyển dụng',
  'Quá trình công tác, hoạt động Đảng - đoàn thể',
  'Quá trình Đào tạo, bồi dưỡng',
  'Thông tin lương',
  'Danh hiệu thi đua, khen thưởng, kỷ luật',
  'Tình trạng sức khỏe',
  'Quan hệ gia đình',
  'Thông tin khác',
];

export function PersonnelSidebar() {
  return (
    <div className="flex flex-col w-80 border-r border-gray-200 h-screen bg-white">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-center">
          <img
            src="https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
            alt="Avatar nhân sự"
            className="w-32 h-32 object-cover rounded-full"
          />
        </div>

        <div className="mt-4 text-center">
          <h2 className="font-bold">Nguyễn Văn A</h2>
          <p className="text-sm text-gray-500">Giảng viên cao cấp</p>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <nav className="flex flex-col space-y-1">
          {MENU_ITEMS.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100"
            >
              <span className="text-sm font-medium">{item}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
