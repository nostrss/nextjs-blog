import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    userId: '',
    email: '',
  },
});

export const userProfileState = atom({
  key: 'userProfileState',
  default: false,
});
