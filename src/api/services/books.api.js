import { instance } from '../api.config.creator';

const path = {
  books: {
    add: `books.json`,
    lists: `books.json`,
    update: `books`,
    delete: `books`,
  }
}

export const addBook = async (image, title, author_id, created_at, year) => {
  const response = await instance.post(path.books.add, {
    image, title, author_id, created_at, year
  });
  return response.data;
};

export const getBooks = async () => {
  const response = await instance.get(path.books.lists);
  return response.data;
};

export const updateBook = async (id, image, title, author_id, year) => {
  const response = await instance.put(`${path.books.update}/${id}.json`, {
    image, title, author_id, year
  });
  return response.data;
};

export const deleteBook = async (id) => {
  const response = await instance.delete(`${path.books.delete}/${id}.json`);
  return response.data;
};