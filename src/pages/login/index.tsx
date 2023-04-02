import SignUpOrLogIn from '@/components/signUp-logIn-Form/signUp_logIn.container';
import React from 'react';

/**
 * 로그인 페이지 최상위 컴포넌트
 * @returns SignUpOrLogIn : 로그인 페이지 컴포넌트
 */
export default function LoginPage() {
  return <SignUpOrLogIn path="login" />;
}
