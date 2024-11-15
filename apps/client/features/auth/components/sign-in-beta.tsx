import { Switch, Typography } from '@code-judge/core-design';
import { Flask } from 'iconoir-react';

export const SignInBeta = () => {
  return (
    <div className="flex items-center">
      <div className="flex flex-1 gap-x-3 items-center">
        <div className="p-2 rounded-lg border border-outline ">
          <Flask className="size-5" />
        </div>
        <Typography fontFamily={'helvetica'} fontSize="body-m" fontWeight="semibold">
          Register as BETA
        </Typography>
      </div>
      <Switch color="green" />
    </div>
  );
};
