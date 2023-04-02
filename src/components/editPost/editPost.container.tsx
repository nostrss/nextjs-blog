import { formats } from '@/constants/constants';
import { useMemo, useRef, useState } from 'react';
// import { useRecoilState } from 'recoil';
// import { userState } from '@/store/userState';
import { useRouter } from 'next/router';
import useInput from '@/hooks/useInput';
import useGetId from '@/hooks/useGetId';
import { firebaseDb } from 'firebase.config';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import EditPostUI from './editPost.presenter';

export default function EditPost({ data }: any) {
  const quillRef: any = useRef();
  const [isPostContents, setIsPostContents] = useState('');
  // const [user] = useRecoilState(userState);
  const router = useRouter();

  const { inputValue, onChangeUseInput } = useInput({
    title: '',
  });
  const titleInputId = useGetId({});

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        // handlers: {
        //   image: imageHandler,
        // },
      },
    };
  }, []);

  const onClickUpdate = async () => {
    const updateRef = doc(firebaseDb, 'post', data.postId);

    try {
      await updateDoc(updateRef, {
        title: inputValue.title,
        contents: isPostContents,
        updatedAt: serverTimestamp(),
      }).then(() => {
        router.push(`/detail/${data.postId}`);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <EditPostUI
      data={data}
      titleInputId={titleInputId}
      modules={modules}
      formats={formats}
      isPostContents={isPostContents}
      quillRef={quillRef}
      setIsPostContents={setIsPostContents}
      onChangeUseInput={onChangeUseInput}
      onClickUpdate={onClickUpdate}
      inputValue={inputValue}
    />
  );
}
