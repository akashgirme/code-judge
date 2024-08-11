'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-solution-langauge-config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@code-judge/ui';

export const ProblemSolutionLangaugeField = () => {
  const { control } = useFormContext();
  const data = [
    {
      label: 'C',
      value: 'c',
    },
    {
      label: 'C++',
      value: 'cpp',
    },
    {
      label: 'Java',
      value: 'java',
    },
    {
      label: 'JavaScript',
      value: 'js',
    },
    {
      label: 'Go',
      value: 'go',
    },
  ];
  return (
    <Controller
      name={modelKey}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-3">
          <span className="text-sm">{questionConfig.label}</span>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              {data.map((status) => (
                <SelectItem key={`langauge-${status.value}`} value={`${status.value}`}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
