import React from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'firebase.config';
import { useRouter } from 'next/router';
import useGetId from '@/hooks/useGetId';
import useInput from '@/hooks/useInput';

export default function SignUp() {
  const router = useRouter();

  /**
   * label의 htmlFor와 input의 id에 고유값 부여를 위해 useId 사용
   */
  const emailInputId = useGetId({ prefix: 'SignUp' });
  const passwordInputId = useGetId({ prefix: 'SignUp' });
  const passwordConfirmInputId = useGetId({ prefix: 'SignUp' });

  const { inputValue, onChangeUseInput } = useInput({
    initialValue: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const onSubmitCreatAccount = async () => {
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

  return (
    <div>
      <h1>Sign Up</h1>
      <fieldset>
        <legend>Sign up</legend>
        <form method="post" onSubmit={onSubmitCreatAccount}>
          <ul>
            <li>
              <label htmlFor={emailInputId}>
                Email
                <input
                  type="email"
                  id={emailInputId}
                  name="email"
                  placeholder="email"
                  onChange={onChangeUseInput}
                />
              </label>
            </li>
            <li>
              <label htmlFor={passwordInputId}>
                PassWord
                <input
                  type="password"
                  id={passwordInputId}
                  name="password"
                  placeholder="password"
                  onChange={onChangeUseInput}
                />
              </label>
            </li>
            <li>
              <label htmlFor={passwordConfirmInputId}>
                PassWord
                <input
                  type="password"
                  id={passwordConfirmInputId}
                  name="passwordConfirm"
                  placeholder="password"
                  onChange={onChangeUseInput}
                />
              </label>
            </li>
          </ul>
          <button type="submit">Sign Up</button>
        </form>
      </fieldset>
    </div>
  );
}
