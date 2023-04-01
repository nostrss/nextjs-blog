import React from 'react';
import useGetId from '@/hooks/useGetId';
import useInput from '@/hooks/useInput';
import { firebaseAuth } from 'firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const emailInputId = useGetId({ prefix: 'SignIn' });
  const passwordInputId = useGetId({ prefix: 'SignIn' });

  const { inputValue, onChangeUseInput } = useInput({
    initialValue: {
      email: '',
      password: '',
    },
  });

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
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
    <div>
      <h1>Sign In</h1>
      <fieldset>
        <legend>Sign up</legend>
        <form method="post" onSubmit={onSubmitLogin}>
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
          </ul>
          <button type="submit">Sign Up</button>
        </form>
      </fieldset>
    </div>
  );
}
