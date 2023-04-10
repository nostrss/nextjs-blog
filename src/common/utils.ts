import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

/**
 * unix 시간을 UTC 시간으로 변환
 * @param unixTime unix 시간
 * @returns
 */
export const convertUnixToUct = (unixTime: number) => {
  const uctTiem = dayjs.unix(unixTime).format('YYYY-MM-DD');

  return uctTiem;
};

/**
 * 서버에 UTC-0 시간으로 저장하기 위해 현재 시간을 UTC로 변환
 * @returns 현재 시간을 UTC로 변환하여 반환
 */
export const returnUtcTime = () => {
  dayjs.extend(utc);
  const date = dayjs.utc().format();

  return date;
};

/**
 * UTC 시간을 로컬 시간으로 변환
 * 서버에 저장된 UTC-0 시간을 로컬 시간으로 변환하여 사용
 * @param utcTime UTC 시간
 * @returns UTC 시간을 로컬 시간으로 변환하여 반환
 */
export const convertUtcToLocal = (utcTime: Date) => {
  dayjs.extend(utc);
  const date = dayjs.utc(utcTime).local().format('YYYY-MM-DD');

  return date;
};
