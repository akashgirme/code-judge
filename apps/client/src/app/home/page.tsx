import { Button } from '@code-judge/ui';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center">
      <Button>
        <Link to="auth/initiate-sign-in">Sign-In</Link>
      </Button>
    </div>
  );
};

export default Home;
