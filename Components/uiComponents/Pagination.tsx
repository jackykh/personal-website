import Link from "next/link";
import { v4 as uuidv4 } from "uuid";

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
        key={uuidv4()}
        href={`${link}${page}`}
        className={`w-10 h-10 rounded-lg ${
          props.currentPage === page && "bg-purple-300"
        } border-slate-700 border flex justify-center items-center hover:bg-purple-300`}
      >
        {page}
      </Link>
    );
  };

  const ellipsis = (
    <div className="w-10 h-10 rounded-lg border-slate-700 border flex justify-center items-center hover:bg-purple-300">
      <span>...</span>
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
