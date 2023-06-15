interface SortComponentProps {
  sortOptionHandler: (e: React.MouseEvent<HTMLInputElement>) => void;
  matchClickHandler: () => void;
}

function SortComponent(props: SortComponentProps) {
  return (
    <div className="sort-form-cont">
      <form className="sort-form">
        <label>
          <input
            type="radio"
            name="sort"
            value="asc"
            defaultChecked
            onClick={props.sortOptionHandler}
          />{" "}
          Ascending
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="desc"
            onClick={props.sortOptionHandler}
          />{" "}
          Descending
        </label>
      </form>
      <button className="match-btn" onClick={props.matchClickHandler}>
        MATCH ME!
      </button>
    </div>
  );
}

export default SortComponent;
