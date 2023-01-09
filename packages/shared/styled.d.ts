import styled from 'styled-components';

import {Theme} from './src/types/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
