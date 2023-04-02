import { useMemo, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useGetId from '@/hooks/useGetId';
import { firebaseDb } from 'firebase.config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { formats } from '@/constants/constants';
import NewPostUI from './newPost.presenter';

export default function NewPostContainer() {
  const quillRef: any = useRef();
  const [isPostContents, setIsPostContents] = useState('');
  const { inputValue, onChangeUseInput } = useInput({
    title: '',
  });
  const titleInputId = useGetId({});

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const file: any = input && input.files ? input.files[0] : null;
      const formData = new FormData();
      formData.append('file', file);
      // const quillObj = quillRef.current.getEditor();
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const onClickSave = async () => {
    const postId = uuidv4();
    try {
      await setDoc(doc(firebaseDb, 'post', postId), {
        postId,
        title: inputValue.title,
        contents: isPostContents,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewPostUI
      titleInputId={titleInputId}
      modules={modules}
      formats={formats}
      isPostContents={isPostContents}
      quillRef={quillRef}
      setIsPostContents={setIsPostContents}
      onChangeUseInput={onChangeUseInput}
      onClickSave={onClickSave}
    />
  );
}
