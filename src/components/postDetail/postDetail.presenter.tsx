import Link from 'next/link';
// import { Suspense } from 'react';

export default function PostDetailUI({
  onClickDelete,
  isShowOptionButton,
  data,
  editUrl,
}: any) {
  return (
    <div>
      <div>
        <h1>Title : {data?.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: data?.contents,
          }}
        />
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
    </div>
  );
}
