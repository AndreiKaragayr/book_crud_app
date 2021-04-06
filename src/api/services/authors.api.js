import { instance } from '../api.config.creator';

const path = {
  author: {
    add: `author.json`,
    lists: `author.json`,
    update: `author`,
    delete: `author`,
  }
}

export const addAuthor = async (first_name, last_name) => {
  const response = await instance.post(path.author.add, {
    first_name, last_name
  });
  return response.data;
};

export const getAuthor = async () => {
  const response = await instance.get(path.author.lists);
  return response.data;
};

export const updateAuthor = async (id, first_name, last_name) => {
  const response = await instance.put(`${path.author.update}/${id}.json`, {
    first_name, last_name
  });
  return response.data;
};

export const deleteAuthor = async (id) => {
  const response = await instance.delete(`${path.author.delete}/${id}.json`);
  return response.data;
};