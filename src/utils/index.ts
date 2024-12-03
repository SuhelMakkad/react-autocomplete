export const baseURL = "/react-autocomplete";

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

export const scrollInViewById = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "center" });
  }
};

export const throttle = <T extends (...args: unknown[]) => unknown>(
  callback: T,
  waitFor: number
) => {
  let lastTime = 0;

  return (...args: Parameters<T>): void => {
    const now = Date.now();

    if (now - lastTime < waitFor) {
      return;
    }

    lastTime = now;
    callback(...args);
  };
};
