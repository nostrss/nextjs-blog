import useInput from '@/hooks/useInput';
import { useState } from 'react';

export default function CommentItem({
  comment,
  isMyComment,
  onClickCommentDelete,
  onClickUpdateComments,
}: {
  comment: any;
  isMyComment: any;
  onClickCommentDelete: any;
  onClickUpdateComments: any;
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { inputValue, onChangeUseInput } = useInput({
    commentContent: '',
  });

  const onClickEdit = () => {
    setIsEditMode(true);
  };

  const onClickUpdate = () => {
    onClickUpdateComments([
      {
        ...comment,
        commentContent: inputValue.commentContent,
      },
    ]);
    setIsEditMode(false);
  };

  return (
    <div>
      {isEditMode ? (
        <div>
          <div>수정모드입니다</div>
          <div>
            <input
              type="text"
              onChange={onChangeUseInput}
              name="commentContent"
              value={inputValue.commentContent || comment.commentContent}
            />
            <button type="button" onClick={onClickUpdate}>
              update
            </button>
            <button type="button">cancel</button>
          </div>
        </div>
      ) : (
        <li>
          <ul>
            <p>{comment.userNickname}</p>
            <li>{comment.commentContent}</li>
            {isMyComment(comment.userId) && (
              <>
                <button type="button" onClick={onClickEdit}>
                  edit
                </button>
                <button
                  type="button"
                  onClick={() => onClickCommentDelete(comment.commentId)}
                >
                  del
                </button>
              </>
            )}
          </ul>
        </li>
      )}
    </div>
  );
}
