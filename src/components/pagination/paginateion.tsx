import { useRouter } from 'next/router';

interface IPaginationProps {
  totalItems: number;
  itemsPerPage: number;
}

export default function Pagination({
  totalItems,
  itemsPerPage,
}: IPaginationProps) {
  const router = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const onClickNewPage = (newPage: number) => {
    router.push(`/page/${newPage}`);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pages.push(
        <li key={i}>
          <button type="button" onClick={() => onClickNewPage(i)}>
            {i}
          </button>
        </li>,
      );
    }
    return pages;
  };

  return (
    <div>
      <ul>{renderPages()}</ul>
    </div>
  );
}
