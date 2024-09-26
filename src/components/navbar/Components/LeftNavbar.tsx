import { memo, useState } from 'react';
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
  NavLogo,
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
  collapseNav?: boolean;
}

const normalizePath = (path: string) => path.replace(/\/+$/, '');

const NavItem = memo(
  ({
    to,
    label,
    Symbol,
    currentPath,
    onClick,
    logout,
    collapseNav,
  }: NavItemProps) => {
    const currentPathNormalized = normalizePath(currentPath);
    const toNormalized = normalizePath(to);

    const active = currentPathNormalized.includes(toNormalized);

    return (
      <Link href={to}>
        <div
          className={cn([
            `w-full group hover:bg-hoverNav hover:text-heading cursor-pointer p-3 flex items-center rounded-lg`,
            active && 'bg-background text-heading font-extrabold',
            !collapseNav ? 'justify-center w-fit' : 'space-x-3',
          ])}
          onClick={onClick}
        >
          <Symbol
            className={cn([
              'w-15 group-hover:scale-125 transition-transform',
              active && ' stroke-brand fill-none',
            ])}
          />
          {collapseNav && (
            <p
              className={`font-medium text-sm ${logout === true ? 'text-[#EE2750]' : ''}`}
            >
              {label}
            </p>
          )}
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
  collapseNav: boolean;
  setCollapseNav: (state: boolean) => void;
}

const LeftNavbar = ({
  open,
  setOpen,
  collapseNav,
  setCollapseNav,
}: LeftNavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClickSettings = () => {
    router.push(settingsUrl);
  };

  return (
    <div
      className={cn(
        'fixed z-30 xl:static h-full bg-back border-[1px] border-[#DFE3E6] border-solid rounded-r-3xl w-0  transition-all duration-300 flex-none',
        open && 'w-full',
        collapseNav ? ' lg:min-w-72' : 'lg:min-w-16'
      )}
    >
      <div className="h-full w-full overflow-y-auto sm:overflow-hidden">
        <div className="flex flex-col h-full min-w-[13rem] 2xl:min-w-[18rem] ">
          <div className="h-full px-4 flex flex-col justify-between">
            <div>
              {collapseNav ? (
                <div className="flex justify-between items-center flex-col gap-6 mt-4">
                  <div className=" w-full flex items-start  ml-4 mb-8">
                    <NavIcon className="text-headingColor flex items-start" />
                  </div>
                </div>
              ) : (
                <div className="w-fit flex items-center my-4">
                  <NavLogo />
                </div>
              )}
              {collapseNav ? (
                <hr className="flex w-[88%] border-[1px] border-solid border-[#DFE3E6]" />
              ) : (
                ''
              )}
              {collapseNav ? (
                <div className="flex bg-white items-center bg-backgound h-16 rounded-md border-[1px] border-solid w-[98%] border-[#DFE3E6] mt-7">
                  <div className="mx-2">
                    <UserIcon />
                  </div>
                  <div className="flex flex-col justify-between items-start w-4/6">
                    <span className="text-headingColor font-bold text-[15px]">
                      Kate Russell
                    </span>
                    <span className="text-[#83899F] font-normal text-sm">
                      kate@gmail.com
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-8 mb-4">
                  <UserIcon />
                </div>
              )}

              <div className="flex flex-col space-y-1">
                {collapseNav && (
                  <div className="mt-2 pl-3">
                    <span className="text-headingColor text-[10px] font-[500] tracking-[0.5px] leading-3">
                      MAIN
                    </span>
                  </div>
                )}
                {navItems.map(({ to, label, Symbol }) => (
                  <NavItem
                    key={to}
                    to={to}
                    label={label}
                    Symbol={Symbol}
                    currentPath={pathname}
                    onClick={() => setOpen(false)}
                    collapseNav={collapseNav}
                  />
                ))}
                {collapseNav ? (
                  <div className="flex justify-center items-center w-[88%]">
                    <hr className="flex w-full border-[1px] border-solid border-[#DFE3E6]  mt-4" />
                  </div>
                ) : (
                  ''
                )}
              </div>

              <div className="flex flex-col py-3 space-y-1">
                {collapseNav ? (
                  <div className="pl-3">
                    <span className="text-headingColor text-[10px] font-[500] tracking-[0.5px] leading-3">
                      SETTINGS
                    </span>
                  </div>
                ) : (
                  ''
                )}
                {settingItems.map(({ to, label, Symbol }) => (
                  <NavItem
                    key={to}
                    to={to}
                    label={label}
                    Symbol={Symbol}
                    currentPath={pathname}
                    onClick={() => setOpen(false)}
                    collapseNav={collapseNav}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col pb-3 space-y-1">
              {profileItems.map(({ to, label, Symbol, logout }) => (
                <NavItem
                  key={to}
                  to={to}
                  label={label}
                  Symbol={Symbol}
                  logout={logout}
                  currentPath={pathname}
                  onClick={() => setOpen(false)}
                  collapseNav={collapseNav}
                />
              ))}
              {collapseNav ? (
                <div className="w-[90%]">
                  <DarkToggle />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
