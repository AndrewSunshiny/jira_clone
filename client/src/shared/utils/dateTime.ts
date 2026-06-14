import dayjs, { type ConfigType } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDate = (date: ConfigType, format = 'll') =>
  date ? dayjs(date).format(format) : date;

export const formatDateTime = (date: ConfigType, format = 'lll') =>
  date ? dayjs(date).format(format) : date;

export const formatDateTimeForApi = (date: ConfigType) =>
  date ? dayjs(date).utc().format() : date;
