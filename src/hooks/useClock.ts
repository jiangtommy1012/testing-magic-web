import { useEffect, useState } from 'react';

const WEEKDAYS = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

const pad = (n: number) => String(n).padStart(2, '0');

export interface ClockValue {
  /** HH:MM（24 小時制） */
  time: string;
  /** 例如「星期五 6月26日」 */
  date: string;
}

/** 每秒更新的鎖屏時鐘 + 中文日期 */
export function useClock(): ClockValue {
  const [value, setValue] = useState<ClockValue>(() => read());

  useEffect(() => {
    const id = setInterval(() => setValue(read()), 1000);
    return () => clearInterval(id);
  }, []);

  return value;
}

function read(): ClockValue {
  const now = new Date();
  return {
    time: `${pad(now.getHours())}:${pad(now.getMinutes())}`,
    date: `${WEEKDAYS[now.getDay()]} ${now.getMonth() + 1}月${now.getDate()}日`,
  };
}
