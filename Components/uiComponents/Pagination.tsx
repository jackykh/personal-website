import Link from "next/link";

interface paginationProps {
  currentPage: number;
  totalPage: number;
  link: string;
}

const Pagination = (props: paginationProps) => {
  const pageButton: React.ReactElement[] = [];
  const { currentPage, totalPage, link } = props;

  const currentPageButton = (page: number) => {
    return (
      <Link
        key={page}
        href={`${link}${page}`}
        className={`w-10 h-10 font-mono text-xs ${
          props.currentPage === page
            ? "bg-ink text-paper border-ink"
            : "text-soft hover:border-ink hover:text-ink"
        } border-line border flex justify-center items-center transition-colors`}
      >
        {page}
      </Link>
    );
  };

  const ellipsis = (
    <div className="w-10 h-10 flex justify-center items-center text-muted font-mono text-xs">
      <span>···</span>
    </div>
  );

  if (totalPage > 7) {
    if (currentPage === 1) {
      pageButton.push(
        currentPageButton(1),
        currentPageButton(2),
        ellipsis,
        currentPageButton(totalPage)
      );
    } else if (currentPage === 2) {
      pageButton.push(
        currentPageButton(1),
        currentPageButton(2),
        currentPageButton(3),
        ellipsis,
        currentPageButton(totalPage)
      );
    } else if (currentPage === 3) {
      pageButton.push(
        currentPageButton(1),
        currentPageButton(2),
        currentPageButton(3),
        currentPageButton(4),
        ellipsis,
        currentPageButton(totalPage)
      );
    } else if (currentPage === totalPage) {
      pageButton.push(
        currentPageButton(1),
        ellipsis,
        currentPageButton(totalPage - 1),
        currentPageButton(totalPage)
      );
    } else if (currentPage === totalPage - 1) {
      pageButton.push(
        currentPageButton(1),
        ellipsis,
        currentPageButton(currentPage - 1),
        currentPageButton(currentPage),
        currentPageButton(totalPage)
      );
    } else if (currentPage === totalPage - 2) {
      pageButton.push(
        currentPageButton(1),
        ellipsis,
        currentPageButton(currentPage - 1),
        currentPageButton(currentPage),
        currentPageButton(currentPage + 1),
        currentPageButton(totalPage)
      );
    } else {
      pageButton.push(
        currentPageButton(1),
        ellipsis,
        currentPageButton(currentPage - 1),
        currentPageButton(currentPage),
        currentPageButton(currentPage + 1),
        ellipsis,
        currentPageButton(totalPage)
      );
    }
  } else {
    for (let i = 1; i < totalPage + 1; i++) {
      pageButton.push(currentPageButton(i));
    }
  }

  return <div className="flex justify-center [&>*]:mr-3 ">{pageButton}</div>;
};

export default Pagination;
