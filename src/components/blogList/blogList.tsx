import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { v4 as uuidv4 } from 'uuid';
import { firebaseDb } from 'firebase.config';
import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';
import BlogListItem from './blogListItem/blogListItem';

export default function BlogList() {
  const [blogLists, setBlogLists] = useState<DocumentData[]>([]);
  const [isLastVisible, setIsLastVisible] = useState<DocumentData | null>(null);

  const fetchPostList = async () => {
    const isFirstLoading = blogLists.length === 0;

    const fetchQuery = isFirstLoading
      ? query(
          collection(firebaseDb, 'post'),
          orderBy('createdAt', 'desc'),
          limit(10),
        )
      : query(
          collection(firebaseDb, 'post'),
          orderBy('createdAt', 'desc'),
          startAfter(isLastVisible),
          limit(10),
        );

    let tmpList: DocumentData[] = [];
    await getDocs(fetchQuery)
      .then((querySnapshotData) => {
        setIsLastVisible(
          querySnapshotData.docs[querySnapshotData.docs.length - 1],
        );
        querySnapshotData.forEach((doc) => {
          tmpList = [...tmpList, doc.data()];
        });
        setBlogLists([...blogLists, ...tmpList]);
        return querySnapshotData;
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  return (
    <ul>
      <InfiniteScroll
        dataLength={blogLists.length}
        next={fetchPostList}
        hasMore={!!isLastVisible}
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
  );
}
