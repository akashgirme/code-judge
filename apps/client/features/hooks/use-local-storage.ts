import { useCallback, useState } from 'react';

type ReturnValue<T> = [T | null, (val: T) => void, () => void];

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): ReturnValue<T> => {
  const getStoredValue = useCallback((): T => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error('Error getting data from local storage:', error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [value, setValue] = useState<T | null>(getStoredValue());

  const updateValue = useCallback(
    (newVal: T) => {
      localStorage.setItem(key, JSON.stringify(newVal));
      setValue(newVal);
    },
    [key, setValue]
  );

  const removeItem = useCallback(() => {
    localStorage.removeItem(key);
    setValue(null);
  }, [key, setValue]);

  return [value, updateValue, removeItem];
};
