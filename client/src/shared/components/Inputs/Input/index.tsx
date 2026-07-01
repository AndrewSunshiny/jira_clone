import { forwardRef } from 'react';
import type { ChangeEventHandler, ComponentProps, Ref } from 'react';

import StyledInput from './styles';
import Icon, { type IconCodes } from '@/shared/components/Icon';

type InputChangeHandler = ChangeEventHandler<HTMLInputElement>;

type OwnProps = {
  icon?: IconCodes;
  className?: string;
  invalid?: boolean;
  value?: string | number | null;
  filter?: RegExp;
  onChange?: InputChangeHandler;
};
type Props = Omit<ComponentProps<'input'>, keyof OwnProps> & OwnProps;
const InputComponent = (
  {
    value = null,
    icon = undefined,
    className = undefined,
    invalid = false,
    filter = undefined,
    onChange = () => {},
    ...inputProps
  }: Props,
  ref: Ref<HTMLInputElement>,
) => {
  const handleChange: InputChangeHandler = (event): void => {
    if (!filter || filter.test(event.target.value)) {
      onChange(event);
    }
  };

  return (
    <StyledInput className={className} $icon={icon} $invalid={invalid}>
      {!!icon && <Icon type={icon} />}
      <input {...inputProps} onChange={handleChange} ref={ref} />
    </StyledInput>
  );
};

const Input = forwardRef(InputComponent);
export default Input;
