'use client';
import React from 'react';
import {
  Button,
  Option,
  optionSchema,
  ProblemStatusField,
  problemStatusValidations,
  ProblemTagsField,
  ProblemTitleField,
} from '@code-judge/core-design';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Filter } from 'iconoir-react';
import { GetProblemsForAdminApiArg } from '@code-judge/api-hooks';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Params } from 'apps/client/features/hooks';
import { Prettify } from 'apps/client/types';

interface FiltersPanelProps {
  filterObj: GetProblemsForAdminApiArg;
  setSearchParams: (data: Params) => void;
  removeSearchParams: () => void;
  disabled?: boolean;
}

type FilterFormInputProps = Prettify<GetProblemsForAdminApiArg & { tags?: Option[] }>;

const FilterPostSchema = z.object({
  title: z.optional(z.string()),
  status: z.optional(problemStatusValidations['status']),
  tags: z.optional(z.array(optionSchema)),
});

const FiltersPanel = ({
  filterObj,
  disabled = false,
  removeSearchParams,
  setSearchParams,
}: FiltersPanelProps) => {
  const defaultValues: FilterFormInputProps = {
    ...filterObj,
  };
  const form = useForm<FilterFormInputProps>({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(FilterPostSchema),
  });

  const onSubmit: SubmitHandler<FilterFormInputProps> = (data) => {
    const tagIds = data?.tags?.map((tag) => tag.value);
    setSearchParams({ ...data, tags: undefined, tagIds });
  };

  const removeFilters = () => {
    removeSearchParams();
  };
  const disabledState = disabled || form.formState.isSubmitting;
  return (
    <FormProvider {...form}>
      <form
        className=" flex-grow flex flex-wrap gap-10 p-3 items-center "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className=" w-1/4">
          <ProblemTagsField />
        </div>
        <div className="w-1/4">
          <ProblemStatusField />
        </div>
        <div className="w-1/4">
          <ProblemTitleField />
        </div>
        <div className="absolute bottom-1 right-1 flex gap-4 items-center justify-center">
          {/* TODO: Removing filters should clear dropdown values from Select Compoennt  */}
          <Button
            disabled={disabledState}
            variant={'ghost'}
            className="border"
            onClick={removeFilters}
          >
            Remove Filters
          </Button>
          <Button disabled={disabledState} type="submit">
            <Filter className="w-4 h-4 mr-2" />
            Apply
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default FiltersPanel;
