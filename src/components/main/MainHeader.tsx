import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { profileQueryOptions } from '@/hooks/use-profile';
import { shortenName } from '@/lib/shorten-name';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { Bell, CircleUserRound, LayoutGrid, LogOutIcon } from 'lucide-react';
import { toast } from 'sonner';

const defaultAvatar =
  'https://cdn2.fptshop.com.vn/small/avatar_trang_1_cd729c335b.jpg';

export function MainHeader() {
  const navigate = useNavigate();
  const { data: profile } = useSuspenseQuery(profileQueryOptions);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    toast.success('Đăng xuất thành công!');
    navigate({ to: '/login' });
  };

  return (
    <header className="relative flex h-16 items-center border-b px-4">
      <div className="absolute left-1/2 -translate-x-1/2 font-semibold uppercase">
        HỆ THỐNG QUẢN LÝ NGUỒN NHÂN LỰC
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="lg" className="has-[>svg]:px-2">
          <LayoutGrid className="size-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="size-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar>
                <AvatarImage src={defaultAvatar} />
                <AvatarFallback>
                  {shortenName(profile?.fullName)}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium">{profile?.fullName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link to={'#' as string} className="flex cursor-pointer">
                  <CircleUserRound />
                  <span>Tài khoản</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  className="w-full cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOutIcon />
                  <span>Đăng xuất</span>
                </button>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
