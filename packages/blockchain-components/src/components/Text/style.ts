import styled, {css} from '../../styles/styled';
import {ThemedCSS} from '../../types/theme';

import {Color, Variant} from './types';

const HeadingLg = css<{$bold?: boolean}>`
  font-family: ${({theme}) => theme.typography.headingLg.fontFamily};
  font-size: ${({theme}) => theme.typography.headingLg.fontSize};
  font-weight: ${({$bold, theme}) =>
    $bold && theme.typography.headingLg.fontWeightBold
      ? theme.typography.headingLg.fontWeightBold
      : theme.typography.headingLg.fontWeight};
  line-height: ${({theme}) => theme.typography.headingLg.lineHeight};
  margin: unset;
`;

const HeadingMd = css<{$bold?: boolean}>`
  font-family: ${({theme}) => theme.typography.headingMd.fontFamily};
  font-size: ${({theme}) => theme.typography.headingMd.fontSize};
  font-weight: ${({$bold, theme}) =>
    $bold && theme.typography.headingMd.fontWeightBold
      ? theme.typography.headingMd.fontWeightBold
      : theme.typography.headingMd.fontWeight};
  line-height: ${({theme}) => theme.typography.headingMd.lineHeight};
  margin: unset;
`;

const HeadingSm = css<{$bold?: boolean}>`
  font-family: ${({theme}) => theme.typography.headingSm.fontFamily};
  font-size: ${({theme}) => theme.typography.headingSm.fontSize};
  font-weight: ${({$bold, theme}) =>
    $bold && theme.typography.headingSm.fontWeightBold
      ? theme.typography.headingSm.fontWeightBold
      : theme.typography.headingSm.fontWeight};
  line-height: ${({theme}) => theme.typography.headingSm.lineHeight};
  margin: unset;
`;

const BodyLg = css<{$bold?: boolean}>`
  font-family: ${({theme}) => theme.typography.bodyLg.fontFamily};
  font-size: ${({theme}) => theme.typography.bodyLg.fontSize};
  font-weight: ${({$bold, theme}) =>
    $bold && theme.typography.bodyLg.fontWeightBold
      ? theme.typography.bodyLg.fontWeightBold
      : theme.typography.bodyLg.fontWeight};
  line-height: ${({theme}) => theme.typography.bodyLg.lineHeight};
`;

const BodyMd = css<{$bold?: boolean}>`
  font-family: ${({theme}) => theme.typography.bodyMd.fontFamily};
  font-size: ${({theme}) => theme.typography.bodyMd.fontSize};
  font-weight: ${({$bold, theme}) =>
    $bold && theme.typography.bodyMd.fontWeightBold
      ? theme.typography.bodyMd.fontWeightBold
      : theme.typography.bodyMd.fontWeight};
  line-height: ${({theme}) => theme.typography.bodyMd.lineHeight};
`;

const BodySm = css<{$bold?: boolean}>`
  font-family: ${({theme}) => theme.typography.bodySm.fontFamily};
  font-size: ${({theme}) => theme.typography.bodySm.fontSize};
  font-weight: ${({$bold, theme}) =>
    $bold && theme.typography.bodySm.fontWeightBold
      ? theme.typography.bodySm.fontWeightBold
      : theme.typography.bodySm.fontWeight};
  line-height: ${({theme}) => theme.typography.bodySm.lineHeight};
`;

const CriticalColor = css`
  color: ${({theme}) => theme.typography.colorCritical};
`;

const DisabledColor = css`
  color: ${({theme}) => theme.typography.colorDisabled};
`;

const PrimaryColor = css`
  color: ${({theme}) => theme.typography.colorPrimary};
`;

const SecondaryColor = css`
  color: ${({theme}) => theme.typography.colorSecondary};
`;

const ColorMappedToCSS: {[C in Color]: ThemedCSS} = {
  critical: CriticalColor,
  disabled: DisabledColor,
  primary: PrimaryColor,
  secondary: SecondaryColor,
};

const VariantMappedToCSS: {[V in Variant]: ThemedCSS} = {
  bodyLg: BodyLg,
  bodyMd: BodyMd,
  bodySm: BodySm,
  headingLg: HeadingLg,
  headingMd: HeadingMd,
  headingSm: HeadingSm,
};

/**
 * Note that we're using span here, but it doesn't
 * matter since it will get overwritten via the
 * `as` prop when used. Read more below:
 * https://styled-components.com/docs/api#as-polymorphic-prop
 */
export const Wrapper = styled.span<{
  color: Color;
  variant: Variant;
  $bold?: boolean;
}>`
  letter-spacing: 0;
  ${({color}) => ColorMappedToCSS[color]};
  ${({variant}) => VariantMappedToCSS[variant]};
`;
