import dayjs from 'dayjs';

export const convertUnixToUct = (unixTime: number) => {
  const uctTiem = dayjs.unix(unixTime).format('YYYY-MM-DD');

  return uctTiem;
};

export const util = () => {};
