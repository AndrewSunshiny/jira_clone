import styled, { css } from 'styled-components';
import type { ComponentProps } from 'react';

import { color, font } from '@/shared/utils/styles';

interface StyledTextareaProps extends ComponentProps<'div'> {
  $invalid?: boolean;
}
const StyledTextarea = styled.div<StyledTextareaProps>`
  display: inline-block;
  width: 100%;
  textarea {
    width: 100%;
    padding: 13px 15px 14px;
    border-radius: 4px;
    border: 1px solid ${color.borderLight};
    box-shadow: inset 0 0 1px 0 rgba(0, 0, 0, 0.03);
    background: #fff;
    overflow-y: hidden;
    ${font.regular}
    ${font.size(14)}
		&:focus {
      border: 1px solid ${color.borderMedium};
    }
    ${(props) =>
      props.$invalid
      && css`
        &,
        &:focus {
          border: 1px solid ${color.danger};
        }
      `}
  }
`;

export default StyledTextarea;
