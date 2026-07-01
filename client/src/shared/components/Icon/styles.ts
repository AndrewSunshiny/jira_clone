import styled from 'styled-components';
import type { ComponentProps } from 'react';

interface StyledIconProps extends ComponentProps<'i'> {
  $size?: number;
  $left?: number;
  $top?: number;
  $code?: string;
}
const StyledIcon = styled.i<StyledIconProps>`
  display: inline-block;
  ${(props) => !!props.$size && `font-size: ${props.$size}px;`}
  ${(props) =>
    (!!props.$left || !!props.$top) && `transform: translate(${props.$left}px, ${props.$top}px);`}
	&:before {
    ${(props) => !!props.$code && `content: ${props.$code};`}
    font-family: 'jira' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default StyledIcon;
