import { fetchDataListPerPage } from '@/common/api';
import { BlogPost } from '@/mokData/dataList';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import BlogListItem from './blogListItem/blogListItem';

export default function BlogList() {
  const [blogLists, setBlogLists] = useState<BlogPost[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const fetchNextPage = async () => {
    const result = await fetchDataListPerPage(currentPage + 1);
    const { data } = result as {
      data: { total: number; bloglistData: BlogPost[] };
    };
    setTotalPage(data.total);
    setBlogLists([...blogLists, ...data.bloglistData]);
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  return (
    <>
      <h1>블로그 무한스크롤 페이지입니다.</h1>
      <p>
        페이지네이션으로 보기
        <Link href="/page/1">
          <button type="button">Go</button>
        </Link>
      </p>
      <ul>
        <InfiniteScroll
          dataLength={blogLists.length}
          next={fetchNextPage}
          hasMore={totalPage !== blogLists.length}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold={0.8}
        >
          {blogLists?.map((blogListItem) => (
            <BlogListItem key={uuidv4()} blogListItem={blogListItem} />
          ))}
        </InfiniteScroll>
      </ul>
    </>
  );
}
