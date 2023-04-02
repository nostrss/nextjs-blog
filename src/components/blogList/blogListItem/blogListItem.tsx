import { BlogPost } from '@/mokData/dataList';
import Link from 'next/link';

export default function BlogListItem({
  blogListItem,
}: {
  blogListItem: BlogPost;
}) {
  return (
    <article>
      <Link href={`/detail/${blogListItem.postId}`}>
        <li>
          <h2>{blogListItem.postTitle}</h2>
          <p>{blogListItem.postContents}</p>
          <p>{blogListItem.user.name}</p>
          <p>{blogListItem.views}</p>
          <p>{blogListItem.likes}</p>
          <button type="button">Like</button>
        </li>
      </Link>
    </article>
  );
}
