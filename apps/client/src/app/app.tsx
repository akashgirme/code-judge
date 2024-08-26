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
import CreateProblem from './admin/problem/create-problem/page';
import UpdateProblem from './admin/problem/edit-problem/page';
import { PersistGate } from 'redux-persist/integration/react';
import Dashboard from './admin/dashboard/page';
import ProblemDetailScreen from './problem/[problemId]/page';
import AddTestCases from './admin/problem/add-testcases/page';
import AllProblems from './admin/problem/all-problems/page';
import ChangeProblemStatus from './admin/problem/change-status/page';

export function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<PublicProblems />} />
          <Route path="problems/:problemId" element={<ProblemDetailScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/initiate-sign-in" element={<SignIn />} />
          <Route path="/auth/sign-in-with-otp" element={<SignInWithOtp />} />
          <Route path="/auth/sign-in-with-token" element={<SignInWithTokenPage />} />
          <Route path="/auth/onboard" element={<Onboard />} />
          <Route path="/admin/problems" element={<AllProblems />} />
          <Route path="/admin/problems/create" element={<CreateProblem />} />
          <Route
            path="/admin/problems/:problemId/add-testcases"
            element={<AddTestCases />}
          />
          <Route path="/admin/problems/:problemId/edit" element={<UpdateProblem />} />
          <Route
            path="/admin/problems/:problemId/change-status"
            element={<ChangeProblemStatus />}
          />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
