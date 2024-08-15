'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@code-judge/ui';
import { SelectGroup, SelectProps } from '@radix-ui/react-select';

interface LanguageSelectFieldProps extends Omit<SelectProps, 'onValueChange'> {
  onChange: (value: string) => void;
  value: string;
}

export const LanguageSelectField: React.FC<LanguageSelectFieldProps> = ({
  onChange,
  value,
}) => {
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
    <div className="w-[180px]">
      <Select onValueChange={onChange} defaultValue={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Language</SelectLabel>
            {data.map((language) => (
              <SelectItem key={`language-${language.value}`} value={`${language.value}`}>
                {language.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
