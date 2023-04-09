import { v4 as uuidv4 } from 'uuid';
import CommentItem from './commentItem/commentItem';

export default function CommentListUI({
  commentList,
  isMyComment,
  onClickCommentDelete,
  onClickUpdateComments,
}: {
  commentList: any;
  isMyComment: any;
  onClickCommentDelete: any;
  onClickUpdateComments: any;
}) {
  return (
    <div>
      <ul>
        {commentList.map((comment: any) => (
          <CommentItem
            key={uuidv4()}
            comment={comment}
            isMyComment={isMyComment}
            onClickCommentDelete={onClickCommentDelete}
            onClickUpdateComments={onClickUpdateComments}
          />
        ))}
      </ul>
    </div>
  );
}
