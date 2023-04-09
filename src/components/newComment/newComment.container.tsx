import { v4 as uuidv4 } from 'uuid';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { firebaseDb } from 'firebase.config';
import { userState } from '@/store/userState';
import { useRecoilState } from 'recoil';
import useInput from '@/hooks/useInput';
import React from 'react';
import commentState from '@/store/commentState';
import NewCommentUI from './newComment.presenter';

export default function NewComment() {
  const router = useRouter();
  const { postId } = router.query;
  const [user] = useRecoilState(userState);
  const [, setIsUpdateComment] = useRecoilState(commentState);
  const { inputValue, onChangeUseInput } = useInput({
    commentContent: '',
  });

  const onClickSaveComments = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (postId === undefined) return;
    const commentId = uuidv4();
    // @ts-ignore
    const updateRef = doc(firebaseDb, 'comments', postId);

    try {
      await updateDoc(updateRef, {
        commentsList: arrayUnion({
          commentId,
          commentContent: inputValue.commentContent,
          // createdAt: serverTimestamp(),
          // updatedAt: serverTimestamp(),
          userId: user.userId,
          userName: user.displayName,
          userNickname: user.screenName,
        }),
      }).then(() => {
        // 성공
        setIsUpdateComment(true);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewCommentUI
      onChangeUseInput={onChangeUseInput}
      onClickSaveComments={onClickSaveComments}
    />
  );
}
