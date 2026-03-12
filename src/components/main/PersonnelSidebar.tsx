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
    <div className="flex h-auto w-80 shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-6">
        <div className="flex justify-center">
          <img
            src="https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
            alt="Avatar nhân sự"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>

        <div className="mt-4 text-center">
          <h2 className="font-bold">Nguyễn Văn A</h2>
          <p className="text-sm text-gray-500">Giảng viên cao cấp</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="flex flex-col space-y-1">
          {MENU_ITEMS.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100"
            >
              <span className="text-sm font-medium">{item}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
