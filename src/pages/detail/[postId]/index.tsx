import { userState } from '@/store/userState';
import { firebaseDb } from 'firebase.config';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { Suspense } from 'react';
import { useRecoilState } from 'recoil';

export default function DetailPage({ data }: any) {
  const router = useRouter();
  const [user] = useRecoilState(userState);

  const onClickDelete = async () => {
    try {
      await deleteDoc(doc(firebaseDb, 'post', data.postId));
      router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div>
        <h1>Title : {data.title}</h1>
        <p>Body : {data.contents}</p>
      </div>
      {user.userId === data.userId && (
        <button type="button" onClick={onClickDelete}>
          Delete
        </button>
      )}
    </Suspense>
  );
}

export async function getServerSideProps(context: any) {
  const { postId } = context.params;

  const fetchPost = async (
    fDb: any,
    firebaseColID: string,
    firebaseDocID: string,
  ) => {
    const postData = await getDoc(doc(fDb, firebaseColID, firebaseDocID));
    return JSON.stringify(postData.data());
  };

  const data = await fetchPost(firebaseDb, 'post', postId).then((res) => {
    return {
      postId,
      ...JSON.parse(res),
    };
  });

  return {
    props: {
      data,
    },
  };
}
