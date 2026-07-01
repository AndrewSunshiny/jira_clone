import { useState, useRef, type KeyboardEventHandler } from 'react';

import KeyCodes from '@/shared/constants/keyCodes';
import useOnOutsideClick from '@/shared/hooks/onOutsideClick';
import Icon, { type IconCodes } from '@/shared/components/Icon';
import {
  StyledIconComponent,
  StyledSelect,
  ValueMulti,
  ValueMultiItem,
  ValueSingle,
  ValueContainer,
  ChevronIconComponent,
  Placeholder,
} from './styles';
import Dropdown from './Dropdown';
import type { OptionValue, DropdownOption, DropdownValue } from './Dropdown';

interface Props {
  className?: string;
  icon?: IconCodes;
  placeholder?: string;
  value?: DropdownValue | null | [];
  defaultValue?: DropdownValue;
  isMulti?: boolean;
  invalid?: boolean;
  options: DropdownOption[];
  onChange?: (...params: any) => any;
  onCreate?: (...params: any) => any;
}
const Select = ({
  className = undefined,
  icon = undefined,
  placeholder = '',
  value: propValue = undefined,
  defaultValue = undefined,
  isMulti = false,
  invalid = false,
  options = [],
  onChange = () => {},
  onCreate = () => {},
}: Props) => {
  const [stateValue, setValue] = useState(defaultValue || (isMulti ? [] : null));
  const [stateIsDropdownOpen, setIsDropDownOpen] = useState(false);
  const [stateSearchValue, setSearchValue] = useState('');

  const isControlled = propValue !== undefined;
  const value = isControlled ? propValue : stateValue;

  const $selectRef = useRef<HTMLDivElement | null>(null);
  const $inputRef = useRef<HTMLInputElement | null>(null);

  const activateDropdown = (): void => {
    if (stateIsDropdownOpen) $inputRef.current?.focus;
    else setIsDropDownOpen(false);
  };

  const deactivateDropdown = (): void => {
    setIsDropDownOpen(false);
    setSearchValue('');
    $selectRef.current?.focus();
  };

  useOnOutsideClick($selectRef, stateIsDropdownOpen, deactivateDropdown);

  const handleChange = (newValue: DropdownValue): void => {
    if (isControlled) setValue(newValue);
    onChange(newValue);
  };

  const removeOptionValue = (optionValue: DropdownValue): void => {
    if (Array.isArray(value))
      handleChange(value.filter((val: DropdownValue) => val !== optionValue));
  };

  const handleFocusedSelectKeyDown: KeyboardEventHandler<HTMLDivElement> = (event): void => {
    if (stateIsDropdownOpen) return;

    if (event.key === KeyCodes.Enter) event.preventDefault();
    if (event.key !== KeyCodes.Escape && event.key !== KeyCodes.Tab && !event.shiftKey)
      setIsDropDownOpen(true);
  };

  const getOption = (optionValue: OptionValue | null | undefined): DropdownOption | undefined => {
    if (!optionValue) return undefined;
    options.find((option) => option.value === optionValue);
  };
  const getOptionLabel = (optionValue: OptionValue | null | undefined): string =>
    getOption(optionValue)?.label || '';

  const isValueEmpty: boolean = isMulti
    ? !(value as OptionValue[])?.length
    : !getOption(value as OptionValue);

  const renderSingleValue = () => <ValueSingle>{getOptionLabel(value as OptionValue)}</ValueSingle>;

  const renderMultiValue = () => (
    <ValueMulti>
      {(value as OptionValue[])?.map((optionValue) => (
        <ValueMultiItem key={optionValue} onClick={() => removeOptionValue(optionValue)}>
          {getOptionLabel(optionValue)}
          <Icon type="plus" />
          Add more
        </ValueMultiItem>
      ))}
    </ValueMulti>
  );

  return (
    <StyledSelect
      className={className}
      ref={$selectRef}
      tabIndex={0}
      onKeyDown={handleFocusedSelectKeyDown}
      $hasIcon={!!icon}
      $invalid={invalid}
    >
      <ValueContainer onClick={activateDropdown}>
        {!!icon && <StyledIconComponent type={icon} />}
        {(!isMulti || isValueEmpty) && <ChevronIconComponent type="chevron-down" />}
        {isValueEmpty && <Placeholder>{placeholder}</Placeholder>}
        {!isValueEmpty && !isMulti && renderSingleValue()}
        {!isValueEmpty && isMulti && renderMultiValue()}
      </ValueContainer>
      {stateIsDropdownOpen && (
        <Dropdown
          value={value}
          isValueEmpty={isValueEmpty}
          searchValue={stateSearchValue}
          setSearchValue={setSearchValue}
          $inputRef={$inputRef}
          deactivateDropdown={deactivateDropdown}
          options={options}
          onChange={handleChange}
          onCreate={onCreate}
          isMulti={isMulti}
        />
      )}
    </StyledSelect>
  );
};

export default Select;
