import { IPropsNewPostUI } from '@/interfaces';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/atom-one-dark.css';
import { Wrapper, WrapperHalf } from './newPost.style';

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false },
);

export default function NewPostUI({
  modules,
  formats,
  isPostContents,
  quillRef,
  setIsPostContents,
  titleInputId,
  onChangeUseInput,
  onClickSave,
  isMutationLoading,
  modulesReadOnly,
}: IPropsNewPostUI) {
  return (
    <Wrapper>
      <WrapperHalf>
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
          forwardedRef={quillRef}
          placeholder="Write something..."
        />
        <button
          onClick={onClickSave}
          type="button"
          disabled={isMutationLoading}
        >
          Save
        </button>
        {isMutationLoading && <p>loading...</p>}
      </WrapperHalf>
      <WrapperHalf>
        <ReactQuill
          style={{ height: '100%' }}
          theme="snow"
          value={isPostContents}
          modules={modulesReadOnly}
          formats={formats}
          readOnly
        />
      </WrapperHalf>
    </Wrapper>
  );
}
