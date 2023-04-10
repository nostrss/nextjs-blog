import { firebaseDb } from 'firebase.config';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { returnUtcTime } from './utils';

export const mutateComment = async (
  postId: string,
  commentContent: string,
  user: any,
) => {
  const commentId = uuidv4();
  const updateRef = doc(firebaseDb, 'comments', postId);
  try {
    await updateDoc(updateRef, {
      commentsList: arrayUnion({
        commentId,
        commentContent,
        createdAt: returnUtcTime(),
        updatedAt: returnUtcTime(),
        userId: user.userId,
        userName: user.displayName,
        userNickname: user.screenName,
      }),
    });
  } catch (error) {
    console.error(error);
  }
};

export const first = () => {};
