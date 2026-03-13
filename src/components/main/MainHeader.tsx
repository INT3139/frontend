import { Bell, LayoutGrid } from 'lucide-react';

export function MainHeader() {
  return (
    <header className="relative flex h-14 items-center border-b px-4">
      <div className="absolute left-1/2 -translate-x-1/2 font-semibold uppercase">
        HỆ THỐNG QUẢN LÝ NGUỒN NHÂN LỰC
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Bell />
        <LayoutGrid />
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg"
            alt="rounded avatar"
          />
          <span className="font-medium">Nguyễn Văn A</span>
        </div>
      </div>
    </header>
  );
}
