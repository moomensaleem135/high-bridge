import { cn } from '@/lib/cn';

interface HamburgerProps {
  open: boolean;
  setOpen: (state: boolean) => void;
}

export function Hamburger({ open, setOpen }: HamburgerProps) {
  return (
    <div className="group " onClick={() => setOpen(!open)}>
      <div className="relative flex overflow-hidden items-center justify-center  w-[50px] h-[50px] bg-accent-background rounded-lg">
        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-200 origin-center overflow-hidden">
          <div
            className={cn(
              [
                'bg-primary h-[2px] w-7 transform transition-all duration-200 origin-left delay-75',
              ],
              open && 'translate-y-6'
            )}
          ></div>
          <div
            className={cn([
              'bg-primary h-[2px] w-7 rounded transform transition-all duration-200 delay-50',
              open && 'translate-y-6',
            ])}
          ></div>
          <div
            className={cn([
              'bg-primary h-[2px] w-7 transform transition-all duration-200 origin-left',
              open && 'translate-y-6',
            ])}
          ></div>

          <div
            className={cn([
              'absolute items-center justify-between transform transition-all duration-400 top-2.5 -translate-x-10 flex w-0',
              open && 'w-12 translate-x-0',
            ])}
          >
            <div
              className={cn([
                'absolute bg-primary h-[2px] w-5 transform transition-all duration-400 rotate-0 delay-200',
                open && 'rotate-45',
              ])}
            ></div>
            <div
              className={cn([
                'absolute bg-primary h-[2px] w-5 transform transition-all duration-400 -rotate-0 delay-200',
                open && '-rotate-45',
              ])}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
