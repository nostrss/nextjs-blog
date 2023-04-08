import Profile from '@/components/profile/profile.container';
import { firebaseDb } from 'firebase.config';
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export default function ProfilePage({ data }: { data: DocumentData[] }) {
  return <Profile data={data} />;
}

export async function getServerSideProps(context: any) {
  // 컨텍스트 매개변수에서 게시물 ID를 가져옵니다.
  const { githubName } = context.params;

  const fetchPostQuery = collection(firebaseDb, 'post');
  const fetchQuery = query(
    fetchPostQuery,
    where('userNickname', '==', githubName),
  );

  const querySnapshot = await getDocs(fetchQuery);

  const data = querySnapshot.docs.map((postData) => {
    const tmp = JSON.stringify(postData.data());
    return JSON.parse(tmp);
  });

  return {
    props: {
      data,
    },
  };
}
