import { memo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

import { cn } from '@/lib/cn';

import {
  DashboardIcon,
  CalendarIcon,
  HomeIcon,
  SetupIcon,
  IncomeIcon,
  DeductionIcon,
  ReviewIcon,
  ZakatIcon,
  ProfileIcon,
  SettingsIcon,
  NavIcon,
  UserIcon,
  HelpIcon,
  LogoutIcon,
} from '@/assets/svgs';
import Image from '@/components/ui/next-image';
import {
  homeUrl,
  setupUrl,
  incomeUrl,
  deductionUrl,
  reviewUrl,
  zakatUrl,
  settingsUrl,
  profileUrl,
  helpUrl,
  signoutUrl,
} from '@/configs/constants';
import { DarkToggle } from './DarkToggle';
import { Hamburger } from './Hamburger';

interface NavItemProps {
  to: string;
  label: string;
  Symbol: React.ElementType;
  currentPath: string;
  onClick: () => void;
  logout?: boolean;
}

const normalizePath = (path: string) => path.replace(/\/+$/, '');

const NavItem = memo(
  ({ to, label, Symbol, currentPath, onClick, logout }: NavItemProps) => {
    const currentPathNormalized = normalizePath(currentPath);
    const toNormalized = normalizePath(to);

    const active = currentPathNormalized.includes(toNormalized);

    return (
      <Link href={to}>
        <div
          className={cn([
            `text-lg text-heading w-full group hover:bg-hoverNav hover:text-heading cursor-pointer p-3 flex space-x-3 items-center rounded-lg`,
            active && 'bg-background text-heading font-extrabold',
          ])}
          onClick={onClick}
        >
          <Symbol
            className={cn([
              'w-15 group-hover:scale-125 transition-transform',
              active && ' stroke-brand fill-none',
            ])}
          />
          <p
            className={`font-medium text-md ${logout === true ? 'text-[#EE2750]' : ''}`}
          >
            {label}
          </p>
        </div>
      </Link>
    );
  }
);

const navItems = [
  { to: homeUrl, label: 'Home', Symbol: HomeIcon },
  { to: setupUrl, label: 'Setup', Symbol: SetupIcon },
  { to: incomeUrl, label: 'Income', Symbol: IncomeIcon },
  { to: deductionUrl, label: 'Deductions', Symbol: DeductionIcon },
  { to: reviewUrl, label: 'Reviews', Symbol: ReviewIcon },
  { to: zakatUrl, label: 'Pay Zakat', Symbol: ZakatIcon },
];

const settingItems = [
  { to: profileUrl, label: 'Profile', Symbol: ProfileIcon },
  { to: settingsUrl, label: 'Settings', Symbol: SettingsIcon },
];

const profileItems = [
  { to: helpUrl, label: 'Help', Symbol: HelpIcon },
  { to: signoutUrl, label: 'Logout Account', Symbol: LogoutIcon, logout: true },
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
        'fixed z-30 xl:static h-full bg-back border-[1px] border-[#DFE3E6] border-solid rounded-r-3xl w-0 xl:w-80 transition-all duration-300 flex-none',
        open && 'w-full'
      )}
    >
      <div className="h-full w-full overflow-y-auto sm:overflow-hidden">
        <div className="flex flex-col h-full min-w-[13rem] 2xl:min-w-[18rem] ">
          <div className="h-full px-4 flex flex-col justify-evenly">
            <div className="flex justify-between items-start flex-col gap-6">
              <NavIcon className="text-headingColor " />
              {open && <Hamburger open={open} setOpen={setOpen} />}
              <hr className="w-[275px] border-[1px] border-solid border-[#DFE3E6]" />
            </div>
            <div className="flex justify-evenly items-center bg-backgound h-20 rounded-md border-[1px] border-solid border-[#DFE3E6]">
              <div>
                <UserIcon />
              </div>
              <div className="flex flex-col justify-between items-start w-4/6">
                <span className="text-headingColor font-[700]">
                  Kate Russell
                </span>
                <span className="text-[#83899F] font-[400]">
                  kate@gmail.com
                </span>
              </div>
            </div>

            <div className="flex flex-col pb-3 space-y-2">
              <div>
                <span className="pl-2 text-headingColor font-[500]">MAIN</span>
              </div>
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
              <hr className="w-[275px] border-[1px] border-solid border-[#DFE3E6]" />
            </div>

            <div className="flex flex-col pb-3 space-y-2">
              <div>
                <span className="pl-2 text-headingColor font-[500]">
                  SETTINGS
                </span>
              </div>
              {settingItems.map(({ to, label, Symbol }) => (
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

            <div className="flex flex-col pb-3 space-y-2">
              {profileItems.map(({ to, label, Symbol, logout }) => (
                <NavItem
                  key={to}
                  to={to}
                  label={label}
                  Symbol={Symbol}
                  logout={logout}
                  currentPath={pathname}
                  onClick={() => setOpen(false)}
                />
              ))}
              <div className="w-full mt-12 sm:mt-28">
                <DarkToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
