import { atom } from 'recoil';

/**
 * 현재 접속한 유저의 정보를 저장하는 atom
 */
export const userState = atom({
  key: 'userState',
  default: {
    userId: '',
    email: '' as string | null,
    displayName: '' as string | null,
    photoURL: '' as string | null,
    screenName: '' as any,
  },
});

export const userProfileState = atom({
  key: 'userProfileState',
  default: false,
});
