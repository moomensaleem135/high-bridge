import * as React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';
import { ModeIcon } from '@/assets/svgs/mode';
export function DarkToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-row gap-x-16 items-center bg-background h-14 justify-evenly rounded-lg">
      <div className="flex justify-evenly items-center gap-3">
        <ModeIcon />
        <span className="text-heading text-sm font-[500]">Dark Mode</span>
      </div>

      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        className="flex items-center space-x-2"
      />
    </div>
  );
}
