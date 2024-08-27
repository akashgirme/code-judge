import { Button, Card, CardContent, CardHeader, Input } from '@code-judge/ui';
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
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <FormProvider {...form}>
            <CardHeader>
              <PageHeader
                title="Login"
                description={'Login to start solving problems'}
                hideBackButton
                hideLogo
                prevRoute="/auth/sign-in"
              />
            </CardHeader>
            <CardContent className="grid gap-4">
              <SocialSignInButtons />
              <OR />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@email.com"
                    {...register('email')}
                    className="w-full"
                  />
                  <Button
                    isActive={isValid}
                    variant="default"
                    type="submit"
                    isLoading={isLoading}
                    className="w-full"
                  >
                    Continue with email
                  </Button>
                </div>
              </form>
            </CardContent>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
};
