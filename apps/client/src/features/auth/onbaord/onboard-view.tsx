'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { OnboardModel } from './onboard-logic';
import {
  Button,
  CardContent,
  ConfirmPasswordField,
  CreatePasswordField,
} from '@skill-street-ui/core-design';
import { PasswordErrors } from '../components';
import { useOnboardMutation } from '@skill-street-ui/auth-client';
import { PageHeader } from 'apps/home/components';
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
    onSubmit({ password: '', confirmPassword: '' });
  };

  return (
    <FormProvider {...form}>
      <form className="max-md:pt-20" onSubmit={form.handleSubmit(onSubmit)}>
        <PageHeader
          title="Create Password"
          description={'Create a 8 character password to secure your Account.'}
          hideBackButton
          hideLogo
        />

        <CardContent>
          <div className="flex flex-col py-6 gap-6">
            <div className="flex flex-col gap-1">
              <CreatePasswordField />
              <ConfirmPasswordField />
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
            <Button
              onClick={onSkip}
              isLoading={isSkipping && isLoading}
              disabled={isLoading}
              variant="secondary"
            >
              Skip
            </Button>
          </div>
          <div className="py-6">
            <PasswordErrors />
          </div>
        </CardContent>
      </form>
    </FormProvider>
  );
};
