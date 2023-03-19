import { fetchDataListPerPage } from '@/common/api';
import Pagination from '@/components/pagination/paginateion';
import { BlogPost } from '@/mokData/dataList';
import Link from 'next/link';
import { useId } from 'react';

interface IResponseLists {
  total: number;
  bloglistData: BlogPost[];
}

export default function BlogListPagination({ data }: any) {
  const prefix = useId();

  return (
    <>
      <p>
        무한스크롤으로 보기
        <Link href={'/'}>
          <button>Go</button>
        </Link>
      </p>
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

  const res = await fetchDataListPerPage(currentPage);
  const data = res?.data;
  return {
    props: {
      data,
    },
  };
}
