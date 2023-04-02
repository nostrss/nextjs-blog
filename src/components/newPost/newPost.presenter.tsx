import { IPropsNewPostUI } from '@/interfaces';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export default function NewPostUI({
  modules,
  formats,
  isPostContents,
  quillRef,
  setIsPostContents,
  titleInputId,
  onChangeUseInput,
  onClickSave,
}: IPropsNewPostUI) {
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
        />
      </label>
      <ReactQuill
        style={{ height: '100%' }}
        theme="snow"
        value={isPostContents}
        onChange={setIsPostContents}
        modules={modules}
        formats={formats}
        // @ts-ignore
        ref={quillRef}
        placeholder="Write something..."
      />
      <button onClick={onClickSave} type="button">
        Save
      </button>
    </div>
  );
}
