'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-difficulty-config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui';

export const ProblemDifficultyField = () => {
  const { control } = useFormContext();
  const data = [
    {
      label: 'Easy',
      value: 'easy',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'Hard',
      value: 'hard',
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
              <SelectValue placeholder="Problem Difficulty" />
            </SelectTrigger>
            <SelectContent>
              {data.map((status) => (
                <SelectItem key={`difficulty-${status.value}`} value={`${status.value}`}>
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
