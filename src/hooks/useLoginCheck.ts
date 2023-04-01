import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth } from 'firebase.config';

export default function useLoginCheck() {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const onAuthChange = async () => {
      await onAuthStateChanged(firebaseAuth, (user: any) => {
        setUserData(user);
      });
    };
    onAuthChange();
  }, []);

  return userData;
}
