import Link from 'next/link';
import parse from 'node-html-parser';

export default function BlogListItem({ blogListItem }: any) {
  const plainContents = parse(blogListItem.contents).text;

  const date = new Date(
    blogListItem.createdAt.seconds * 1000,
  ).toLocaleDateString('ko-KR');
  return (
    <article>
      <Link href={`/detail/${blogListItem.postId}`}>
        <li>
          <h2>{blogListItem.title}</h2>
          <p>{plainContents}</p>
          <p>{date}</p>
          <button type="button">Like</button>
        </li>
      </Link>
    </article>
  );
}
