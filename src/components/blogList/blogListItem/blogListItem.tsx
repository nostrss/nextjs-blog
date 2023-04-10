import { convertUtcToLocal } from '@/common/utils';
import Link from 'next/link';
import parse from 'node-html-parser';

export default function BlogListItem({ blogListItem }: any) {
  const plainContents = parse(blogListItem.contents).text;
  const creadtedAt = convertUtcToLocal(blogListItem.createdAt);

  return (
    <article>
      <Link href={`/detail/${blogListItem.postId}`}>
        <li>
          <h2>{blogListItem.title}</h2>
          <p>{plainContents}</p>
          <p>{creadtedAt}</p>
          <button type="button">Like</button>
        </li>
      </Link>
    </article>
  );
}
