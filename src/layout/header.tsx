import useLoginCheck from '@/hooks/useLoginCheck';
import { userState } from '@/store/userState';
import styled from '@emotion/styled';
import { firebaseAuth } from 'firebase.config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const WrapperHeader = styled.div`
  width: 100%;
  border: 1px solid green;
  @media (max-width: 768px) {
    background-color: red;
    color: #fff;
  }
`;

export default function Header() {
  const userData = useLoginCheck();
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    if (userData?.email) {
      setUser({
        ...user,
        userId: userData?.uid,
        email: userData?.email,
      });
    }
  }, [userData]);

  const router = useRouter();

  const onClickLogout = async () => {
    try {
      await firebaseAuth.signOut();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <WrapperHeader>
      <Link href="/">
        <h1>헤더입니다</h1>
      </Link>
      <div>
        {userData ? (
          <>
            {userData?.email}
            <button type="button" onClick={onClickLogout}>
              Sign Out
            </button>
            <Link href="/new-post">
              <button type="button">Write</button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <button type="button">Log In</button>
            </Link>
            <Link href="/signup">
              <button type="button">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </WrapperHeader>
  );
}
