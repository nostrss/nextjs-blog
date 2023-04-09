import { v4 as uuidv4 } from 'uuid';

export default function CommentListUI({ commentList }: { commentList: any }) {
  return (
    <div>
      <ul>
        {commentList.map((comment: any) => (
          <li key={uuidv4()}>
            <ul>
              <p>{comment.userNickname}</p>
              <li>{comment.commentContent}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
