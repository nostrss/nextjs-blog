import { fetchDetailPageData } from '@/common/api';
import { BlogPost } from '@/mokData/dataList';

interface IPropsDetail {
  data: {
    pageData: BlogPost;
  };
}

export default function DetailPage({ data }: IPropsDetail) {
  const { pageData } = data;

  return (
    <div>
      <h1>{pageData.title}</h1>
      <p>{pageData.body}</p>
      <p>{pageData.createdAt}</p>
      <p>{pageData.likes}</p>
      <p>{pageData.views}</p>
      <p>{pageData.user.name}</p>
      <p>{pageData.tag}</p>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { postId } = context.params;

  const res = await fetchDetailPageData(postId);
  const { data } = res as {
    data: { pageData: BlogPost };
  };

  return {
    props: {
      data,
    },
  };
}
