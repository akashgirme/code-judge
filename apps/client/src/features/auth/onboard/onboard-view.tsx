'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { OnboardModel } from './onboard-logic';
import { Button, CardContent, Input } from '@code-judge/ui';
import { useOnboardMutation } from '@code-judge/api-client';
import { PageHeader } from '../../../components';

interface OnboardViewProps {
  form: UseFormReturn<OnboardModel>;
  onSubmit: (data: OnboardModel) => void;
}

export const OnboardView: React.FC<OnboardViewProps> = ({ form, onSubmit }) => {
  const { register, handleSubmit } = form;
  const [_onboard, { isLoading }] = useOnboardMutation({
    fixedCacheKey: 'onboard',
  });

  return (
    <FormProvider {...form}>
      <form className="max-md:pt-20" onSubmit={handleSubmit(onSubmit)}>
        <PageHeader
          title="Enter your Name"
          description={'Enter your name.'}
          hideBackButton
          hideLogo
        />

        <CardContent>
          <div className="flex flex-col py-6 gap-6">
            <Input placeholder="FirstName" {...register('firstName')}></Input>
            <Input placeholder="LastName" {...register('lastName')}></Input>
            <div className="flex flex-col gap-1"></div>
            <Button type="submit" disabled={isLoading} variant="default">
              Submit
            </Button>
          </div>
          <div className="py-6"></div>
        </CardContent>
      </form>
    </FormProvider>
  );
};
