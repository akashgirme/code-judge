import { Button, Typography } from '@code-judge/ui';
import { Link } from 'react-router-dom';
import { Action, Can, Subject } from '../auth/ability';

export const DashboardView = () => {
  return (
    <div className="flex justify-center">
      <ul className="grid gap-4">
        <li>
          <span>
            <Typography className="body-m">All Problems</Typography>
          </span>
          <Can I={Action.Read} a={Subject.Problem}>
            <Button>
              <Link to="/admin/problems">Continue</Link>
            </Button>
          </Can>
        </li>
        <li>
          <span>
            <Typography className="body-m">Create Problem</Typography>
          </span>
          <Can I={Action.Create} a={Subject.Problem}>
            <Button>
              <Link to="/admin/problems/create">Continue</Link>
            </Button>
          </Can>
        </li>
      </ul>
    </div>
  );
};
