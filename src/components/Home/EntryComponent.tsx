import { DogObject } from "../../model";

function EntryComponent(props: DogObject) {
  return (
    <div className="entry-cont">
      <img className="entry-img" src={props.img} alt={`A ${props.breed} dog`} />
      <div className="entry-information">
        <h2 className="entry-information__title">{props.name}</h2>
        <div className="entry-information__desc">
          <p>{props.breed}</p>
          <p>{props.age}</p>
          <p>Zip Code: {props.zip_code}</p>
        </div>
      </div>
    </div>
  );
}

export default EntryComponent;
