import { IPropsNewCommentsUI } from '@/interfaces';

export default function NewCommentUI({
  onChangeUseInput,
  onClickSaveComments,
}: IPropsNewCommentsUI) {
  return (
    <div>
      <div>Comments</div>
      <form action="post" onSubmit={onClickSaveComments}>
        <input type="text" onChange={onChangeUseInput} name="commentContent" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
