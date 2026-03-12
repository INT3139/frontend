import { cn } from '@/lib/utils';
import { Link, useLocation } from '@tanstack/react-router';

const MENU_ITEMS = [
  { label: 'Thông tin nhân sự', path: '/personnel-cv' },
  { label: 'Thông tin tuyển dụng', path: '/personnel-cv' },
  {
    label: 'Quá trình công tác, hoạt động Đảng - đoàn thể',
    path: '/personnel-cv',
  },
  { label: 'Quá trình Đào tạo, bồi dưỡng', path: '/personnel-cv' },
  { label: 'Thông tin lương', path: '/personnel-cv' },
  { label: 'Danh hiệu thi đua, khen thưởng, kỷ luật', path: '/personnel-cv' },
  { label: 'Tình trạng sức khỏe', path: '/personnel-cv' },
  { label: 'Quan hệ gia đình', path: '/personnel-cv/family' },
  { label: 'Thông tin khác', path: '/personnel-cv/others' },
];

export function PersonnelSidebar() {
  const { pathname } = useLocation();

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
          {MENU_ITEMS.map((item, index) => {
            const isActive =
              pathname === item.path ||
              (pathname.startsWith(item.path) && item.path !== '/personnel-cv');

            return (
              <Link
                key={index}
                to={item.path}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-700 hover:bg-gray-100',
                )}
              >
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
