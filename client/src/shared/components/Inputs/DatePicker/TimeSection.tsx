import { useLayoutEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { range } from 'lodash';

import { formatDate, formatDateTimeForApi } from '@/shared/utils/dateTime';
import { TimeSection, Time } from './styles';

interface Props {
  value?: string | null;
  onChange?: ((...params: any) => any) | undefined;
  setDropdownOpen?: ((...params: any) => any) | undefined;
}
const DatePickerTimeSection = ({
  value = undefined,
  onChange = () => {},
  setDropdownOpen = () => {},
}: Props) => {
  const $sectionRef = useRef<HTMLDivElement | null>(null);
  const formattedTimeValue = formatDate(value, 'HH:mm');

  useLayoutEffect(() => {
    const scrollToSelectedTime = () => {
      if (!$sectionRef.current) return;

      const $selectedTime: HTMLElement | null = $sectionRef.current.querySelector(
        `[data-time-"${formattedTimeValue}"]`,
      );
      if (!$selectedTime) return;

      $sectionRef.current.scrollTop = $selectedTime.offsetTop - 80;
    };

    scrollToSelectedTime();
  }, [formattedTimeValue]);

  const handleTimeChange = (newTime: string): void => {
    const [newHour, newMinute] = newTime.split(':');
    const existingDate = dayjs(value || undefined);

    const existingDateWithNewTime = existingDate
      .set('hour', parseInt(newHour))
      .set('minute', parseInt(newMinute));

    onChange(formatDateTimeForApi(existingDateWithNewTime));
    setDropdownOpen(false);
  };

  const generateTimes = (): string[] =>
    range(48).map((i) => {
      const hour = `${Math.floor(i / 2)}`;
      const paddedHour = hour.length < 2 ? `0${hour}` : hour;
      const minute = i % 2 === 0 ? '00' : '30';
      return `${paddedHour}:${minute}`;
    });

  return (
    <TimeSection ref={$sectionRef}>
      {generateTimes().map((time) => (
        <Time
          key={time}
          data-time={time}
          $isSelected={time === formattedTimeValue}
          onClick={() => handleTimeChange(time)}
        >
          {time}
        </Time>
      ))}
    </TimeSection>
  );
};

export default DatePickerTimeSection;
