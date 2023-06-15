import { DogObject } from "../../model";
import EntryComponent from "./EntryComponent";
import { Fragment } from "react";

function MatchComponent(props: { dogMatched: DogObject | undefined }) {
  return (
    <Fragment>
      {props.dogMatched ? (
        <div className="backdrop">
          <h2>Your Match is {props.dogMatched?.name}!</h2>
          <div className="dog-match-modal">
            <EntryComponent
              id={props.dogMatched?.id}
              name={props.dogMatched?.name}
              age={props.dogMatched?.age}
              img={props.dogMatched?.img}
              breed={props.dogMatched?.breed}
              zip_code={props.dogMatched?.zip_code}
            />
          </div>
        </div>
      ) : (
        <Fragment> </Fragment>
      )}
    </Fragment>
  );
}

export default MatchComponent;
