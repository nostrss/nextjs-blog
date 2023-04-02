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
