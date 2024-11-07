'use client';
import { Controller, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './select-language-config';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui';

export const SelectLanguageField = () => {
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
      label: 'Go',
      value: 'go',
    },
    {
      label: 'Java',
      value: 'java',
    },
    {
      label: 'JavaScript',
      value: 'js',
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
              {data.map((language) => (
                <SelectItem
                  key={`Language-${language.value}`}
                  value={`${language.value}`}
                >
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    />
  );
};
