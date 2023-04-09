import { firebaseDb } from 'firebase.config';
import { useRouter } from 'next/router';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import commentState from '@/store/commentState';
import { useRecoilState } from 'recoil';
import { userState } from '@/store/userState';
import CommentListUI from './commentList.presenter';

export default function CommentList() {
  const router = useRouter();
  const { postId } = router.query;
  const [commentList, setCommentList] = useState([]);
  const [isUpdateComment, setIsUpdateComment] = useRecoilState(commentState);
  const [loginUser] = useRecoilState(userState);

  const isMyComment = (userId: string) => {
    return userId === loginUser.userId;
  };

  const fetchCommentList = async () => {
    // @ts-ignore
    const commentListData = await getDoc(doc(firebaseDb, 'comments', postId));

    if (commentListData.data()) {
      // @ts-ignore
      setCommentList(commentListData.data().commentsList);
    }
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  useEffect(() => {
    if (isUpdateComment) {
      fetchCommentList();
      setIsUpdateComment(false);
    }
  }, [isUpdateComment]);

  const onClickCommentDelete = async (commentId: string) => {
    const newCommentArray = commentList.filter((comment: any) => {
      return comment.commentId !== commentId;
    });

    // @ts-ignore
    const updateRef = doc(firebaseDb, 'comments', postId);

    try {
      await updateDoc(updateRef, {
        commentsList: newCommentArray,
      }).then(() => {
        // 성공
        setIsUpdateComment(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentListUI
      commentList={commentList}
      isMyComment={isMyComment}
      onClickCommentDelete={onClickCommentDelete}
    />
  );
}
