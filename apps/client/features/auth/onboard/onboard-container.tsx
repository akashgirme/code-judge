import { OnboardLogic, OnboardModel } from './onboard-logic';
import { useOnboard } from './use-onboard';

export const OnboardContainer = () => {
  const { onOnboard } = useOnboard();

  const handleSubmit = async (data: OnboardModel) => {
    await onOnboard(data);
  };

  const defaultValues = {
    firstName: '',
    lastName: '',
  };

  return <OnboardLogic defaultValues={defaultValues} onSubmit={handleSubmit} />;
};
