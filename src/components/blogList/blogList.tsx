import { fetchDataListPerPage } from '@/common/api';
import { BlogPost } from '@/mokData/dataList';
import Link from 'next/link';
import { useEffect, useId, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function BlogList() {
  const [blogLists, setBlogLists] = useState<BlogPost[]>([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const prefix = useId();

  const fetchNextPage = async () => {
    const result = await fetchDataListPerPage(currentPage + 1);
    const data = result?.data;
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
          {blogLists?.map((item, index) => (
            <Link key={prefix + index} href={`/detail/${item.postId}`}>
              <li>
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </li>
            </Link>
          ))}
        </InfiniteScroll>
      </ul>
    </>
  );
}
