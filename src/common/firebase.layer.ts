import { firebaseDb } from 'firebase.config';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { returnUtcTime } from './utils';

export const fetchPostDetail = async (postId: string) => {
  const postData = await getDoc(doc(firebaseDb, 'post', postId));
  const stringifyData = JSON.stringify(postData.data());

  return {
    postId,
    ...JSON.parse(stringifyData),
  };
};

export const fetchCommentList = async (postId: string) => {
  const commentListData = await getDoc(doc(firebaseDb, 'comments', postId));
  const stringifyData = JSON.stringify(commentListData.data());
  return {
    ...JSON.parse(stringifyData),
  };
};

export const mutateCommentList = async (
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
