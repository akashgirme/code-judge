import { IconType } from '../../types';
import { Chip } from '../../atoms';

import { Xmark } from 'iconoir-react';

interface ChipSelectorProps {
  options: { label: string; Icon?: IconType }[];
  value: string[];
  onChange: (value: string[]) => void;
  isSingleSelect?: boolean;
}

export const ChipSelector: React.FC<ChipSelectorProps> = ({
  options,
  value,
  onChange,
  isSingleSelect,
}) => {
  // const onToggle = (optionLabel: string, action: 'select' | 'unSelect') => {
  //   if (isSingleSelect) {
  //     onChange([optionLabel]);
  //     return;
  //   }
  //   const currentIndex = value.indexOf(optionLabel);
  //   const newValue = [...value];

  //   if (currentIndex === -1 && action === 'select') {
  //     newValue.push(optionLabel);
  //   } else if (action === 'unSelect' && currentIndex !== -1) {
  //     newValue.splice(currentIndex, 1);
  //   }

  //   onChange(newValue);
  // };

  const onSelect = (optionLabel: string) => {
    if (isSingleSelect) {
      onChange([optionLabel]);
      return;
    }
    const currentIndex = value.indexOf(optionLabel);
    if (currentIndex === -1) {
      onChange([...value, optionLabel]);
    }
  };
  const onUnSelect = (optionLabel: string) => {
    if (isSingleSelect) return;
    const currentIndex = value.indexOf(optionLabel);
    if (currentIndex === -1) return;
    const newValue = [...value];
    newValue.splice(currentIndex, 1);
    onChange(newValue);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {options.map((option) => {
        const isSelected = value.includes(option.label);
        return (
          <Chip
            onClick={() => onSelect(option.label)}
            variant={isSelected ? 'primary-btn' : 'primary-outline'}
            state={isSelected ? 'active' : undefined}
            key={option.label}
          >
            {option.Icon && <option.Icon className="size-5" />}
            {option.label}
            {isSelected && !isSingleSelect && (
              <Xmark
                onClick={(e) => {
                  e.stopPropagation();
                  onUnSelect(option.label);
                }}
                className="size-4"
              />
            )}
          </Chip>
        );
      })}
    </div>
  );
};
