import React, { useId, useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from 'firebase.config';

export default function SignUp() {
  const emailInputId = useId();
  const passwordInputId = useId();
  const passwordConfirmInputId = useId();

  const [isEmail, setIsEmail] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [, setIsPasswordConfirm] = useState('');

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPassword(e.target.value);
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPasswordConfirm(e.target.value);
  };

  const onSubmitCreatAccount = async () => {
    await createUserWithEmailAndPassword(firebaseAuth, isEmail, isPassword)
      .then((userCredential) => {
        const { user } = userCredential;
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        // ..
      });
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
                  onChange={onChangeEmail}
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
                  onChange={onChangePassword}
                />
              </label>
            </li>
            <li>
              <label htmlFor={passwordConfirmInputId}>
                PassWord
                <input
                  type="password"
                  id={passwordConfirmInputId}
                  name="password"
                  placeholder="password"
                  onChange={onChangePasswordConfirm}
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
