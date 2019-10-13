interface FormatFns {
  yyyy: (date: Date) => number;
  yy: (date: Date) => string;
  MM: (date: Date) => string;
  M: (date: Date) => number;
  dd: (date: Date) => string;
  d: (date: Date) => number;
  HH: (date: Date) => string;
  H: (date: Date) => number;
  hh: (date: Date) => string;
  h: (date: Date) => number;
  mm: (date: Date) => string;
  m: (date: Date) => number;
  ss: (date: Date) => string;
  s: (date: Date) => number;
  w: (date: Date) => string;
}

export const formatFns: FormatFns = {
  yyyy: date => date.getFullYear(),
  yy: date => ('' + date.getFullYear()).slice(-2),
  MM: date => ('0' + (date.getMonth() + 1)).slice(-2),
  M: date => date.getMonth() + 1,
  dd: date => ('0' + date.getDate()).slice(-2),
  d: date => date.getDate(),
  HH: date => ('0' + date.getHours()).slice(-2),
  H: date => date.getHours(),
  hh: date =>
    ('0' + (date.getHours() === 12 ? 12 : date.getHours() % 12)).slice(-2),
  h: date => (date.getHours() === 12 ? 12 : date.getHours() % 12),
  mm: date => ('0' + date.getMinutes()).slice(-2),
  m: date => date.getMinutes(),
  ss: date => ('0' + date.getSeconds()).slice(-2),
  s: date => date.getSeconds(),
  w: date => ['日', '一', '二', '三', '四', '五', '六'][date.getDay()],
};

export const compose = (date: Date, fields: (keyof FormatFns)[]) => {
  let result: Record<string, any> = {};

  fields.forEach(field => {
    result[field] = formatFns[field](date);
  });

  return result;
};

export const format = (date: Date, str: string) => {
  return str.replace(
    /([a-z]+)/gi,
    item => formatFns[item as keyof FormatFns](date) as string
  );
};

export const getMonthLength = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
};

export const parseDate = (origin: Date = new Date()) => {
  const year = origin.getFullYear();
  const month = origin.getMonth();
  const date = origin.getDate();
  const endDate = new Date(year, month + 1, 0);

  return {
    origin,
    year,
    month,
    date,
    startDay: new Date(year, month, 1).getDay(),
    endDay: endDate.getDay(),
    monthLength: endDate.getDate(),
  };
};
