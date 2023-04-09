import { v4 as uuidv4 } from 'uuid';

export default function CommentListUI({
  commentList,
  isMyComment,
  onClickCommentDelete,
}: {
  commentList: any;
  isMyComment: any;
  onClickCommentDelete: any;
}) {
  return (
    <div>
      <ul>
        {commentList.map((comment: any) => (
          <li key={uuidv4()}>
            <ul>
              <p>{comment.userNickname}</p>
              <li>{comment.commentContent}</li>
              {isMyComment(comment.userId) && (
                <>
                  <button type="button">edit</button>
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
        ))}
      </ul>
    </div>
  );
}
