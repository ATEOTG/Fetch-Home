import { useEffect, useState } from "react";
import { DogObject, DogsSearchObject } from "../model";
import EntryComponent from "./EntryComponent";
import ReactPaginate from "react-paginate";

function Home() {
  const [dogData, setDogData] = useState<DogObject[]>();
  const [searchData, setSearchData] = useState<DogsSearchObject>();
  const [sortOption, setSortOption] = useState<string>("asc");

  // function sortOptionHandler(e: React.MouseEvent<HTMLInputElement>) {
  //   if (e.currentTarget.value === "asc") setSortOption("asc");
  //   else {
  //     setSortOption("desc");
  //   }
  // }

  function pageChangeHandler(e: { selected: number }) {
    console.log(e);
    const currPage = e.selected + 1;
    const nextFromValue = currPage * 25;
    getDogData(
      `https://frontend-take-home-service.fetch.com/dogs/search?size=25&from=${nextFromValue}&sort=breed:${sortOption}`
    );
  }

  async function getDogData(url: string) {
    try {
      console.log(url, "URL");
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
      `https://frontend-take-home-service.fetch.com/dogs/search?sort=breed:${sortOption}`
    );
  }, []);

  return (
    <div className="home-cont">
      <form className="sort-form">
        <label>
          <input
            type="radio"
            name="sort"
            value="asc"
            defaultChecked
            // onClick={sortOptionHandler}
          />{" "}
          Ascending
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            value="desc"
            // onClick={sortOptionHandler}
          />{" "}
          Descending
        </label>
      </form>
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
  );
}

export default Home;
