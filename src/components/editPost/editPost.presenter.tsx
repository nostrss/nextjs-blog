import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function EditPostUI({
  data,
  titleInputId,
  modules,
  formats,
  isPostContents,
  quillRef,
  setIsPostContents,
  onChangeUseInput,
  onClickUpdate,
  inputValue,
}: any) {
  return (
    <div>
      <label htmlFor={titleInputId}>
        Title
        <input
          type="text"
          id={titleInputId}
          name="title"
          placeholder="title"
          onChange={onChangeUseInput}
          value={inputValue.title || data.title}
          // defaultValue={data.title}
        />
      </label>
      <ReactQuill
        style={{ height: '100%' }}
        theme="snow"
        value={isPostContents || data.contents}
        // defaultValue={data.contents}
        onChange={setIsPostContents}
        modules={modules}
        formats={formats}
        // @ts-ignore
        ref={quillRef}
        placeholder="Write something..."
      />
      <button onClick={onClickUpdate} type="button">
        Update
      </button>
    </div>
  );
}
