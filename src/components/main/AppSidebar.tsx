import logo from '@/assets/UET.svg';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
        <div className="flex flex-row items-center justify-center py-1">
          <img src={logo} alt="UET Logo" className="h-14 w-14" />
        </div>
        <div
          className={cn(
            'px-5 py-3 pl-6',
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
        <div className="flex w-full flex-col gap-2">
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
  const { open: sidebarOpen } = useSidebar();

  const isActive =
    'to' in nav
      ? isRouteActive(pathname, nav.to)
      : nav.items.some((item) => isRouteActive(pathname, item.to));

  const hasItems = nav.items && nav.items?.length;

  if (!sidebarOpen) {
    if (hasItems) {
      return (
        <DropdownMenu>
          <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <NavItemButton active={isActive} className="w-full py-3" center>
                  <NavItemContent icon={nav.icon} label={nav.label} />
                </NavItemButton>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side={'bottom'}>
              <p>{nav.label}</p>
            </TooltipContent>
          </Tooltip>

          <DropdownMenuContent
            className={cn(
              'overflow-y-auto',
              'max-h-(--radix-menubar-content-available-height)',
            )}
            side="right"
            align="start"
            sideOffset={16}
          >
            {nav.items?.map((item) => {
              const isSubActive = isRouteActive(pathname, item.to);
              return (
                <DropdownMenuItem key={item.label}>
                  <Button
                    variant={isSubActive ? 'secondary' : 'ghost'}
                    className="h-auto w-full justify-start text-left"
                    asChild
                  >
                    <Link to={item.to}>
                      <span className="text-wrap">{item.label}</span>
                    </Link>
                  </Button>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    } else {
      return (
        <Tooltip delayDuration={400}>
          <TooltipTrigger asChild>
            <NavItemButton active={isActive} asChild center>
              <Link key={nav.label} to={nav.to}>
                <NavItemContent icon={nav.icon} label={nav.label} />
              </Link>
            </NavItemButton>
          </TooltipTrigger>
          <TooltipContent side={'bottom'}>
            <p>{nav.label}</p>
          </TooltipContent>
        </Tooltip>
      );
    }
  }

  if (hasItems) {
    return (
      <Collapsible className="group" key={nav.label}>
        <CollapsibleTrigger className="w-full" asChild>
          <NavItemButton active={isActive}>
            <NavItemContent icon={nav.icon} label={nav.label} />
            <span className="ml-auto shrink-0">
              <ChevronRight
                className={cn(
                  'transition-transform',
                  'group-data-[state=open]:rotate-90',
                )}
              />
            </span>
          </NavItemButton>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 flex flex-col gap-1 pr-6 pl-9">
          {nav.items.map((item) => {
            const isSubActive = isRouteActive(pathname, item.to);
            return (
              <Button
                variant={isSubActive ? 'secondary' : 'ghost'}
                className="h-auto w-full justify-start text-left active:scale-96"
                asChild
              >
                <Link key={item.label} to={item.to}>
                  <span className="text-wrap">{item.label}</span>
                </Link>
              </Button>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  } else {
    return (
      <NavItemButton active={isActive} asChild>
        <Link key={nav.label} to={nav.to}>
          <NavItemContent icon={nav.icon} label={nav.label} />
        </Link>
      </NavItemButton>
    );
  }
}

function NavItemButton({
  active,
  center,
  className,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  active?: boolean;
  center?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant={active ? 'secondary' : 'ghost'}
      className={cn(
        'h-auto w-full py-3 active:scale-96',
        center ? 'justify-center' : 'justify-start',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

function NavItemContent({
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
