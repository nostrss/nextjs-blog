import Link from 'next/link';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import NewComment from '../newComment/newComment.container';
import CommentList from '../commentList/commentList.container';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function PostDetailUI({
  onClickDelete,
  isShowOptionButton,
  data,
  editUrl,
  isFetching,
}: any) {
  hljs.configure({
    languages: ['javascript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql'],
  });

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
    };
  }, []);

  return (
    <div>
      {isFetching && <div>Loading...</div>}
      {!isFetching && (
        <>
          <div>
            <h1>Title : {data?.title}</h1>
            <ReactQuill
              style={{ height: '100%' }}
              theme="bubble"
              value={data?.contents}
              readOnly
              modules={modules}
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
          <NewComment />
          <CommentList />
        </>
      )}
    </div>
  );
}
