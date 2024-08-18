'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-difficulty-config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@code-judge/ui';
import { SelectGroup } from '@radix-ui/react-select';

export const ProblemDifficultyField = () => {
  const { control } = useFormContext();
  const data = [
    {
      label: 'Easy',
      value: 'Easy',
    },
    {
      label: 'Medium',
      value: 'Medium',
    },
    {
      label: 'Hard',
      value: 'Hard',
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
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Difficulty</SelectLabel>
                {data.map((status) => (
                  <SelectItem
                    key={`difficulty-${status.value}`}
                    value={`${status.value}`}
                  >
                    {status.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
