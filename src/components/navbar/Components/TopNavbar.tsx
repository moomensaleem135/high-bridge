import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '@/lib/helpers';
import { ArrowLeftIcon } from '@/assets/svgs';
import { ILayoutProps } from '@/lib/types';
import { cn } from '@/lib/cn';
import { useRouter } from 'next/navigation';
import { reviewZakatUrl } from '@/configs/constants';

interface ITopNavbar extends ILayoutProps {
  open: boolean;
  setOpen: (state: boolean) => void;
  collapseNav: boolean;
  setCollapseNav: (state: boolean) => void;
}

const TopNavbar = ({
  open,
  setOpen,
  collapseNav,
  setCollapseNav,
}: ITopNavbar) => {
  const selector = useSelector((state: any) => state.setup.setup);
  const zakatVal = useSelector((state: any) => state.zakat.zakat);
  const router = useRouter();

  console.log(selector);

  const totalZakatValue = zakatVal.reduce((total: any, entry: any) => {
    return total + (entry.value || 0); // Add value of each entry, default to 0 if undefined
  }, 0);

  return (
    <div className="px-2 min-h-[70px] xs:min-h-[45px] sm:min-h-[70px] flex w-full items-center justify-between xs:hidden lg:flex">
      <div className="flex items-center gap-x-2 flex-1">
        {/* Back Icon */}
        <div
          onClick={() => setCollapseNav(!collapseNav)}
          className={cn(
            'rounded-lg justify-center items-center  bg-background border-solid border-[1px] border-navBorder w-[30px] h-[30px] hidden lg:flex absolute top-9 z-50 transition-all duration-300',
            collapseNav ? 'left-[17rem]' : 'left-[5rem]'
          )}
        >
          <ArrowLeftIcon
            className={cn(
              'w-6 h-6 cursor-pointer ',
              collapseNav ? '' : 'rotate-180'
            )}
          />
        </div>

        {/* Search Input */}
        <div className="hidden lg:flex pl-7">
          <span className="text-lg font-medium">
            Zakat Due:{' '}
            <span
              className="text-zakatText font-bold text-xl cursor-pointer"
              onClick={() => {
                router.push(reviewZakatUrl);
              }}
            >
              {`$${totalZakatValue.toFixed(2)}`}
            </span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-x-4 flex-1">
        <div className="w-full hidden lg:flex lg:justify-end lg:items-center pr-7 gap-x-2">
          <span className="flex justify-center items-center font-medium text-lg">
            Zakat Pay Date:
          </span>
          <div className="flex flex-col justify-between items-start">
            <span className="text-sm font-medium leading-5">
              {selector.startDate ? (
                selector.startDate
              ) : (
                <span className="text-sm font-medium leading-5">
                  {`${new Date().getDate()} ${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`}
                </span>
              )}
            </span>
            {selector.generic !== null ? (
              <span className="font-medium text-[11px]">
                {selector.year === 'lunar' ? `(${selector.generic})` : ''}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
