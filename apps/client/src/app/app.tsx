import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './store';
import Home from './home/page';
import SignIn from './auth/sign-in/page';
import SignInWithOtp from './auth/sign-in-with-otp/page';
import SignInWithTokenPage from './auth/sign-in-with-token/page';
import { AppBar } from '../components';
import Onboard from './auth/onboard/page';
import PublicProblems from './problem/public-problems/page';
import CreateProblem from './problem/create-problem/page';
import UpdateProblem from './problem/edit-problem/page';
import { PersistGate } from 'redux-persist/integration/react';

export function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/initiate-sign-in" element={<SignIn />} />
          <Route path="/auth/sign-in-with-otp" element={<SignInWithOtp />} />
          <Route path="/auth/sign-in-with-token" element={<SignInWithTokenPage />} />
          <Route path="/auth/onboard" element={<Onboard />} />
          <Route path="/problems" element={<PublicProblems />} />
          <Route path="/problems/create" element={<CreateProblem />} />
          <Route path="/problems/update/:problemId" element={<UpdateProblem />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
