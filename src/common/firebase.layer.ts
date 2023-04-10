import { firebaseDb } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';

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
