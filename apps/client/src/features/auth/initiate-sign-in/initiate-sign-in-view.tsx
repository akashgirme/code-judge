import { Button, CardContent, Input } from '@code-judge/ui';
import { OR, SocialSignInButtons } from '../components';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import React from 'react';
import { InitiateSignInModel } from './initiate-sign-in-logic';
import { PageHeader } from '../../../components';
import { useInitiateSignInMutation } from '@code-judge/api-client';

interface InitiateSignInViewProps {
  form: UseFormReturn<InitiateSignInModel>;
  onSubmit: (data: InitiateSignInModel) => void;
}

export const InitiateSignInView: React.FC<InitiateSignInViewProps> = ({
  form,
  onSubmit,
}) => {
  const [_initiateSignIn, { isLoading }] = useInitiateSignInMutation({
    fixedCacheKey: 'initiate-sign-in',
  });

  const {
    formState: { isValid },
    register,
    handleSubmit,
  } = form;

  return (
    <div>
      <FormProvider {...form}>
        <PageHeader
          title="Login"
          description={'Enter your email to login.'}
          hideBackButton
          hideLogo
          prevRoute="/auth/sign-in"
        />
        <CardContent className="grid gap-4">
          <SocialSignInButtons />
          <OR />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="name@email.com"
                {...register('email')}
              />
            </div>
            <Button
              isActive={isValid}
              variant="default"
              type="submit"
              isLoading={isLoading}
            >
              Continue with email
            </Button>
          </form>
        </CardContent>
      </FormProvider>
    </div>
  );
};
