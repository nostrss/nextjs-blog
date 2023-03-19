import { fetchDataListPage } from '@/common/api';
import Pagination from '@/components/pagination/paginateion';
import { BlogPost } from '@/mokData/dataList';
import { useId } from 'react';

interface IResponseLists {
  total: number;
  bloglistData: BlogPost[];
}

export default function BlogListPagination({ data }: any) {
  const prefix = useId();

  return (
    <>
      <h1>블로그 리스트 입니다</h1>
      <ul>
        {data?.bloglistData.map((item: any, index: number) => (
          <li key={prefix + index}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      <Pagination totalItems={data.total} itemsPerPage={10} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { currentPage } = context.params;

  const res = await fetchDataListPage(currentPage);
  const data = res?.data;
  return {
    props: {
      data,
    },
  };
}
