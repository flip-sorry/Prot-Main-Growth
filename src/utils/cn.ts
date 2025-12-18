/**
 * Utility function to merge class names
 * Similar to clsx or cn from shadcn/ui
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

