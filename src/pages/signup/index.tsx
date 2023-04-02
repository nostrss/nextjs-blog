import SignUpOrLogIn from '@/components/signUp-logIn-Form/signUp_logIn.container';

/**
 * 회원가입 최상위 컴포넌트
 * @returns SignUpOrLogIn : 회원가입 페이지 컴포넌트
 */
export default function SignUpPage() {
  return <SignUpOrLogIn path="signup" />;
}
