import { firebaseDb } from 'firebase.config';
import { doc, updateDoc } from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';
import CommentListUI from './commentList.presenter';

export default function CommentList({
  commentListData,
  isFetchingComment,
  commentRefetch,
}: any) {
  const { postId } = commentListData;
  const { commentsList } = commentListData;
  const [loginUser] = useRecoilState(userState);

  const isMyComment = (userId: string) => {
    return userId === loginUser.userId;
  };

  const onClickCommentDelete = async (commentId: string) => {
    const newCommentArray = commentsList.filter((comment: any) => {
      return comment.commentId !== commentId;
    });
    // @ts-ignore
    const updateRef = doc(firebaseDb, 'comments', postId);
    try {
      await updateDoc(updateRef, {
        commentsList: newCommentArray,
      }).then(() => {
        commentRefetch();
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClickUpdateComments = async (updatdCommentData: any) => {
    if (postId === undefined) return;
    const newCommentArray = commentsList.filter((comment: any) => {
      return comment.commentId !== updatdCommentData[0].commentId;
    });
    // @ts-ignore
    const updateRef = doc(firebaseDb, 'comments', postId);
    try {
      await updateDoc(updateRef, {
        commentsList: [...newCommentArray, ...updatdCommentData],
      }).then(() => {
        commentRefetch();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentListUI
      commentsList={commentsList}
      isMyComment={isMyComment}
      onClickCommentDelete={onClickCommentDelete}
      onClickUpdateComments={onClickUpdateComments}
      isFetchingComment={isFetchingComment}
    />
  );
}
