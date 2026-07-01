import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { times, range } from 'lodash';

import { formatDate, formatDateTimeForApi } from '@/shared/utils/dateTime';
import Icon from '@/shared/components/Icon';
import {
  DateSection,
  YearSelect,
  SelectedMonthYear,
  Grid,
  PrevNextIcons,
  DayName,
  Day,
} from './styles';

dayjs.extend(localeData);

interface Props {
  withTime?: boolean;
  value?: string | null;
  onChange?: (...params: any) => any;
  setDropdownOpen?: (...params: any) => any;
}
const DatePickerDateSection = ({
  withTime = true,
  value = null,
  onChange = () => {},
  setDropdownOpen = () => {},
}: Props) => {
  const [stateSelectedMonth, setSelectedMonth] = useState(
    dayjs(value || undefined).startOf('month'),
  );

  const handleYearChange = (year: string): void => {
    setSelectedMonth(dayjs(stateSelectedMonth).set('year', parseInt(year)));
  };
  const handleMonthChange = (addOrSubtract: 'add' | 'subtract'): void => {
    setSelectedMonth(dayjs(stateSelectedMonth)[addOrSubtract](1, 'month'));
  };
  const handleDayChange = (newDate: Dayjs): void => {
    const existingHour = value ? dayjs(value).hour() : 0;
    const existingMinute = value ? dayjs(value).minute() : 0;

    const newDateWithExistingTime = newDate.set('hour', existingHour).set('minute', existingMinute);
    onChange(formatDateTimeForApi(newDateWithExistingTime));

    if (!withTime) setDropdownOpen(false);
  };

  const generateYears = () => times(50, (i) => ({ label: `${i + 2010}`, value: `${i + 2010}` }));
  const generateWeekDayNames = () => dayjs.weekdaysMin(true);
  const generateFillerDaysBeforeMonthStart = () => {
    const count = stateSelectedMonth.diff(dayjs(stateSelectedMonth).startOf('week'), 'days');
    return range(count);
  };
  const generateMonthDays = () =>
    times(stateSelectedMonth.daysInMonth()).map((i) => dayjs(stateSelectedMonth).add(i, 'days'));
  const generateFIllerDaysAfterMonthEnd = () => {
    const selectedMonthEnd = dayjs(stateSelectedMonth).endOf('month');
    const weekEnd = dayjs(stateSelectedMonth).endOf('week');
    const count = weekEnd.diff(selectedMonthEnd, 'days');
    return range(count);
  };

  return (
    <DateSection>
      <SelectedMonthYear>{formatDate(stateSelectedMonth, 'MMM YYYY')}</SelectedMonthYear>
      <YearSelect
        onChange={(e) => {
          handleYearChange(e.target.value);
        }}
      >
        {[{ label: 'Year', value: '' }, ...generateYears()].map((option) => (
          <option key={option.label} value={option.value}>
            {option.value}
          </option>
        ))}
      </YearSelect>
      <PrevNextIcons>
        <Icon type="arrow-left" onClick={() => handleMonthChange('subtract')} />
        <Icon type="arrow-right" onClick={() => handleMonthChange('add')} />
      </PrevNextIcons>
      <Grid>
        {generateWeekDayNames().map((name) => (
          <DayName key={name}>{name}</DayName>
        ))}
        {generateFillerDaysBeforeMonthStart().map((i) => (
          <Day key={`before-${i}`} $isFiller></Day>
        ))}
        {generateMonthDays().map((date) => (
          <Day
            key={date.toString()}
            $isToday={dayjs().isSame(date, 'date')}
            $isSelected={dayjs(value).isSame(date, 'day')}
            onClick={() => handleDayChange(date)}
          >
            {formatDate(date, 'D')}
          </Day>
        ))}
        {generateFIllerDaysAfterMonthEnd().map((i) => (
          <Day key={`after-${i}`} $isFiller></Day>
        ))}
      </Grid>
    </DateSection>
  );
};

export default DatePickerDateSection;
