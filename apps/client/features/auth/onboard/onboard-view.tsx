'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { OnboardModel } from './onboard-logic';
import {
  Button,
  CardContent,
  FirstNameField,
  LastNameField,
} from '@code-judge/core-design';
import { useOnboardMutation } from '@code-judge/api-hooks';
import { PageHeader } from 'apps/client/components';
import { useState } from 'react';

interface OnboardViewProps {
  form: UseFormReturn<OnboardModel>;
  onSubmit: (data: OnboardModel) => void;
}

export const OnboardView: React.FC<OnboardViewProps> = ({ form, onSubmit }) => {
  const [isSkipping, setIsSkipping] = useState(false);
  const [_onboard, { isLoading }] = useOnboardMutation({
    fixedCacheKey: 'onboard',
  });

  const onSkip = () => {
    setIsSkipping(true);
    onSubmit({ firstName: '', lastName: '' });
  };

  return (
    <FormProvider {...form}>
      <form className="max-md:pt-20" onSubmit={form.handleSubmit(onSubmit)}>
        <PageHeader
          title="Onboard"
          description={'Create a 8 character password to secure your Account.'}
          hideBackButton
          hideLogo
        />

        <CardContent>
          <div className="flex flex-col py-6 gap-6">
            <div className="flex flex-col gap-1">
              <FirstNameField />
              <LastNameField />
            </div>
            <Button
              type="submit"
              isLoading={!isSkipping && isLoading}
              disabled={isLoading}
              variant="primary"
              isActive
            >
              Submit
            </Button>
          </div>
        </CardContent>
      </form>
    </FormProvider>
  );
};
