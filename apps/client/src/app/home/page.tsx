import { Button, Typography } from '@code-judge/ui';
import { Link } from 'react-router-dom';
import { Action, Can, Subject } from '../../features/auth/ability';

const Home = () => {
  return (
    <div className="flex justify-center">
      <ul className="grid gap-4">
        <li>
          <span>
            <Typography className="body-m">Sign In to Access Application</Typography>
          </span>
          <Button>
            <Link to="/auth/initiate-sign-in">Sign-In</Link>
          </Button>
        </li>
        <li>
          <span>
            <Typography className="body-m">All Problems</Typography>
          </span>
          <Button>
            <Link to="/problems">Continue</Link>
          </Button>
        </li>
        <li>
          <span>
            <Typography className="body-m">Problem for admin</Typography>
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

export default Home;
