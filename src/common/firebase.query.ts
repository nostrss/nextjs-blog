import { firebaseDb } from 'firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { DocumentToObj } from './utils';

/**
 * 상세 블로그 글 정보를 가져올때 사용하는 함수
 * @param postId 블로그 글 id
 * @returns 블로그 글 상세 정보
 */
export const fetchPostDetail = async (postId: string) => {
  const postData = await getDoc(doc(firebaseDb, 'post', postId));
  const data = DocumentToObj(postData.data());

  return {
    postId,
    ...data,
  };
};

/**
 * 댓글 리스트를 가져올때 사용하는 함수
 * @param postId 블로그 글 id
 * @returns 블로그 글에 달린 댓글 리스트
 */
export const fetchCommentList = async (postId: string) => {
  const commentListData = await getDoc(doc(firebaseDb, 'comments', postId));
  const data = DocumentToObj(commentListData.data());
  return {
    ...data,
  };
};
