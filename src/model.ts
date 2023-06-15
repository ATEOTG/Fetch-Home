export interface DogsSearchObject {
  next: string;
  prev: string | null;
  resultIds: string[];
  total: number;
}

export interface DogObject {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
}
