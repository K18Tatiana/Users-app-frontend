import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from './features/auth/AuthWrapper';
import Login from './features/auth/Login';
import VerifyCode from './features/auth/VerifyCode';
import SignUpForm from './features/auth/SignUpForm';
import ProtectedRoutes from './components/ProtectedRoutes';
import Home from './features/home/Home';
import PasswordRecoveryEmail from './features/auth/passwordRecovery/PasswordRecoveryEmail';
import PasswordRecoveryCode from './features/auth/passwordRecovery/PasswordRecoveryCode';
import PasswordRecovery from './features/auth/passwordRecovery/PasswordRecovery';

function App() {

  return (
    <Routes>
      <Route element={<AuthWrapper />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/verify_email/:code" element={<VerifyCode />} />
        <Route path="/password_recovery/email" element={<PasswordRecoveryEmail />} />
        <Route path="/password_recovery/code" element={<PasswordRecoveryCode />} />
        <Route path="/password_recovery/new_password" element={<PasswordRecovery />} />
      </Route>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
