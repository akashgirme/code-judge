'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-tags-config';
import { MultipleSelector, Option } from '../../../ui';
import { useGetAllTagsQuery } from '@code-judge/api-hooks';
import { HelperText } from '../../../atoms';
import { useMemo } from 'react';

export const ProblemTagsField = () => {
  const { data, isLoading, error } = useGetAllTagsQuery();

  const options: Option[] = useMemo(() => {
    return (
      data?.map((tag) => {
        return { label: tag.name, value: `${tag.id}` } as Option;
      }) || []
    );
  }, [data]);

  const { control } = useFormContext();
  return (
    <Controller
      name={modelKey}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm">{questionConfig.label}</span>
          <MultipleSelector
            disabled={isLoading || !!error}
            value={field.value}
            onChange={field.onChange}
            placeholder="Select One or More Tags"
            defaultOptions={options}
            options={options}
          />
          {error && (
            <HelperText className=" -my-2" severity={'error'} hasError={true}>
              Error occured while fetching Tags
            </HelperText>
          )}
        </div>
      )}
    />
  );
};
