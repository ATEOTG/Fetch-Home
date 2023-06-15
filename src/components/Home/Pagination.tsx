import ReactPaginate from "react-paginate";
import { DogsSearchObject } from "../../model";

interface PaginationProps {
  searchData: DogsSearchObject | undefined;
  pageChangeHandler: (e: { selected: number }) => void;
}

function Pagination(props: PaginationProps) {
  return (
    <div className="pagination">
      <div className="pagination__cont">
        <ReactPaginate
          pageCount={
            props.searchData?.total ? Math.ceil(props.searchData.total / 25) : 0
          }
          onPageChange={props.pageChangeHandler}
          activeClassName="pagination__list--active"
        />
      </div>
    </div>
  );
}

export default Pagination;
