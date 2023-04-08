import Link from 'next/link';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

// import { Suspense } from 'react';

export default function PostDetailUI({
  onClickDelete,
  isShowOptionButton,
  data,
  editUrl,
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
      <div>
        <h1>Title : {data?.title}</h1>
        <ReactQuill
          style={{ height: '100%' }}
          theme="bubble"
          value={data?.contents}
          readOnly
          modules={modules}
          // formats={formats}
        />
        {/* <WrapperContents
          dangerouslySetInnerHTML={{
            __html: contents,
          }}
        /> */}
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
