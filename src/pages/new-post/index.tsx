import NewPostContainer from '@/components/newPost/newPost.container';
import withAuth from '@/hoc/withAuth';

/**
 * 새로운 포스트 작성 페이지 최상위 컴포넌트
 * @returns NewPostContainer : 새로운 포스트 작성 페이지 컴포넌트
 */

function NewPostPage() {
  return <NewPostContainer />;
}

export default withAuth(NewPostPage);
