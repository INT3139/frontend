import { shortenName } from '@/lib/shorten-name';
import { Route as AuthLayoutRoute } from '@/routes/(protected)/_authenticated';
import { Bell, LayoutGrid } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const defaultAvatar =
  'https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg';

export function MainHeader() {
  const profile = AuthLayoutRoute.useRouteContext();

  return (
    <header className="relative flex h-16 items-center border-b px-4">
      <div className="absolute left-1/2 -translate-x-1/2 font-semibold uppercase">
        HỆ THỐNG QUẢN LÝ NGUỒN NHÂN LỰC
      </div>

      <div className="ml-auto flex items-center gap-4">
        <Bell />
        <LayoutGrid />
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={defaultAvatar} />
            <AvatarFallback>{shortenName(profile?.fullName)}</AvatarFallback>
          </Avatar>
          <span className="font-medium">{profile?.fullName}</span>
        </div>
      </div>
    </header>
  );
}
