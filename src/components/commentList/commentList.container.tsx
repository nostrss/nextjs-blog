import { firebaseDb } from 'firebase.config';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import commentState from '@/store/commentState';
import { useRecoilState } from 'recoil';
import CommentListUI from './commentList.presenter';

export default function CommentList() {
  const router = useRouter();
  const { postId } = router.query;
  const [commentList, setCommentList] = useState([]);
  const [isUpdateComment, setIsUpdateComment] = useRecoilState(commentState);

  const fetchCommentList = async () => {
    // @ts-ignore
    const commentListData = await getDoc(doc(firebaseDb, 'comments', postId));

    if (commentListData.data()) {
      // @ts-ignore
      setCommentList(commentListData.data().commentsList);
    }
  };

  useEffect(() => {
    fetchCommentList();
  }, []);

  useEffect(() => {
    if (isUpdateComment) {
      fetchCommentList();
      setIsUpdateComment(false);
    }
  }, [isUpdateComment]);

  return <CommentListUI commentList={commentList} />;
}
