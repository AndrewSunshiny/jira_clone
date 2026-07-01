import type { ComponentProps, ReactNode } from 'react';

import Icon, { type IconCodes } from '@/shared/components/Icon';
import { color as colors } from '@/shared/utils/styles';
import { StyledButton, StyledSpinnerComponent } from './styles';

interface Props extends ComponentProps<'button'> {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: ReactNode;
  hollow?: boolean;
  color?: 'primary' | 'success' | 'danger';
  icon?: IconCodes;
  iconSize?: number;
  disabled?: boolean;
  working?: boolean;
  onClick?: () => void;
}
const Button = ({
  className = undefined,
  type = 'button',
  children = undefined,
  hollow = false,
  color = 'primary',
  icon = undefined,
  iconSize = undefined,
  disabled = false,
  working = false,
  onClick = () => {},
  ...buttonProps
}: Props) => (
  <StyledButton
    {...buttonProps}
    disabled={disabled}
    $hollow={hollow}
    $iconOnly={!children}
    $color={color}
    onClick={() => {
      if (!disabled && !working) onClick();
    }}
  >
    {working && (
      <StyledSpinnerComponent size={26} color={hollow ? colors.textMediumBlue : '#fff'} />
    )}
    {!working && !!icon && (
      <Icon type={icon} size={iconSize} color={hollow ? colors.textMediumBlue : '#fff'} />
    )}
    {children}
  </StyledButton>
);

export default Button;
