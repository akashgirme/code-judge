import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Home from './home/page';
import SignIn from './auth/sign-in/page';
import SignInWithOtp from './auth/sign-in-with-otp/page';
import SignInWithTokenPage from './auth/sign-in-with-token/page';

export function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/initiate-sign-in" element={<SignIn />} />
        <Route path="/auth/sign-in-with-otp" element={<SignInWithOtp />} />
        <Route path="/auth/sign-in-with-token" element={<SignInWithTokenPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
