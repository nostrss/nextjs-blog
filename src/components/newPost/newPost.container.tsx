import { useMemo, useRef, useState } from 'react';
import useInput from '@/hooks/useInput';
import useGetId from '@/hooks/useGetId';
import { v4 as uuidv4 } from 'uuid';
import { formats } from '@/constants/constants';
import { userState } from '@/store/userState';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import hljs from 'highlight.js';
import { returnUtcTime } from '@/common/utils';
import { mutateInitComment, mutateNewPost } from '@/common/firebase.mutate';
import { useMutation } from '@tanstack/react-query';
import { INewPostData } from '@/interfaces';
import { firebaseStorage } from 'firebase.config';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import NewPostUI from './newPost.presenter';

export default function NewPostContainer() {
  const quillRef: any = useRef(null);
  const [isPostContents, setIsPostContents] = useState('');
  const [user] = useRecoilState(userState);
  const router = useRouter();

  const { inputValue, onChangeUseInput } = useInput({
    title: '',
  });
  const titleInputId = useGetId({});
  const createNewPost = useMutation(
    async (newPostData: INewPostData) => {
      await mutateNewPost(newPostData);
      await mutateInitComment(newPostData.postId);
    },
    {
      onSuccess: (_data, variables) => {
        router.push(`/detail/${variables.postId}`);
      },
    },
  );

  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (input.files === null) return;
      const file = input.files[0];
      const imageId = uuidv4();
      const storageRef = ref(firebaseStorage, imageId);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.info(`Upload is ${progress}% done`);

            switch (snapshot.state) {
              case 'paused':
                console.error('Upload is paused');
                break;
              case 'running':
                console.info('Upload is running');
                break;
              default:
                console.info('default');
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(error);
          },
          async () => {
            // Handle successful uploads on complete

            const firebaseUrl = await getDownloadURL(
              uploadTask.snapshot.ref,
            ).then((downloadURL) => {
              return downloadURL;
            });

            // console.log(quillRef.current);
            const editor = quillRef.current?.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', firebaseUrl);
            editor.setSelection(range.index + 1);
          },
        );
      } catch (error) {
        console.error(error);
      }
    });
  };

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
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const onClickSave = async () => {
    const postId = uuidv4();
    const newPostData = {
      postId,
      title: inputValue.title,
      contents: isPostContents,
      createdAt: returnUtcTime(),
      updatedAt: returnUtcTime(),
      userId: user.userId,
      userName: user.displayName,
      userNickname: user.screenName,
    };
    try {
      await createNewPost.mutate(newPostData);
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
      isMutationLoading={createNewPost.isLoading}
    />
  );
}
