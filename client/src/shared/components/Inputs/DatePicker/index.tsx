import { useState, useRef } from 'react';
import type { ComponentProps } from 'react';

import { formatDate, formatDateTime } from '@/shared/utils/dateTime';
import useOnOutsideClick from '@/shared/hooks/onOutsideClick';
import Input from '@/shared/components/Inputs/Input';
import DateSection from './DateSection';
import TimeSection from './TimeSection';
import { StyledDatePicker, StyledDropdown } from './styles';

interface Props extends ComponentProps<typeof Input> {
  className?: string;
  withTime?: boolean;
  value?: string | null;
  onChange?: (...params: any) => any;
}
const DatePicker = ({
  className = undefined,
  withTime = true,
  value = null,
  onChange = () => {},
  ...inputProps
}: Props) => {
  const [stateIsDropdownOpen, setIsDropdownOpen] = useState(false);
  const $containerRef = useRef<HTMLDivElement | null>(null);

  useOnOutsideClick($containerRef, stateIsDropdownOpen, () => setIsDropdownOpen(false));

  const formatValueForInput = () => {
    if (!value) return '';
    return withTime ? formatDateTime(value) : formatDate(value);
  };

  return (
    <StyledDatePicker ref={$containerRef}>
      <Input
        icon="calendar"
        {...inputProps}
        className={className}
        autoComplete="off"
        value={formatValueForInput()}
        onClick={() => setIsDropdownOpen(true)}
      >
        {stateIsDropdownOpen && (
          <StyledDropdown $withTime={withTime}>
            <DateSection
              withTime={withTime}
              value={value}
              onChange={onChange}
              setDropdownOpen={setIsDropdownOpen}
            />
            {withTime && (
              <TimeSection value={value} onChange={onChange} setDropdownOpen={setIsDropdownOpen} />
            )}
          </StyledDropdown>
        )}
      </Input>
    </StyledDatePicker>
  );
};

export default DatePicker;
