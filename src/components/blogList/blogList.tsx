import { fetchData } from '@/common/api';
import { BlogPost } from '@/mokData/dataList';
import { useEffect, useId, useState } from 'react';
import Pagination from '../pagination/paginateion';

interface IResponseLists {
  total: number;
  bloglistData: BlogPost[];
}

export default function BlogList() {
  const [lists, setLists] = useState<IResponseLists>({
    total: 0,
    bloglistData: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const prefix = useId();

  useEffect(() => {
    fetchData(setLists, currentPage);
  }, [currentPage]);
  return (
    <>
      <h1>블로그 리스트 입니다</h1>
      <ul>
        {lists?.bloglistData.map((item, index) => (
          <li key={prefix + index}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
      {/* <Pagination
        totalItems={lists.total}
        itemsPerPage={10}
        setCurrentPage={setCurrentPage}
      /> */}
    </>
  );
}
