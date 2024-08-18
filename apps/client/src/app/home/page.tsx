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
            <Typography className="body-m">Create Problem</Typography>
          </span>
          <Can I={Action.Create} a={Subject.Problem}>
            <Button>
              <Link to="/problems/create">Continue</Link>
            </Button>
          </Can>
        </li>
        <li>
          <span>
            <Typography className="body-m">Update Problem</Typography>
          </span>
          <Can I={Action.Update} a={Subject.Problem}>
            <Button>
              <Link to="/problems/update/37436d66-87df-41b2-8989-c54a41b6af83">
                Continue
              </Link>
            </Button>
          </Can>
        </li>
      </ul>
    </div>
  );
};

export default Home;
