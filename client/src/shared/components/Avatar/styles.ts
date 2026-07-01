import styled, { css } from 'styled-components';
import type { ComponentProps } from 'react';

import { font, mixin } from '@/shared/utils/styles';

interface StyledImageProps extends ComponentProps<'div'> {
  $size?: number;
  $avatarUrl?: string;
}
export const StyledImage = styled.div<StyledImageProps>`
  display: inline-block;
  ${(props) =>
    !!props.$size
    && css`
      width: ${props.$size}px;
      height: ${props.$size}px;
    `}
  border-radius: 100%;
  ${(props) =>
    !!props.$avatarUrl
    && css`
      background-image: url('${props.$avatarUrl}');
    `}
  ${mixin.truncateText}
`;

interface StyledLetterProps extends ComponentProps<'div'> {
  $size?: number;
  $color?: string;
}
export const StyledLetter = styled.div<StyledLetterProps>`
  display: inline-block;
  ${(props) =>
    !!props.$size
    && css`
      width: ${props.$size}px;
      height: ${props.$size}px;
    `}
  border-radius: 100%;
  text-transform: uppercase;
  color: #fff;
  background: ${(props) => props.color};
  ${font.medium}
  ${(props) => !!props.$size && font.size(Math.round(props.$size / 1.7))}
	& > span {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
`;
