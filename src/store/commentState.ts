import { atom } from 'recoil';

const commentState = atom({
  key: 'commentUpdateState',
  default: false,
});

export default commentState;
