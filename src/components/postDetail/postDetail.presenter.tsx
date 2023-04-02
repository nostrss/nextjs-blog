import Link from 'next/link';
import { Suspense } from 'react';

export default function PostDetailUI({
  onClickDelete,
  isShowOptionButton,
  data,
  editUrl,
}: any) {
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div>
        <h1>Title : {data?.title}</h1>
        <p>Body : {data?.contents}</p>
      </div>
      {isShowOptionButton && (
        <>
          <button type="button" onClick={onClickDelete}>
            Delete
          </button>
          <Link href={editUrl}>
            <button type="button">Edit</button>
          </Link>
        </>
      )}
    </Suspense>
  );
}
