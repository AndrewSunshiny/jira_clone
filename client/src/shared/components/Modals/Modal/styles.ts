import styled, { css } from 'styled-components';
import type { ComponentProps } from 'react';

import Icon from '@/shared/components/Icon';
import { color, mixin, zIndexValues } from '@/shared/utils/styles';

export const ScrollOverlay = styled.div`
  z-index: ${zIndexValues.modal};
  position: fixed;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  ${mixin.scrollableY}
`;

interface ClickableOverlayProps extends ComponentProps<'div'> {
  $variant?: keyof typeof clickOverlayStyles;
}
export const ClickableOverlay = styled.div<ClickableOverlayProps>`
  min-height: 100%;
  background: ${mixin.rgba(color.textLightBlue, 0.7)};
  ${(props) => !!props.$variant && clickOverlayStyles[props.$variant]}
`;

const clickOverlayStyles = {
  center: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
  `,
  aside: css`
    text-align: right;
  `,
};

interface StyledModalProps extends ComponentProps<'div'> {
  $variant?: keyof typeof modalStyles;
}
export const StyledModal = styled.div<StyledModalProps>`
  display: inline-block;
  position: relative;
  width: 100%;
  background: #fff;
  ${(props) => !!props.$variant && modalStyles[props.$variant]}
`;

const modalStyles = {
  center: css`
    max-width: 600px;
    vertical-align: middle;
    text-align: left;
    ${mixin.boxShadowMedium}
  `,
  aside: css`
    min-height: 100vh;
    max-width: 500px;
    text-align: left;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
  `,
};

interface CloseIconProps extends ComponentProps<typeof Icon> {
  $variant?: keyof typeof closeIconStyles;
}
export const CloseIconComponent = styled(Icon)<CloseIconProps>`
  position: absolute;
  font-size: 25px;
  color: ${color.textDark};
  ${mixin.clickable}
  ${(props) => !!props.$variant && closeIconStyles[props.$variant]}
`;

const closeIconStyles = {
  center: css`
    top: 8px;
    right: 10px;
    padding: 7px 7px 0;
  `,
  aside: css`
    top: 10px;
    left: -50px;
    width: 40px;
    height: 40px;
    padding-top: 8px;
    border-radius: 40px;
    text-align: center;
    background: #fff;
    opacity: 0.5;
  `,
};
