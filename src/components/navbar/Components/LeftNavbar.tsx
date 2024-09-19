import { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/cn';

import {
  DashboardIcon,
  CalendarIcon,
  EventIcon,
  OffersIcon,
  SettingsIcon,
  LogoIcon,
} from '@/assets/svgs';
import Image from '@/components/ui/next-image';
import {
  settingsUrl,
  calendarUrl,
  dashboardUrl,
  eventsUrl,
  offersUrl,
  signupUrl,
} from '@/configs/constants';
import { DarkToggle } from './DarkToggle';
import { Events } from './Events';
import { Hamburger } from './Hamburger';

interface NavItemProps {
  to: string;
  label: string;
  Symbol: React.ElementType;
  currentPath: string;
  onClick: () => void;
}

const normalizePath = (path: string) => path.replace(/\/+$/, '');

const NavItem = memo(
  ({ to, label, Symbol, currentPath, onClick }: NavItemProps) => {
    const currentPathNormalized = normalizePath(currentPath);
    const toNormalized = normalizePath(to);

    const active = currentPathNormalized.includes(toNormalized);

    return (
      <Link href={to}>
        <div
          className={cn([
            'text-lg text-secondary w-full group hover:bg-primary-hover hover:text-heading cursor-pointer p-3 flex space-x-3 items-center rounded-lg',
            active && 'bg-primary-background text-primary font-extrabold',
          ])}
          onClick={onClick}
        >
          <Symbol
            className={cn([
              'w-5 group-hover:scale-125 transition-transform ',
              active && ' stroke-brand fill-none',
            ])}
          />
          <p className="font-medium text-md">{label}</p>
        </div>
      </Link>
    );
  }
);

const navItems = [
  { to: signupUrl, label: 'SignUp', Symbol: CalendarIcon },
  { to: dashboardUrl, label: 'Dashboard', Symbol: DashboardIcon },
  { to: calendarUrl, label: 'Calendar', Symbol: CalendarIcon },
];

NavItem.displayName = 'NavItem';

interface LeftNavbarProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

const LeftNavbar = ({ open, setOpen }: LeftNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickSettings = () => {
    router.push(settingsUrl);
  };

  return (
    <div
      className={cn(
        'fixed z-30 xl:static h-full bg-background w-0 xl:w-72 transition-all duration-300 flex-none ',
        open && 'w-full'
      )}
    >
      <div className="h-full w-full overflow-y-auto sm:overflow-hidden ">
        <div className="flex flex-col h-full min-w-[15rem] 2xl:min-w-[18rem] ">
          <div className="h-full px-4 ">
            <div className="flex justify-between items-center ">
              <LogoIcon className="text-headingColor " />
              {open && <Hamburger open={open} setOpen={setOpen} />}
            </div>
            <div className="flex flex-col pb-3 space-y-2">
              {navItems.map(({ to, label, Symbol }) => (
                <NavItem
                  key={to}
                  to={to}
                  label={label}
                  Symbol={Symbol}
                  currentPath={pathname}
                  onClick={() => setOpen(false)}
                />
              ))}
            </div>
            <div className="w-full mt-12">
              <Events />
            </div>
            <div className="w-full mt-12 sm:mt-28">
              <DarkToggle />
            </div>
            <div className="w-full flex flex-col gap-y-2  sm:mb-0 mt-2">
              <p className="text-primary text-sm cursor-pointer">
                Terms of Use
              </p>
              <p className="text-primary text-sm cursor-pointer pb-4">
                Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
