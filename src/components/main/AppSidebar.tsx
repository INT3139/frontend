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
import { cn } from '@/lib/utils';
import { Route as academicProjectsRoute } from '@/routes/(protected)/_authenticated/academic-cv/projects';
import { Route as academicScholarlyWorksRoute } from '@/routes/(protected)/_authenticated/academic-cv/scholarly-works';
import { Route as personnelCVRoute } from '@/routes/(protected)/_authenticated/personnel-cv';
import { Link } from '@tanstack/react-router';
import {
  BrainCircuit,
  ChevronRight,
  ChevronsLeft,
  FileUser,
  SquareUserRound,
} from 'lucide-react';

type SidebarSubItem = {
  label: string;
  to?: string;
};

type SidebarItem = {
  label: string;
  icon?: React.ReactNode;
} & (
  | { items: SidebarSubItem[]; to?: never }
  | {
      items?: never;
      to: string;
    }
);

const SIDEBAR_NAV_ITEMS: SidebarItem[] = [
  {
    label: 'Tra cứu nhân sự',
    icon: <SquareUserRound />,
    items: [
      {
        label: 'Danh sách nhân sự',
        to: '/',
      },
    ],
  },
  {
    label: 'Lý lịch nhân sự',
    icon: <FileUser />,
    to: personnelCVRoute.to,
  },
  {
    label: 'Lý lịch khoa học',
    icon: <BrainCircuit />,
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
        to: '/',
      },
    ],
  },
];

export function AppSidebar() {
  const renderNavigation = (nav: SidebarItem) => {
    if (nav.items && nav.items.length > 0) {
      return (
        <Collapsible className="group" key={nav.label}>
          <CollapsibleTrigger className="w-full">
            <Button
              variant="ghost"
              className="w-full justify-between has-[>svg]:px-4"
            >
              <div className="flex flex-row items-center gap-2">
                {nav.icon}
                <span
                  className={cn(
                    'truncate',
                    'group-data-[collapsible=icon]:hidden',
                  )}
                >
                  {nav.label}
                </span>
              </div>
              <ChevronRight
                className={cn(
                  'transition-transform',
                  'group-data-[collapsible=icon]:hidden',
                  'group-data-[state=open]:rotate-90',
                )}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-1 ml-5">
            {nav.items.map((item) => (
              <Link key={item.label} to={item.to}>
                <Button variant="ghost" className="w-full justify-start">
                  <span className="truncate">{item.label}</span>
                </Button>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
      );
    } else {
      return (
        <Link key={nav.label} to={nav.to}>
          <Button variant="ghost" className="w-full justify-between">
            <div className="flex flex-row items-center gap-2">
              {nav.icon}
              <span className="truncate group-data-[collapsible=icon]:hidden">
                {nav.label}
              </span>
            </div>
          </Button>
        </Link>
      );
    }
  };

  return (
    <Sidebar collapsible="icon" className="transform transition-all">
      <SidebarHeader className="gap-0 p-0">
        <div className="flex flex-row items-center justify-center p-2">
          <img src={logo} alt="UET Logo" className="h-14 w-14" />
        </div>
        <div
          className={cn(
            'p-2',
            'bg-blue-950 text-amber-50',
            'flex flex-row justify-between',
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
      <SidebarContent>
        <div className="flex flex-col gap-2">
          {SIDEBAR_NAV_ITEMS.map((nav) => renderNavigation(nav))}
        </div>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
