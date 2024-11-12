'use client';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { modelKey, questionConfig } from './problem-actual-testcases-config';
import { Button, TextAreaField, TextField } from '../../../../atoms';
import { Card, CardContent, Label } from '../../../../ui';
import { PlusCircle, Trash2 } from 'lucide-react';

export const ProblemActualTestCasesField = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: modelKey,
  });

  // TODO: Create component for testcase field and use in both `actual & example` testcasesField
  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <Card key={field.id}>
          <CardContent className="pt-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <TextAreaField
                  label={questionConfig.label.input}
                  helperText={errors[modelKey]?.message?.toString()}
                  hasError={!!errors[modelKey]}
                  autoComplete="off"
                  {...register(`${modelKey}.${index}.input`)}
                />
                {(errors[modelKey] as any)?.[index]?.input && (
                  <p className="text-sm text-red-500">
                    {(errors[modelKey] as any)[index].input.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <TextAreaField
                  label={questionConfig.label.output}
                  helperText={errors[modelKey]?.message?.toString()}
                  hasError={!!errors[modelKey]}
                  autoComplete="off"
                  {...register(`${modelKey}.${index}.output`)}
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
                Remove
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
