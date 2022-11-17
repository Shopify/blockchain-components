import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    h1, h2, h3 {
        font-family: 'SF Pro Display', sans-serif;
        font-style: normal;
        font-weight: 600;
        margin: unset;
        color: ${({theme}) => theme.colors.text.default};
    }

    h1 {
        font-size: 24px;
        line-height: 28px;
    }

    h2 {
        font-size: 20px;
        line-height: 24px;
    }

    h3 {
        font-size: 16px;
        line-height: 24px;
    }

`;
