'use client';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { OnboardModel } from './onboard-logic';
import { Button, Card, CardContent, Input } from '@code-judge/ui';
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
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <FormProvider {...form}>
          <form className="max-md:pt-20" onSubmit={handleSubmit(onSubmit)}>
            <PageHeader
              title="Tell more about yourself!"
              description={'Enter your name to onboard.'}
              hideBackButton
              hideLogo
            />

            <CardContent>
              <div className="flex flex-col py-6 gap-6">
                <Input
                  id="firstName"
                  type="text"
                  placeholder="FirstName"
                  {...register('firstName')}
                  className="w-full"
                />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="LastName"
                  {...register('lastName')}
                  className="w-full"
                />
                <div className="flex flex-col gap-1"></div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  isLoading={isLoading}
                  variant="default"
                  className="w-full"
                >
                  Submit
                </Button>
              </div>
              <div className="py-6"></div>
            </CardContent>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};
