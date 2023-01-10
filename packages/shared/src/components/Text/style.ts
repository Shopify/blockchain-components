import styled, {css} from 'styled-components';

import {Variant, VariantCSS} from './types';

const HeadingBaseCSS = css`
  font-family: ${({theme}) => theme.typography.heading.fontFamily};
  font-weight: ${({theme}) => theme.typography.heading.fontWeight};
  margin: unset;
`;

const HeadingLg = css`
  ${HeadingBaseCSS};
  font-size: ${({theme}) => theme.typography.heading.h1.fontSize};
  line-height: ${({theme}) => theme.typography.heading.h1.lineHeight};
`;

const HeadingMd = css`
  ${HeadingBaseCSS};
  font-size: ${({theme}) => theme.typography.heading.h2.fontSize};
  line-height: ${({theme}) => theme.typography.heading.h2.lineHeight};
`;

const HeadingSm = css`
  ${HeadingBaseCSS};
  font-size: ${({theme}) => theme.typography.heading.h3.fontSize};
  line-height: ${({theme}) => theme.typography.heading.h3.lineHeight};
`;

const Body = css`
  font-family: ${({theme}) => theme.typography.body.fontFamily};
  font-size: ${({theme}) => theme.typography.body.fontSize};
  font-weight: ${({theme}) => theme.typography.body.fontWeight};
  line-height: ${({theme}) => theme.typography.body.lineHeight};
`;

const BodyBold = css`
  ${Body};
  font-weight: ${({theme}) => theme.typography.body.bold.fontWeight};
`;

const VariantMappedToCSS: {[V in Variant]: VariantCSS} = {
  body: Body,
  bodyBold: BodyBold,
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
  color: string;
  variant: Variant;
}>`
  color: ${({color}) => color};
  ${({variant}) => VariantMappedToCSS[variant]};
`;
