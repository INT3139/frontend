import { Bell, LayoutGrid } from 'lucide-react';

export function MainHeader() {
  return (
    <header className="relative flex h-14 items-center px-4 border-b">
      <div className="absolute left-1/2 -translate-x-1/2 font-semibold uppercase">
        HỆ THỐNG QUẢN LÝ NGUỒN NHÂN LỰC
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <Bell />
        <LayoutGrid />
        <div className="flex items-center gap-2">
          <img
            className="w-10 h-10 rounded-full object-cover"
            src="https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
            alt="rounded avatar"
          />
          <span className="font-medium">Nguyễn Văn A</span>
        </div>
      </div>
    </header>
  );
}
