import { useMemo, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useGetId from '@/hooks/useGetId';
import { firebaseDb } from 'firebase.config';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { formats } from '@/constants/constants';
import { userState } from '@/store/userState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import hljs from 'highlight.js';
import { returnUtcTime } from '@/common/utils';
import { mutateInitComment } from '@/common/firebase.mutate';
import NewPostUI from './newPost.presenter';

export default function NewPostContainer() {
  const quillRef: any = useRef();
  const [isPostContents, setIsPostContents] = useState('');
  const [user] = useRecoilState(userState);
  const router = useRouter();

  const { inputValue, onChangeUseInput } = useInput({
    title: '',
  });
  const titleInputId = useGetId({});

  // const imageHandler = async () => {
  //   const input = document.createElement('input');
  //   input.setAttribute('type', 'file');
  //   input.setAttribute('accept', 'image/*');
  //   input.click();
  //   input.onchange = async () => {
  //     const file: any = input && input.files ? input.files[0] : null;
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     // const quillObj = quillRef.current.getEditor();
  //   };
  // };

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

  const onClickSave = async () => {
    const postId = uuidv4();
    try {
      await setDoc(doc(firebaseDb, 'post', postId), {
        postId,
        title: inputValue.title,
        contents: isPostContents,
        createdAt: returnUtcTime(),
        updatedAt: returnUtcTime(),
        userId: user.userId,
        userName: user.displayName,
        userNickname: user.screenName,
      }).then(async () => {
        await mutateInitComment('comments', postId).then(() => {
          router.push(`/detail/${postId}`);
        });
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
