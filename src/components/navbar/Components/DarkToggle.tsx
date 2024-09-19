import * as React from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@/components/ui/switch';

export function DarkToggle() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-row gap-x-3 items-center ">
      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
        className="flex items-center space-x-2"
      />
      <span className="text-subheadingColor text-sm">Dark Mode</span>
    </div>
  );
}
