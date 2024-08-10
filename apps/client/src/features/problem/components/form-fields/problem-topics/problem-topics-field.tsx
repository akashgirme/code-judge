'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-topics-config';
import { MultipleSelector, Option } from '@code-judge/ui';
import { useGetAllTopicsQuery } from '@code-judge/api-client';
import { HelperText } from '@code-judge/ui';
import { useMemo } from 'react';

export const ProblemTopicsField = () => {
  const { data, isLoading, error } = useGetAllTopicsQuery();

  const options: Option[] = useMemo(() => {
    return (
      data?.map((topic) => {
        return { label: topic.name, value: topic.id } as Option;
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
            placeholder="Select One or More topics"
            defaultOptions={options}
            options={options}
          />
          {error && (
            <HelperText className=" -my-2" severity={'error'} hasError={true}>
              Error occured while fetching topics
            </HelperText>
          )}
        </div>
      )}
    />
  );
};
