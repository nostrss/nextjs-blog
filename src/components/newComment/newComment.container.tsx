import { userState } from '@/store/userState';
import { useRecoilState } from 'recoil';
import useInput from '@/hooks/useInput';
import React from 'react';
import { mutateCommentList } from '@/common/firebase.layer';
import NewCommentUI from './newComment.presenter';

export default function NewComment({
  commentRefetch,
  postId,
}: {
  commentRefetch: any;
  postId: string;
}) {
  const [user] = useRecoilState(userState);
  const { inputValue, onChangeUseInput } = useInput({
    commentContent: '',
  });

  const onClickSaveComments = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (postId === undefined) return;

    await mutateCommentList(postId, inputValue.commentContent, user).then(
      () => {
        commentRefetch();
      },
    );
  };

  return (
    <NewCommentUI
      onChangeUseInput={onChangeUseInput}
      onClickSaveComments={onClickSaveComments}
    />
  );
}
