'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-status-config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui';

export const ProblemStatusField = () => {
  const { control } = useFormContext();
  const data = [
    {
      label: 'Approved',
      value: 'approved',
    },
    {
      label: 'Rejected',
      value: 'rejected',
    },
    {
      label: 'Unpublished',
      value: 'unpublished',
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
              <SelectValue placeholder="Problem Status" />
            </SelectTrigger>
            <SelectContent>
              {data.map((status) => (
                <SelectItem key={`status-${status.value}`} value={`${status.value}`}>
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
