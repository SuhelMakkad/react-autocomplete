export type TimeoutId = ReturnType<typeof setTimeout>;

export const debounce = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  waitFor: number
) => {
  let timeout: TimeoutId;

  return (...args: Parameters<T>): TimeoutId => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      callback(...args);
    }, waitFor);

    return timeout;
  };
};
