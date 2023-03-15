/**
 * Sizes are based on Tailwind breakpoints.
 * https://tailwindcss.com/docs/responsive-design
 */
export const device = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};

export type Breakpoint =
  | 'smDown'
  | 'smUp'
  | 'mdDown'
  | 'mdUp'
  | 'lgDown'
  | 'lgUp'
  | 'xlDown'
  | 'xlUp'
  | 'xxlDown'
  | 'xxlUp';

/**
 * @example
 *
 * ```
 * media ${breakpoints.smDown} {
 *     // Breakpoint specific styles here.
 * }
 * ```
 */
export const breakpoints: Record<Breakpoint, string> = {
  smDown: `(max-width: ${device.sm}px)`,
  smUp: `(min-width: ${device.sm}px)`,
  mdDown: `(max-width: ${device.md}px)`,
  mdUp: `(min-width: ${device.md}px)`,
  lgDown: `(max-width: ${device.lg}px)`,
  lgUp: `(min-width: ${device.lg}px)`,
  xlDown: `(max-width: ${device.xl}px)`,
  xlUp: `(min-width: ${device.xl}px)`,
  xxlDown: `(max-width: ${device.xxl}px)`,
  xxlUp: `(min-width: ${device.xxl}px)`,
};
