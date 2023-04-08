import useLoginCheck from '@/hooks/useLoginCheck';
import { useRouter } from 'next/router';
import { ComponentType, useEffect } from 'react';

export const WithAuth = (Component: ComponentType) =>
  function (props: any) {
    const router = useRouter();
    const userData = useLoginCheck();

    useEffect(() => {
      if (!userData) {
        router.push('/login');
      }
    }, [userData]);

    return <Component {...props} />;
  };

export default WithAuth;
