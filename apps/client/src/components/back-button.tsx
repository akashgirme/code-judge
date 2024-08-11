import { ArrowLeft } from 'iconoir-react';

import { Button } from '@code-judge/ui';
import { useNavigate } from 'react-router-dom';

export const BackButton = ({ prevRoute = '/auth/sign-in' }: { prevRoute?: string }) => {
  const navigate = useNavigate();
  const goBack = () => navigate(prevRoute);
  return (
    <Button onClick={goBack} variant={'ghost'} className="h-14">
      <ArrowLeft className="w-6 h-6" />
    </Button>
  );
};
