import { useEffect, useState } from "react";

interface FilterSidebarProps {
  getDogData: (url: string) => void;
  setBreeds: React.Dispatch<React.SetStateAction<any>>;
}

function FilterSidebar(props: FilterSidebarProps) {
  const [filterOptions, setFilterOptions] = useState<string[]>();

  async function getBreeds() {
    try {
      const res = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs/breeds",
        { credentials: "include" }
      );
      const data = await res.json();
      setFilterOptions(data);
    } catch (err) {
      console.log(err);
    }
  }

  function checkboxHandler(e: React.MouseEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;
    const isChecked = e.currentTarget.checked;
    if (isChecked) {
      props.setBreeds((prevState: string[]) => {
        if (prevState) return [...prevState, value];
      });
    } else {
      props.setBreeds((prevState: string[]) => {
        if (prevState) {
          return prevState.filter((el) => el !== value);
        }
      });
    }
  }

  useEffect(() => {
    getBreeds();
  }, []);

  return (
    <div className="filter-cont">
      <form className="filter-form">
        {filterOptions?.map((el) => {
          return (
            <div key={el} className="filter-form__option">
              <label className="filter-form__option__label">
                <input
                  type="checkbox"
                  name={el}
                  value={el}
                  defaultChecked={el === "Pug" ? true : false}
                  onClick={checkboxHandler}
                />
                <p>{el}</p>
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default FilterSidebar;
