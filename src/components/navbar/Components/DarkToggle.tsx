import * as React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { ModeIcon } from '@/assets/svgs/mode';
export function DarkToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-row items-center bg-background h-14 justify-between rounded-lg px-3">
      <div className="flex justify-evenly items-center gap-3">
        <ModeIcon />
        <span className="text-heading text-sm font-medium">Dark Mode</span>
      </div>

      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        className="flex items-center space-x-2 h-4 w-[30px]"
      />
    </div>
  );
}
