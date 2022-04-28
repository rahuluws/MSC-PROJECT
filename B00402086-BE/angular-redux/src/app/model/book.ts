export interface Books {
  active: Book;
  list: Book[];
}

export interface Book {
  _id?: string;
  title?: string,
  author?: string,
  price?: number,
  publisher?: string,
  category?: string,
  publishedDate?: string
}

