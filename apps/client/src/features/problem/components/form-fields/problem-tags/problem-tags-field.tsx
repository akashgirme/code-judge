'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, problemTagsValidations, questionConfig } from './problem-tags-config';
import { MultipleSelector, Option } from '@code-judge/ui';
import { useGetAllTagsQuery } from '@code-judge/api-client';
import { HelperText } from '@code-judge/ui';
import { useMemo } from 'react';
import { z } from 'zod';

export const ProblemTagsField = () => {
  const { data, isLoading, error } = useGetAllTagsQuery();

  const options: Option[] = useMemo(() => {
    return (
      data?.map((tag) => {
        return { label: tag.name, value: tag.id.toString() } as Option;
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
            // value={field.value}
            value={field.value?.map((tag: any) => ({
              label:
                options.find((opt) => opt.value === tag.value.toString())?.label || '',
              value: tag.value.toString(),
            }))}
            // onChange={field.onChange}
            onChange={(selectedOptions) => {
              field.onChange(
                selectedOptions.map((opt) => ({
                  label: opt.label,
                  value: parseInt(opt.value, 10),
                }))
              );
            }}
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
