import { useRef, useState } from 'react';
import type {
  ReactNode,
  RefObject,
  MouseEventHandler,
  MouseEvent,
  KeyboardEventHandler,
} from 'react';
import { uniq } from 'lodash';

import KeyCodes from '@/shared/constants/keyCodes';
import { ClearIconComponent, Dropdown, Option, Options, OptionsNoResults } from './styles';

export type OptionValue = string | number;
export type DropdownValue = OptionValue | OptionValue[];
export type DropdownOption = {
  value: OptionValue;
  label: string;
};

const ACTIVE_OPTION_CLASSNAME = 'jira-select-option-is-active';

interface Props {
  value?: any;
  isValueEmpty?: boolean;
  searchValue?: string;
  setSearchValue?: (...params: any) => any;
  isMulti?: boolean;
  $inputRef?: RefObject<HTMLInputElement | null>;
  deactivateDropdown?: (...params: any) => any;
  options: DropdownOption[];
  onChange?: (...params: any) => any;
  onCreate?: (...params: any) => any;
}
const SelectDropdown = ({
  value = undefined,
  isValueEmpty = undefined,
  searchValue = undefined,
  setSearchValue = () => {},
  isMulti = false,
  $inputRef = undefined,
  deactivateDropdown = () => {},
  options = [],
  onChange = () => {},
  onCreate = undefined,
}: Props) => {
  const [stateIsCreatingOption, setIsCreatingOption] = useState(false);

  const $optionsRef: RefObject<HTMLDivElement | null> = useRef(null);

  const selectOptionValue = (optionsValue: any): void => {
    if (deactivateDropdown) deactivateDropdown();
    onChange(isMulti ? uniq([...value, optionsValue]) : optionsValue);
  };

  const createOption = (newOptionLabel: string): void => {
    setIsCreatingOption(true);
    if (onCreate)
      onCreate(newOptionLabel, (creaatedOptionValue: any) => {
        setIsCreatingOption(false);
        selectOptionValue(creaatedOptionValue);
      });
  };

  const clearOptionValue = (): void => {
    if ($inputRef?.current) {
      $inputRef.current.value = '';
      $inputRef.current.focus();
    }
    onChange(isMulti ? [] : null);
  };

  const handleInputKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    const handleInputEscapeDown = () => {
      event.nativeEvent.stopImmediatePropagation();
      deactivateDropdown();
    };
    const handleInputEnterKeyDown = () => {
      event.preventDefault();
      const $active = getActiveOptionNode();
      if (!$active) return;

      const optionValueToSelect = $active.getAttribute('data-select-option-value');
      const optionLabelToCreate = $active.getAttribute('data-select-option-label');

      if (optionValueToSelect) selectOptionValue(optionValueToSelect);
      else if (optionLabelToCreate) createOption(optionLabelToCreate);
    };
    const handleInputArrowUpOrDownKeyDown = () => {
      const $active = getActiveOptionNode();
      if (!$active) return;

      const $options = $optionsRef.current;
      if (!$options) return;

      const $optionsHeight = $options.getBoundingClientRect().height;
      const $activeHeight = $active.getBoundingClientRect().height;

      if (event.key === KeyCodes.ArrowDown) {
        if ($options.lastElementChild === $active) {
          $active.classList.remove(ACTIVE_OPTION_CLASSNAME);
          $options.firstElementChild?.classList.add(ACTIVE_OPTION_CLASSNAME);
          $options.scrollTop = 0;
        } else {
          $active.classList.remove(ACTIVE_OPTION_CLASSNAME);
          $active.nextElementSibling?.classList.add(ACTIVE_OPTION_CLASSNAME);
          if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
            $options.scrollTop += $activeHeight;
          }
        }
      } else if (event.key === KeyCodes.ArrowUp) {
        if ($options.firstElementChild === $active) {
          $active.classList.remove(ACTIVE_OPTION_CLASSNAME);
          $options.lastElementChild?.classList.add(ACTIVE_OPTION_CLASSNAME);
          $options.scrollTop = $options.scrollHeight;
        } else {
          $active.classList.remove(ACTIVE_OPTION_CLASSNAME);
          $active.previousElementSibling?.classList.add(ACTIVE_OPTION_CLASSNAME);
          if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
            $options.scrollTop -= $activeHeight;
          }
        }
      }
    };

    switch (event.key) {
      case KeyCodes.Escape:
        handleInputEscapeDown();
        break;
      case KeyCodes.Enter:
        handleInputEnterKeyDown();
        break;
      case KeyCodes.ArrowDown:
      case KeyCodes.ArrowUp:
        handleInputArrowUpOrDownKeyDown();
        break;
    }
  };

  const handleOptionMouseEnter: MouseEventHandler<HTMLDivElement> = (event): void => {
    const $active = getActiveOptionNode();
    const $target = event.target as HTMLDivElement;
    if ($active) $active.classList.remove(ACTIVE_OPTION_CLASSNAME);
    $target?.classList.add(ACTIVE_OPTION_CLASSNAME);
  };

  const getActiveOptionNode = (): HTMLElement | null | undefined =>
    $optionsRef?.current?.querySelector(`.${ACTIVE_OPTION_CLASSNAME}`);

  const optionsFilteredBySearchValue = options.filter((option) => {
    if (searchValue) option.label.toString().toLowerCase().includes(searchValue.toLowerCase());
  });

  const removeSelectedOptions = (options: DropdownOption[]) =>
    options.filter((option) => !value.includes(option.value));

  const filteredOptions = isMulti
    ? removeSelectedOptions(optionsFilteredBySearchValue)
    : optionsFilteredBySearchValue;

  const searchValueNotInOptions = !options
    .map((option) => option.label)
    .includes(searchValue ?? '');
  const isOptionCreatable = !!(onCreate && searchValue && searchValueNotInOptions);

  const renderSelectableOption = (option: DropdownOption, i: number): ReactNode => (
    <Option
      key={option.value}
      className={i === 0 ? ACTIVE_OPTION_CLASSNAME : undefined}
      data-select-option-value={option.value}
      onMouseEnter={handleOptionMouseEnter}
      onClick={() => selectOptionValue(option.value)}
      $isSelected={option.value === value}
    >
      {option.label}
    </Option>
  );

  const renderCreatableOption = (): ReactNode => (
    <Option
      className={filteredOptions.length === 0 ? ACTIVE_OPTION_CLASSNAME : undefined}
      data-create-option-label={searchValue}
      onMouseEnter={handleOptionMouseEnter}
      onClick={() => !!searchValue && createOption(searchValue)}
    >
      {stateIsCreatingOption ? `Creating "${searchValue}"...` : `Create "${searchValue}"`}
    </Option>
  );

  return (
    <Dropdown
      type="text"
      placeholder="search"
      ref={$inputRef}
      autoFocus
      onKeyDown={handleInputKeyDown}
      onChange={(event) => setSearchValue(event.target.value)}
    >
      {!isValueEmpty && <ClearIconComponent type="close" onClick={clearOptionValue} />}
      <Options ref={$optionsRef}>
        {filteredOptions.map(renderSelectableOption)}
        {isOptionCreatable && renderCreatableOption()}
        {filteredOptions.length === 0 && <OptionsNoResults>No results</OptionsNoResults>}
      </Options>
    </Dropdown>
  );
};

export default SelectDropdown;
