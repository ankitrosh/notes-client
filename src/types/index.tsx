export interface Element {
  width?: number;
  height?: number;
  x: number;
  y: number;
}

export interface Note {
  _id: string;
  title: string;
  text: string;
  createdAt: string;
  updatedAt: string;
  elements: Element[];
}

export interface User {
  username: string;
  email: string;
  password: string;
}
