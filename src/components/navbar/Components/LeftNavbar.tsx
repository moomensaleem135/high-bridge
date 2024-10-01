import { memo, useEffect, useState } from 'react';
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
  profilesetupUrl,
  helpUrl,
  signoutUrl,
} from '@/configs/constants';
import { DarkToggle } from './DarkToggle';
import { Hamburger } from './Hamburger';
import { matches } from 'cypress/types/lodash';

interface NavItemProps {
  to: string;
  label: string;
  Symbol: React.ElementType;
  currentPath: string;
  onClick: () => void;
  logout?: boolean;
  collapseNav?: boolean;
  setCollapseNav: (state: boolean) => void;
  open?: boolean;
  setOpen: (state: boolean) => void;
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
    setCollapseNav,
    open,
    setOpen,
  }: NavItemProps) => {
    const currentPathNormalized = normalizePath(currentPath);
    const toNormalized = normalizePath(to);

    const active = currentPathNormalized.includes(toNormalized);

    useEffect(() => {
      const handleResize = () => {
        console.log(window.innerWidth);

        // Update collapseNav to true if window width is less than or equal to 1024px (lg breakpoint)
        if (window.innerWidth <= 1024) {
          setCollapseNav(true);
        } else {
          setOpen(false);
        }
      };

      handleResize();

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [setCollapseNav]);

    return (
      <Link href={to}>
        <div
          className={cn([
            `w-[98%] group hover:bg-hoverNav hover:text-heading cursor-pointer p-3 flex items-center rounded-lg`,
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
              className={`font-medium text-sm ${logout === true ? 'text-logoutText' : ''}`}
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
  { to: profilesetupUrl, label: 'Setup', Symbol: SetupIcon },
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
        'z-30 xl:static h-full bg-back border-[1px] border-navBorder border-solid rounded-r-3xl w-0  transition-all duration-300 flex-none',
        open && 'w-full',
        collapseNav ? 'lg:min-w-72 lg:max-w-72 ' : 'lg:min-w-24 lg:max-w-24'
      )}
    >
      <div
        className={cn(
          'h-full w-full overflow-y-auto sm:overflow-hidden ',
          !collapseNav && 'flex lg:justify-center lg:items-center'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="h-full px-4 flex flex-col justify-between">
            <div
              className={cn(
                !collapseNav && 'flex flex-col justify-between items-center'
              )}
            >
              {!open && (
                <div
                  className={`flex items-center ${collapseNav ? 'justify-between flex-col gap-6 mt-4' : 'w-fit mt-5 mb-10'}`}
                >
                  {collapseNav ? (
                    <div className="w-full flex items-start ml-4 mb-8">
                      <NavIcon className="text-headingColor" />
                    </div>
                  ) : (
                    <NavLogo />
                  )}
                </div>
              )}

              {!open && (
                <hr className="flex w-[88%] border-[1px] border-solid border-underline" />
              )}
              {collapseNav ? (
                <div className="flex bg-white items-center bg-backgound h-16 rounded-md border-[1px] border-solid w-[98%] border-navBorder mt-7">
                  <div className="mx-2">
                    <UserIcon />
                  </div>
                  <div className="flex flex-col justify-between items-start w-4/6">
                    <span className="text-black font-bold text-[15px]">
                      Kate Russell
                    </span>
                    <span className="text-userMail font-normal text-sm">
                      kate@gmail.com
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-9 mb-4">
                  <UserIcon />
                </div>
              )}
              <div
                className={cn(
                  'flex flex-col overflow-auto',
                  !collapseNav
                    ? ' h-[calc(100vh_-_180px)]'
                    : ' h-[calc(100vh_-_200px)]'
                )}
              >
                <div className="flex flex-col space-y-1 transition-all duration-300">
                  <div className="mt-2 pl-3">
                    <span className="text-headingColor text-[10px] font-[500] tracking-[0.5px] leading-3">
                      MAIN
                    </span>
                  </div>

                  {navItems.map(({ to, label, Symbol }) => (
                    <NavItem
                      key={to}
                      to={to}
                      label={label}
                      Symbol={Symbol}
                      currentPath={pathname}
                      onClick={() => setOpen(false)}
                      collapseNav={collapseNav}
                      setCollapseNav={setCollapseNav}
                      open={open}
                      setOpen={setOpen}
                    />
                  ))}

                  <div className="flex justify-center items-center w-[98%]">
                    <hr className="flex w-full border-[1px] border-solid border-underline mt-4" />
                  </div>
                </div>
                <div className="flex justify-between flex-col h-full transition-all duration-300">
                  <div className="flex flex-col py-3 space-y-1">
                    <div className={cn(collapseNav && 'pl-3')}>
                      <span className="text-headingColor text-[10px] font-[500] tracking-[0.5px] leading-3">
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
                        collapseNav={collapseNav}
                        setCollapseNav={setCollapseNav}
                        open={open}
                        setOpen={setOpen}
                      />
                    ))}
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
                        setCollapseNav={setCollapseNav}
                        open={open}
                        setOpen={setOpen}
                      />
                    ))}
                    {collapseNav ? (
                      <div className="w-[98%]">
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
        </div>
      </div>
    </div>
  );
};

export default LeftNavbar;
