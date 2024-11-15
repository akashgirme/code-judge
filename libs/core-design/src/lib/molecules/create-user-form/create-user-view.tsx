import { FormProvider, UseFormReturn } from 'react-hook-form';
import { CreateUserModel } from './create-user-logic';
import {
  EmailField,
  FirstNameField,
  LastNameField,
  CreatePasswordField,
  ConfirmPasswordField,
} from '../../form-fields';
import { Button } from '../../atoms';
import { AccountTypeField } from '../../form-fields/account-type-field';
import { AgreeTermsField } from '../../form-fields/agree-terms-field';
import { Card, CardContent, CardHeader } from '../../ui';

interface CreateUserViewProps {
  form: UseFormReturn<CreateUserModel>;
  onSubmit: (data: CreateUserModel) => void;
}

export const CreateUserView: React.FC<CreateUserViewProps> = ({
  form,
  onSubmit,
}) => {
  return (
    <FormProvider {...form}>
      <Card className="text-center bg-slate-900 text-white max-w-md mx-auto rounded-lg">
        <CardHeader title="Sign Up" />
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <AccountTypeField />
              <FirstNameField />
              <LastNameField />
              <EmailField />
              <CreatePasswordField />
              <ConfirmPasswordField />
              <AgreeTermsField termsUrl="#" linkComponent={'a'} />
              <Button type="submit" className="mx-auto">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
