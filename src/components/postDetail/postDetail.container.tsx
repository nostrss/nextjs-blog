import { userState } from '@/store/userState';
import { firebaseDb } from 'firebase.config';
import { deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import PostDetailUI from './postDetail.presenter';

export default function PostDetail({
  postDetailData,
  isFetchingDetail,
  commentListData,
  isFetchingComment,
  commentRefetch,
  postId,
}: {
  postDetailData: any;
  isFetchingDetail: boolean;
  commentListData: any;
  isFetchingComment: boolean;
  commentRefetch: any;
  postId: string;
}) {
  const router = useRouter();
  const [user] = useRecoilState(userState);
  const editUrl = `/detail/${postDetailData?.postId}/edit`;

  const isShowOptionButton = user?.userId === postDetailData?.userId;

  const onClickDelete = async () => {
    try {
      await deleteDoc(doc(firebaseDb, 'post', postDetailData.postId));
      router.push(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PostDetailUI
      onClickDelete={onClickDelete}
      isShowOptionButton={isShowOptionButton}
      postDetailData={postDetailData}
      isFetchingDetail={isFetchingDetail}
      commentListData={commentListData}
      isFetchingComment={isFetchingComment}
      commentRefetch={commentRefetch}
      editUrl={editUrl}
      postId={postId}
    />
  );
}
