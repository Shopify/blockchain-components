/**
 * Sizes are based on Bootstrap breakpoints.
 * https://getbootstrap.com/docs/5.0/layout/breakpoints/#available-breakpoints
 */
const size = {
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1400px',
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
  smDown: `(max-width: ${size.sm})`,
  smUp: `(min-width: ${size.sm})`,
  mdDown: `(max-width: ${size.md})`,
  mdUp: `(min-width: ${size.md})`,
  lgDown: `(max-width: ${size.lg})`,
  lgUp: `(min-width: ${size.lg})`,
  xlDown: `(max-width: ${size.xl})`,
  xlUp: `(min-width: ${size.xl})`,
  xxlDown: `(max-width: ${size.xxl})`,
  xxlUp: `(min-width: ${size.xxl})`,
};
