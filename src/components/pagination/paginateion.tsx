interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  setCurrentPage: (newPage: number) => void;
  currentPage: number;
  // onChangePage: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  setCurrentPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) {
    return null;
  }

  const onClickNewPage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const renderPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button onClick={() => onClickNewPage(i)}>{i}</button>
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
};

export default Pagination;
