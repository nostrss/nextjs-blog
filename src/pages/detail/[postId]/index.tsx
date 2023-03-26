import { fetchDetailPageData } from '@/common/api';
import { BlogPost } from '@/mokData/dataList';
import { Suspense } from 'react';

interface IPropsDetail {
  data: {
    pageData: BlogPost;
  };
}

export default function DetailPage({ data }: IPropsDetail) {
  const { pageData } = data;

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div>
        <h1>Title : {pageData.postTitle}</h1>
        <p>Body : {pageData.postContents}</p>
        <p>createdAt : {pageData.createdAt}</p>
        <p>Likes : {pageData.likes}</p>
        <p>Views : {pageData.views}</p>
        <p>User.name{pageData.user.name}</p>
        <p>Tag</p>
        <ul>
          {pageData.tags?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>Comments</p>
        <ul>
          {pageData.comments?.map((item, index) => (
            <li key={index}>
              <p>Comment : {item.comment}</p>
              <p>createdAt : {item.createdAt}</p>
              <p>user.name : {item.user.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </Suspense>
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
