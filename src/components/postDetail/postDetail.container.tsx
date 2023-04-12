import { userState } from '@/store/userState';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { deletePost } from '@/common/firebase.mutate';
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
      await deletePost(postId);
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
