import { Fragment, useEffect, useState } from "react";
import { DogObject, DogsSearchObject } from "../model";
import EntryComponent from "./EntryComponent";
import ReactPaginate from "react-paginate";
import FilterSidebar from "./FilterSidebar";

function breedStringify(breedsArray: string[]) {
  let breedString = "";

  for (const el of breedsArray) {
    breedString += "&breeds=" + el;
  }
  return breedString;
}

function Home() {
  const [dogData, setDogData] = useState<DogObject[]>();
  const [dogMatched, setDogMatched] = useState<DogObject>();
  const [searchData, setSearchData] = useState<DogsSearchObject>();
  const [sortOption, setSortOption] = useState<string>("asc");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [breeds, setBreeds] = useState<string[]>(["Pug"]);

  async function matchClickHandler() {
    const resultArray = searchData?.resultIds;
    const res = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs/match",
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(resultArray),
      }
    );

    const data = await res.json();
    const dataId = [data.match];
    const dogData = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs",
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(dataId),
      }
    );
    const dogMatch = await dogData.json();
    setDogMatched(dogMatch[0]);
  }

  function sortOptionHandler(e: React.MouseEvent<HTMLInputElement>) {
    if (e.currentTarget.value === "asc") setSortOption("asc");
    else {
      setSortOption("desc");
    }
  }

  function pageChangeHandler(e: { selected: number }) {
    const currPage = e.selected;
    const nextFromValue = currPage * 25;
    const breedQueryString = breeds ? breedStringify(breeds) : "";
    getDogData(
      `https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=${nextFromValue}&sort=breed:${sortOption}${breedQueryString}`
    );
    setCurrentPage(currPage);
  }

  async function getDogData(url: string) {
    try {
      const resGet = await fetch(url, { credentials: "include" });
      const getData: DogsSearchObject = await resGet.json();
      const resultArray = getData.resultIds;
      setSearchData({
        total: getData.total,
        next: getData.next,
        resultIds: getData.resultIds,
        prev: getData.prev ? getData.prev : null,
      });
      const dogData = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          method: "POST",
          credentials: "include",
          body: JSON.stringify(resultArray),
        }
      );
      const dogDataFinal: DogObject[] = await dogData.json();
      setDogData(dogDataFinal);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getDogData(
      `https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=${
        currentPage * 25
      }&sort=breed:${sortOption}${breedStringify(breeds)}`
    );
  }, [breeds, sortOption, currentPage]);

  return (
    <Fragment>
      {dogMatched ? (
        <div className="backdrop">
          <h2>Your Match is {dogMatched.name}!</h2>
          <div className="dog-match-modal">
            <EntryComponent
              id={dogMatched.id}
              name={dogMatched.name}
              age={dogMatched.age}
              img={dogMatched.img}
              breed={dogMatched.breed}
              zip_code={dogMatched.zip_code}
            />
          </div>
        </div>
      ) : (
        <Fragment> </Fragment>
      )}
      <div className="home-cont">
        <FilterSidebar getDogData={getDogData} setBreeds={setBreeds} />
        <div className="sort-form-cont">
          <form className="sort-form">
            <label>
              <input
                type="radio"
                name="sort"
                value="asc"
                defaultChecked
                onClick={sortOptionHandler}
              />{" "}
              Ascending
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                value="desc"
                onClick={sortOptionHandler}
              />{" "}
              Descending
            </label>
          </form>
          <button className="match-btn" onClick={matchClickHandler}>
            MATCH ME!
          </button>
        </div>

        <main>
          <ul className="result-list">
            {dogData?.map((el) => {
              return (
                <li key={el.id}>
                  <EntryComponent
                    id={el.id}
                    name={el.name}
                    age={el.age}
                    img={el.img}
                    breed={el.breed}
                    zip_code={el.zip_code}
                  />
                </li>
              );
            })}
          </ul>
          <div className="pagination">
            <div className="pagination__cont">
              <ReactPaginate
                pageCount={
                  searchData?.total ? Math.ceil(searchData.total / 25) : 0
                }
                onPageChange={pageChangeHandler}
                activeClassName="pagination__list--active"
              />
            </div>
          </div>
        </main>
      </div>
    </Fragment>
  );
}

export default Home;
