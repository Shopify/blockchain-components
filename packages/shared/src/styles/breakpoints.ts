/**
 * Sizes are based on Bootstrap breakpoints.
 * https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints
 */
export const device = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

/**
 * @example
 *
 * ```
 * media ${breakpoints.smDown} {
 *     // Breakpoint specific styles here.
 * }
 * ```
 */
export const breakpoints = {
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
