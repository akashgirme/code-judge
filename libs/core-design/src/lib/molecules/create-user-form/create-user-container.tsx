import { CreateUserLogic, CreateUserModel } from './create-user-logic';

export const CreateUserContainer = () => {
  const handleSubmit = async (data: CreateUserModel) => {
    const submitData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      agreeTerms: data.agreeTerms,
      accountType: data.accountType,
    };
    alert(JSON.stringify(submitData));
  };

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
    accountType: 'student' as const,
  };

  return (
    <CreateUserLogic defaultValues={defaultValues} onSubmit={handleSubmit} />
  );
};
