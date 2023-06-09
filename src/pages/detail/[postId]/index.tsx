import { fetchCommentList, fetchPostDetail } from '@/common/firebase.query';
import PostDetail from '@/components/postDetail/postDetail.container';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';

/**
 * 블로그 상세페이지 최상위 컴포넌트
 * @param param0 data: 상세페이지에 필요한 데이터
 * @returns PostDetail : 상세페이지 컴포넌트
 */
export default function DetailPage({ postId }: { postId: string }) {
  /**
   * useQuery를 사용하여 게시물 상세 데이터를 가져옵니다.
   */
  const { data: postDetailData, isFetching: isFetchingDetail } = useQuery({
    queryKey: ['fetchPostDatail'],
    queryFn: async () => {
      const response = await fetchPostDetail(postId);
      return response;
    },
  });

  /**
   * useQuery를 사용하여 댓글 데이터를 가져옵니다.
   */

  const {
    data: commentListData,
    isFetching: isFetchingComment,
    refetch: commentRefetch,
  } = useQuery({
    queryKey: ['fetchCommentList'],
    queryFn: async () => {
      const response = await fetchCommentList(postId);
      return response;
    },
  });

  return (
    <PostDetail
      postDetailData={postDetailData}
      isFetchingDetail={isFetchingDetail}
      commentListData={commentListData}
      isFetchingComment={isFetchingComment}
      commentRefetch={commentRefetch}
      postId={postId}
    />
  );
}

/**
 * 이 함수는 Firebase 데이터베이스에서 서버 측 렌더링을 사용하여 특정 게시물의 데이터를 가져오는 함수입니다.
 * @param {object} context - 게시물 ID 매개변수가 포함된 컨텍스트 객체입니다.
 * @returns {object} - 게시물 데이터와 ID가 props로 포함된 객체를 반환합니다.
 */
export async function getServerSideProps(context: any) {
  // 컨텍스트 매개변수에서 게시물 ID를 가져옵니다.
  const { postId } = context.params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(['fetchPostDatail'], async () => {
    const postDetailData = await fetchPostDetail(postId);
    return postDetailData;
  });

  await queryClient.prefetchQuery(['fetchCommentList'], async () => {
    const commentListData = await fetchCommentList(postId);
    return commentListData;
  });

  // props 객체에 게시물 데이터와 ID를 포함하여 반환합니다.
  return {
    props: {
      postId,
      dehydratedState: dehydrate(queryClient),
    },
  };
}
