import { fetchDataListPerPage } from '@/common/api';
import BlogListItem from '@/components/blogListItem/blogListItem';
import Pagination from '@/components/pagination/paginateion';
import { BlogPost } from '@/mokData/dataList';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

interface IResponseLists {
  data: {
    total: number;
    bloglistData: BlogPost[];
  };
}

export default function BlogListPagination({ data }: IResponseLists) {
  return (
    <>
      <p>
        무한스크롤으로 보기
        <Link href="/">
          <button type="button">Go</button>
        </Link>
      </p>
      <ul>
        {data?.bloglistData.map((blogListItem: BlogPost) => (
          <BlogListItem key={uuidv4()} blogListItem={blogListItem} />
        ))}
      </ul>
      <Pagination totalItems={data.total} itemsPerPage={10} />
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { currentPage } = context.params;

  const res = await fetchDataListPerPage(currentPage);
  const { data } = res as IResponseLists;
  return {
    props: {
      data,
    },
  };
}
