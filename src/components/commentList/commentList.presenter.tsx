import { v4 as uuidv4 } from 'uuid';
import CommentItem from './commentItem/commentItem';

export default function CommentListUI({
  commentsList,
  isMyComment,
  onClickCommentDelete,
  onClickUpdateComments,
  isFetchingComment,
}: {
  commentsList: any;
  isMyComment: any;
  onClickCommentDelete: any;
  onClickUpdateComments: any;
  isFetchingComment: any;
}) {
  return (
    <div>
      {isFetchingComment && <div>댓글을 불러오는 중입니다...</div>}
      {!isFetchingComment && commentsList.length === 0 && (
        <div>댓글이 없습니다.</div>
      )}
      {!isFetchingComment && commentsList.length !== 0 && (
        <ul>
          {commentsList.map((comment: any) => (
            <CommentItem
              key={uuidv4()}
              comment={comment}
              isMyComment={isMyComment}
              onClickCommentDelete={onClickCommentDelete}
              onClickUpdateComments={onClickUpdateComments}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
