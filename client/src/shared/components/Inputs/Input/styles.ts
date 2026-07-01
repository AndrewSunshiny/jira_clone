import styled, { css } from 'styled-components';
import type { ComponentProps } from 'react';

import { color, font } from '@/shared/utils/styles';

interface StyledInputProps extends ComponentProps<'div'> {
  $icon?: string;
  $invalid?: boolean;
}
const StyledInput = styled.div<StyledInputProps>`
  position: relative;
  display: inline-block;
  height: 40px;
  width: 100%;
  input {
    height: 100%;
    width: 100%;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid ${color.borderLight};
    box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.03);
    background-color: #fff;
    ${font.regular}
    ${font.size(14)}
		&:focus {
      border: 1px solid ${color.borderMedium};
    }
    ${(props) => `
			${!!props.$icon && 'padding-left: 40px;'}
			${
        props.$invalid
        && css`
          &,
          &:focus {
            border: 1px solid ${color.danger};
          }
        `
      }`}
  }
  i {
    position: absolute;
    top: 12px;
    left: 14px;
    font-size: 16px;
    pointer-events: none;
    color: ${color.textMedium};
  }
`;

export default StyledInput;
