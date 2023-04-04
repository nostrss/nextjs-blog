import React from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GithubAuthProvider,
} from 'firebase/auth';
import { firebaseAuth } from 'firebase.config';
import { useRouter } from 'next/router';
import useGetId from '@/hooks/useGetId';
import useInput from '@/hooks/useInput';
import { userState } from '@/store/userState';
import { useRecoilState } from 'recoil';
import RegisterFormUI from './signUp_login.presenter';

export default function SignUpOrLogIn({ path }: { path: string }) {
  const router = useRouter();
  const provider = new GithubAuthProvider();
  const [, setIsUser] = useRecoilState(userState);

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
    email: '',
    password: '',
    passwordConfirm: '',
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

  const onClickGithubLogin = async () => {
    await signInWithPopup(firebaseAuth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;

        // The signed-in user info.
        const { user }: any = result;

        setIsUser({
          userId: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          screenName: user.reloadUserInfo.providerUserInfo[0].screenName,
        });
        router.push('/');
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const { email } = error.customData;
        // The AuthCredential type that was used.
        // const credential = GithubAuthProvider.credentialFromError(error);
        // ...

        console.error(errorMessage);
      });
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
      onClickGithubLogin={onClickGithubLogin}
    />
  );
}
