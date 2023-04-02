import Link from 'next/link';

export default function BlogListItem({ blogListItem }: any) {
  return (
    <article>
      <Link href={`/detail/${blogListItem.postId}`}>
        <li>
          <h2>{blogListItem.title}</h2>
          <p>{blogListItem.contents}</p>
          <p>{blogListItem.timestamp}</p>
          <button type="button">Like</button>
        </li>
      </Link>
    </article>
  );
}
