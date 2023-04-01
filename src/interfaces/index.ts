import React from 'react';

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
  path?: string;
}
