import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    h1, h2, h3 {
        font-family: ${({theme}) => theme.typography.body.fontFamily};
        font-style: normal;
        font-weight: ${({theme}) => theme.typography.body.fontWeight};;
        margin: unset;
        color: ${({theme}) => theme.typography.colorPrimary};
    }

    h1 {
        font-size: ${({theme}) => theme.typography.heading.h1.fontSize};
        line-height: ${({theme}) => theme.typography.heading.h1.lineHeight};
    }

    h2 {
        font-size: ${({theme}) => theme.typography.heading.h2.fontSize};
        line-height: ${({theme}) => theme.typography.heading.h2.lineHeight};
    }

    h3 {
        font-size: ${({theme}) => theme.typography.heading.h3.fontSize};
        line-height: ${({theme}) => theme.typography.heading.h3.lineHeight};
    }

`;
