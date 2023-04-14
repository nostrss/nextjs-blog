import useLoginCheck from '@/hooks/useLoginCheck';
import { userState } from '@/store/userState';
import styled from '@emotion/styled';
import { firebaseAuth } from 'firebase.config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Image from 'next/image';

const WrapperHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid green;
  @media (max-width: 768px) {
    background-color: red;
    color: #fff;
  }
`;

const WrapperHeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
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
        displayName: userData?.displayName,
        photoURL: userData?.photoURL,
        screenName: userData?.reloadUserInfo.providerUserInfo[0].screenName,
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
        <h1>배너</h1>
      </Link>
      <WrapperHeaderRight>
        {userData ? (
          <>
            <ul>
              {/* <li>{userData?.email}</li>
              <li>{user?.screenName}</li> */}
              <Link href={`/profile/${user.screenName}`}>
                {user?.photoURL && (
                  <Image
                    src={user?.photoURL}
                    alt="user profile image"
                    width={80}
                    height={80}
                  />
                )}
              </Link>
            </ul>

            <button type="button" onClick={onClickLogout}>
              Sign Out
            </button>
            <button type="button">
              <Link href="/new-post">Write</Link>
            </button>
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
      </WrapperHeaderRight>
    </WrapperHeader>
  );
}
