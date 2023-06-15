import { Fragment, useEffect, useState } from "react";
import { DogObject, DogsSearchObject } from "../../model";
import EntryComponent from "./EntryComponent";
import FilterSidebar from "./FilterSidebar";
import Pagination from "./Pagination";
import SortComponent from "./SortComponent";
import MatchComponent from "./MatchComponent";

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
      <MatchComponent dogMatched={dogMatched} />
      <div className="home-cont">
        <FilterSidebar getDogData={getDogData} setBreeds={setBreeds} />
        <SortComponent
          sortOptionHandler={sortOptionHandler}
          matchClickHandler={matchClickHandler}
        />
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
          <Pagination
            searchData={searchData}
            pageChangeHandler={pageChangeHandler}
          />
        </main>
      </div>
    </Fragment>
  );
}

export default Home;
