'use client';

import { useFieldArray, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-testcases-config';
import { Button, TextField } from '../../../atoms';
import { Card, CardContent, Label } from '../../../ui';
import { PlusCircle, Trash2 } from 'lucide-react';

export const ProblemTestCasesField = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: modelKey,
  });

  return (
    <div className="space-y-4">
      <Label>{questionConfig.label}</Label>
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor={`${modelKey}.${index}.input`}>Input</Label>
                <TextField
                  id={`${modelKey}.${index}.input`}
                  {...register(`${modelKey}.${index}.input`)}
                  placeholder="Enter input"
                />
                {(errors[modelKey] as any)?.[index]?.input && (
                  <p className="text-sm text-red-500">
                    {(errors[modelKey] as any)[index].input.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor={`${modelKey}.${index}.output`}>Output</Label>
                <TextField
                  id={`${modelKey}.${index}.output`}
                  {...register(`${modelKey}.${index}.output`)}
                  placeholder="Enter expected output"
                />
                {(errors[modelKey] as any)?.[index]?.output && (
                  <p className="text-sm text-red-500">
                    {(errors[modelKey] as any)[index].output.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => remove(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Remove Test Case
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="primary-outline" onClick={() => append({ input: '', output: '' })}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {questionConfig.addButtonText}
      </Button>
    </div>
  );
};
