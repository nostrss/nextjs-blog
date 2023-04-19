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
import {
  mutateInitComment,
  mutateNewPost,
  upLoadFiels,
} from '@/common/firebase.mutate';
import { useMutation } from '@tanstack/react-query';
import { INewPostData } from '@/interfaces';
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
      const url = await upLoadFiels(file, imageId);
      const editor = quillRef.current?.getEditor();
      const range = editor.getSelection();
      editor.insertEmbed(range.index, 'image', url);
      editor.setSelection(range.index + 1);
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

  const modulesReadOnly = useMemo(() => {
    return {
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [],
      },
    };
  }, []);

  const onClickSave = () => {
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
      createNewPost.mutate(newPostData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <NewPostUI
      titleInputId={titleInputId}
      modules={modules}
      modulesReadOnly={modulesReadOnly}
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
