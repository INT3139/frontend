import logo from '@/assets/UET.svg';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { isRouteActive } from '@/lib/sidebar';
import { cn } from '@/lib/utils';
import { Route as academicProjectsRoute } from '@/routes/(protected)/_authenticated/academic-cv/projects';
import { Route as academicScholarlyWorksRoute } from '@/routes/(protected)/_authenticated/academic-cv/scholarly-works';
import { Route as personnelCVRoute } from '@/routes/(protected)/_authenticated/personnel-cv';
import { Link, useLocation } from '@tanstack/react-router';
import {
  BrainCircuit,
  ChevronRight,
  ChevronsLeft,
  FileUser,
  SquareUserRound,
} from 'lucide-react';

type SidebarNavSubItem = {
  label: string;
  to: string;
};

type SidebarNavItem = {
  label: string;
  icon?: React.ReactNode;
} & (
  | { items: SidebarNavSubItem[]; to?: never }
  | {
      items?: never;
      to: string;
    }
);

const iconClassname = 'size-5';

const SIDEBAR_NAV_ITEMS: SidebarNavItem[] = [
  {
    label: 'Tra cứu nhân sự',
    icon: <SquareUserRound className={iconClassname} />,
    items: [
      {
        label: 'Danh sách nhân sự',
        to: '#',
      },
    ],
  },
  {
    label: 'Lý lịch nhân sự',
    icon: <FileUser className={iconClassname} />,
    to: personnelCVRoute.to,
  },
  {
    label: 'Lý lịch khoa học',
    icon: <BrainCircuit className={iconClassname} />,
    items: [
      {
        label: 'Nhiệm vụ KH&CN',
        to: academicProjectsRoute.to,
      },
      {
        label: 'Sách chuyên khảo/giáo trình',
        to: academicScholarlyWorksRoute.to,
      },
      {
        label: 'Sản phẩm đào tạo',
        to: '#',
      },

      {
        label: 'Sản phẩm KH&CN dạng I & II',
        to: '#',
      },
      {
        label: 'Phát minh sáng chế',
        to: '#',
      },
      {
        label: 'Bài báo khoa học',
        to: '#',
      },

      {
        label: 'Báo cáo khoa học',
        to: '#',
      },
      {
        label: 'Giải thưởng',
        to: '#',
      },
      {
        label: 'Những thông tin khác về hoạt động KHCN',
        to: '#',
      },
    ],
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" className="transform transition-all">
      <SidebarHeader className="gap-0 p-0">
        <div className="flex flex-row items-center justify-center p-2">
          <img src={logo} alt="UET Logo" className="h-14 w-14" />
        </div>
        <div
          className={cn(
            'py-3 px-5 pl-6',
            'bg-blue-950 text-amber-50',
            'flex flex-row justify-between',
            'group-data-[collapsible=icon]:pl-5',
            'group-data-[collapsible=icon]:justify-center',
          )}
        >
          <span
            className={cn(
              'truncate uppercase',
              'group-data-[collapsible=icon]:hidden',
            )}
          >
            Hồ sơ nhân sự
          </span>
          <SidebarTrigger
            icon={<ChevronsLeft />}
            className={cn(
              'group-data-[collapsible=icon]:rotate-180',
              'hover:bg-blue-900 hover:text-white',
            )}
          />
        </div>
      </SidebarHeader>
      <SidebarContent className="w-full p-2">
        <div className="flex flex-col gap-2 w-full">
          {SIDEBAR_NAV_ITEMS.map((nav) => (
            <SidebarNavItem key={nav.label} nav={nav} />
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

function SidebarNavItem({ nav }: { nav: SidebarNavItem }) {
  const { pathname } = useLocation();
  const isActive =
    'to' in nav
      ? isRouteActive(pathname, nav.to)
      : nav.items.some((item) => isRouteActive(pathname, item.to));
  console.log(pathname, nav.to, isActive);

  if (nav.items && nav.items.length > 0) {
    return (
      <Collapsible className="group" key={nav.label}>
        <CollapsibleTrigger className="w-full" asChild>
          <Button
            variant={isActive ? 'secondary' : 'ghost'}
            className="w-full h-auto has-[>svg]:px-0 py-3 active:scale-95"
          >
            <div
              className={cn(
                'w-full flex flex-row justify-between gap-2 items-center',
                'group-data-[collapsible=icon]:justify-center',
              )}
            >
              <SidebarNavItemContent icon={nav.icon} label={nav.label} />
              <ChevronRight
                className={cn(
                  'transition-transform',
                  'group-data-[collapsible=icon]:hidden',
                  'group-data-[state=open]:rotate-90',
                )}
              />
            </div>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 pl-9 pr-6">
          {nav.items.map((item) => {
            const isSubActive = isRouteActive(pathname, item.to);
            return (
              <Link key={item.label} to={item.to}>
                <Button
                  variant={isSubActive ? 'secondary' : 'ghost'}
                  className="w-full justify-start h-auto text-left"
                >
                  <span className="text-wrap">{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  } else {
    return (
      <Button
        variant={isActive ? 'secondary' : 'ghost'}
        className={cn(
          'w-full h-auto has-[>svg]:px-0 py-3 active:scale-95 justify-start',
          'group-data-[collapsible=icon]:justify-center',
        )}
        asChild
      >
        <Link key={nav.label} to={nav.to} className="justify-between">
          <SidebarNavItemContent icon={nav.icon} label={nav.label} />
        </Link>
      </Button>
    );
  }
}

function SidebarNavItemContent({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-row items-center gap-4 text-left text-wrap">
      {icon}
      <span className="group-data-[collapsible=icon]:hidden">{label}</span>
    </div>
  );
}
