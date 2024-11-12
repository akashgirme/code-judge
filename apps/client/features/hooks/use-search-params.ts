'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type UseSearchParamProps = (
  initialParams?: Params
) => [URLSearchParams, (newParams: Params) => void, () => void];

export type Params = Record<
  string,
  string | string[] | number | number[] | null | undefined
>;

function getSearchParams(params: Params) {
  const searchParams = new URLSearchParams(window.location.search);
  Object.keys(params).map((key) => {
    const value = params[key];
    if (value) {
      if (Array.isArray(value)) {
        searchParams.set(key, value.join(','));
      } else {
        searchParams.set(key, String(value));
      }
    } else {
      return;
    }
  });
  return searchParams;
}

export const useSearchParams: UseSearchParamProps = (initialParams = {}) => {
  const router = useRouter();
  const [params, setParams] = useState(getSearchParams(initialParams));

  const updateParams = (newParams: Params): void => {
    const searchParams = getSearchParams(newParams);
    router.replace(`${window.location.pathname}?${searchParams.toString()}`);
    setParams(searchParams);
  };

  const removeAllParams = () => {
    router.replace(`${window.location.pathname}`);
    setParams(new URLSearchParams(window.location.pathname));
  };

  return [params, updateParams, removeAllParams];
};
