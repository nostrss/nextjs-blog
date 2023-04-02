import React from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { firebaseAuth } from 'firebase.config';
import { useRouter } from 'next/router';
import useGetId from '@/hooks/useGetId';
import useInput from '@/hooks/useInput';
import RegisterFormUI from './registerForm.presenter';

export default function RegisterForm({ path }: { path: string }) {
  const router = useRouter();

  /**
   * label의 htmlFor와 input의 id에 고유값 부여를 위해 useId 사용
   */
  const emailInputId = useGetId({ prefix: path });
  const passwordInputId = useGetId({ prefix: path });
  const passwordConfirmInputId = useGetId({ prefix: path });

  /**
   * useInput 사용
   * initialValue에 input 초기값 설정
   * onChangeUseInput에 onChange 이벤트 핸들러 설정
   * inputValue에 input의 value 값 return
   */
  const { inputValue, onChangeUseInput } = useInput({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmitCreatAccount = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    if (event) event.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        inputValue.email,
        inputValue.password,
      );
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    if (event) event.preventDefault();
    try {
      await signInWithEmailAndPassword(
        firebaseAuth,
        inputValue.email,
        inputValue.password,
      );

      router.push('/');
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  return (
    <RegisterFormUI
      emailInputId={emailInputId}
      passwordInputId={passwordInputId}
      passwordConfirmInputId={passwordConfirmInputId}
      onChangeUseInput={onChangeUseInput}
      onSubmitCreatAccount={onSubmitCreatAccount}
      path={path}
      onSubmitLogin={onSubmitLogin}
    />
  );
}
