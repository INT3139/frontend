import { Link } from '@tanstack/react-router';

const MENU_ITEMS = [
  { label: 'Thông tin nhân sự', to: '/personnel-cv' },
  { label: 'Thông tin tuyển dụng', to: '/personnel-cv/recruitment' },
  {
    label: 'Quá trình công tác, hoạt động Đảng - đoàn thể',
    to: '/personnel-cv/work-history',
  },
  { label: 'Quá trình Đào tạo, bồi dưỡng', to: '/personnel-cv/training' },
  { label: 'Quá trình ký hợp đồng', to: '/personnel-cv/contract' },
  { label: 'Thông tin lương', to: '/personnel-cv/salary' },
  {
    label: 'Danh hiệu thi đua, khen thưởng, kỷ luật',
    to: '/personnel-cv/awards-and-disciplines',
  },
  { label: 'Tình trạng sức khỏe', to: '/personnel-cv/health' },
  { label: 'Quan hệ gia đình', to: '/personnel-cv/family' },
  { label: 'Thông tin khác', to: '/personnel-cv/other' },
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
            <Link
              key={index}
              to={item.to}
              activeOptions={{ exact: true }}
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-100 [&.active]:bg-gray-100 [&.active]:font-semibold"
            >
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
