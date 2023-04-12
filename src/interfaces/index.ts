/* eslint-disable */

import React, { LegacyRef, MutableRefObject } from 'react';

export interface IUsedGetId {
  prefix?: string;
  postfix?: string;
}

export interface IPropsRegisterFormUI {
  emailInputId: string;
  passwordInputId: string;
  passwordConfirmInputId?: string;
  onChangeUseInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitCreatAccount: (event: React.FormEvent<HTMLFormElement>) => void;
  onSubmitLogin: (event: React.FormEvent<HTMLFormElement>) => void;
  path?: string;
  onClickGithubLogin: () => void;
}

export interface IPropsNewPostUI {
  modules: {};
  formats: string[];
  isPostContents: string;
  quillRef: any;
  setIsPostContents: React.Dispatch<React.SetStateAction<string>>;
  titleInputId: string;
  onChangeUseInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface IPropsNewCommentsUI {
  onChangeUseInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickSaveComments: (event: React.FormEvent<HTMLFormElement>) => void;
}

export interface INewPostData {
  postId: string;
  title: any;
  contents: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string | null;
  userNickname: string;
}
