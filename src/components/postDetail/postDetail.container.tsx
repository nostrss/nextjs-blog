import { userState } from '@/store/userState';
import { firebaseDb } from 'firebase.config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import PostDetailUI from './postDetail.presenter';

export default function PostDetail({ data }: any) {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const editUrl = `/detail/${data?.postId}/edit`;

  const isShowOptionButton = user?.userId === data?.userId;

  const onClickDelete = async () => {
    try {
      await deleteDoc(doc(firebaseDb, 'post', data.postId));
      router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostDetailUI
      onClickDelete={onClickDelete}
      isShowOptionButton={isShowOptionButton}
      data={data}
      editUrl={editUrl}
    />
  );
}
