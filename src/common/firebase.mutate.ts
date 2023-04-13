import { firebaseDb } from 'firebase.config';
import {
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { INewPostData } from '@/interfaces';
import { returnUtcTime } from './utils';

/**
 * 특정 게시물 문서의 'comments' 컬렉션의 commentsList 배열에 새 댓글을 추가하는 함수
 * @param postId : {string} postId - 댓글을 추가할 게시물 문서의 ID입니다.
 * @param commentContent : {string} commentContent - 추가할 댓글의 내용입니다.
 * @param user : {Object} user - 댓글을 게시한 사용자에 관한 정보를 담고 있는 객체입니다.
 */
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

/**
 * 최초 글 생성 시  comments 컬렉션에 postId를 키로 하는 빈 배열의 문서를 생성하는 함수
 * @param postId
 */
export const mutateInitComment = async (postId: string) => {
  await setDoc(doc(firebaseDb, 'comments', postId), {
    postId,
    commentsList: [],
  });
};

export const mutateNewPost = async (newPostData: INewPostData) => {
  const { postId } = newPostData;
  try {
    await setDoc(doc(firebaseDb, 'post', postId), {
      ...newPostData,
    } as any);
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId: string) => {
  try {
    await deleteDoc(doc(firebaseDb, 'post', postId));
    await deleteDoc(doc(firebaseDb, 'comments', postId));
  } catch (error) {
    console.error(error);
  }
};
